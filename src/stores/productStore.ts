import { create } from "zustand";
import type { ProductState } from "../types";
import { fetchProduct } from "../services/product";

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    loading: false,
    error: null,

    async fetchProduct(signal) {
        set({ loading: true, error: null })

        try {
            const products = await fetchProduct(signal);
            set({ products, loading: false });
        } catch (error: any) {
            if (error.name === 'AbortError') return;
            set({ error: error.message || "Failed to fetch products", loading: false });
        }
    },
}));