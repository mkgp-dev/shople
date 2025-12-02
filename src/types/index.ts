export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export type CartState = {
    items: Record<number, CartItem>;
    addItem: (product: Product, quantity?: number) => void;
    setQuantity: (id: number, quantity: number) => void;
    incrementItem: (id: number) => void;
    decrementItem: (id: number) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

export type ProductState = {
    products: Product[];
    loading: boolean;
    error: string | null;
    fetchProduct: (signal?: AbortSignal) => Promise<void>;
}