import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import App from "../App";
import Navigation from "../components/blocks/Navigation";
import Shop from "../pages/Shop";
import { resetCartStoreForTests, useCartStore } from "../stores/cartStore";
import type { Product } from "../types";


const mockProducts: Product[] = [
    {
        id: 1,
        title: "Test Jacket",
        description: "Warm and cozy.",
        category: "clothing",
        price: 50,
        image: "jacket.png",
    },
    {
        id: 2,
        title: "Fancy Mug",
        description: "For great coffee.",
        category: "kitchen",
        price: 15,
        image: "mug.png",
    },
];

const mockUseProductReturn = {
    products: [] as Product[],
    loading: false,
    error: null as string | null,
};

vi.mock("../hooks/useProduct", () => ({
    useProduct: () => mockUseProductReturn,
}));

const renderApp = (initialEntries = ["/shop"]) =>
    render(
        <MemoryRouter initialEntries={initialEntries}>
            <App />
        </MemoryRouter>,
    );

beforeEach(async () => {
    await resetCartStoreForTests();
    vi.clearAllMocks();
    mockUseProductReturn.products = [];
    mockUseProductReturn.loading = false;
    mockUseProductReturn.error = null;
});

afterEach(() => {
    vi.restoreAllMocks();
});

test("renders products and cart badge updates when items are added", async () => {
  mockUseProductReturn.products = mockProducts;

  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <Shop />
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getByText("Test Jacket")).toBeInTheDocument());

  act(() => {
    useCartStore.getState().addItem(mockProducts[0], 1);
  });

  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );
  expect(screen.getByText("1")).toBeInTheDocument();
});

test("cart quantity controls adjust totals and removal empties the cart", async () => {
    useCartStore.setState({
        items: {
            1: { ...mockProducts[0], quantity: 1 },
        },
    });

    const user = userEvent.setup();
    renderApp(["/cart"]);

    expect(screen.getByLabelText(/line total/i).textContent).toBe("$50.00");
    expect(screen.getByText("Total").nextSibling?.textContent).toBe("$50.00");

    await user.click(screen.getByLabelText(/increase quantity/i));
    expect(screen.getByLabelText(/line total/i).textContent).toBe("$100.00");
    expect(screen.getByText("Total").nextSibling?.textContent).toBe("$100.00");

    await user.click(screen.getByLabelText(/decrease quantity/i));
    expect(screen.getByLabelText(/line total/i).textContent).toBe("$50.00");

    await user.click(screen.getByLabelText(/remove item/i));

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByText("Total").nextSibling?.textContent).toBe("$0.00");
});

test("shows error message when product fetch fails", async () => {
    mockUseProductReturn.error = "network down";

    renderApp(["/shop"]);

    await waitFor(() => expect(screen.getByText(/network down/i)).toBeInTheDocument());
});
