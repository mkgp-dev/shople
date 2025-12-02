import localforage from "../database/LocalForage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartState } from "../types";

const isTest = import.meta.env.MODE === "test";

const clampQuantity = (quantity: number) => Math.max(0, Math.floor(quantity));

export const useCartStore = create<CartState>()(
    persist(
        (set, _) => ({
            items: {},
            addItem: (product, quantity = 1) => {
                set(state => {
                    const safeQuantity = clampQuantity(quantity);
                    if (safeQuantity <= 0) return state;

                    const existingItem = state.items[product.id];
                    const newQuantity = existingItem ? existingItem.quantity + safeQuantity : safeQuantity;
                    return {
                        items: {
                            ...state.items,
                            [product.id]: { ...product, quantity: newQuantity },
                        },
                    };
                });
            },
            setQuantity: (id, quantity) => {
                set(state => {
                    const safeQuantity = clampQuantity(quantity);
                    if (safeQuantity <= 0) {
                        const { [id]: _, ...rest } = state.items;
                        return { items: rest };
                    }

                    const existingItem = state.items[id];
                    if (!existingItem) return state;
                    return {
                        items: {
                            ...state.items,
                            [id]: { ...existingItem, quantity: safeQuantity },
                        },
                    };
                });
            },
            incrementItem: (id) => {
                set(state => {
                    const existingItem = state.items[id];
                    if (!existingItem) return state;
                    return {
                        items: {
                            ...state.items,
                            [id]: { ...existingItem, quantity: existingItem.quantity + 1 },
                        },
                    };
                });
            },
            decrementItem: (id) => {
                set(state => {
                    const existingItem = state.items[id];
                    if (!existingItem) return state;
                    const newQuantity = existingItem.quantity - 1;
                    if (newQuantity <= 0) {
                        const { [id]: _, ...rest } = state.items;
                        return { items: rest };
                    }
                    return {
                        items: {
                            ...state.items,
                            [id]: { ...existingItem, quantity: newQuantity },
                        },
                    };
                });
            },
            removeItem: (id) => {
                set(state => {
                    const { [id]: _, ...rest } = state.items;
                    return { items: rest };
                });
            },
            clearCart: () => {
                set({ items: {} });
            },
        }),
        {
            name: "shople-data",
            storage: createJSONStorage(() => localforage),
            skipHydration: isTest,
        },
    ),
);

export const selectItems = (state: CartState) => state.items;
export const cartCount = (state: CartState) =>
    Object.values(state.items).reduce((total, item) => total + item.quantity, 0);
export const cartTotal = (state: CartState) =>
    Object.values(state.items).reduce((total, item) => total + item.price * item.quantity, 0);
export const resetCart = (state: CartState) => state.clearCart();
export const resetCartStoreForTests = async () => {
    await useCartStore.persist?.clearStorage?.();
    useCartStore.setState({ items: {} });
};