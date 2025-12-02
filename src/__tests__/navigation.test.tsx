import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useCartStore } from "../stores/cartStore";
import Navigation from "../components/blocks/Navigation";
import { expect, test } from "vitest";

const renderNav = () =>
    render(
        <MemoryRouter>
            <Navigation />
        </MemoryRouter>
    );

test("shows cart count badge", () => {
    useCartStore.setState({
        items: { 1: { id: 1, title: "A", description: "", category: "", price: 10, image: "", quantity: 2 } },
    });
    renderNav();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
});
