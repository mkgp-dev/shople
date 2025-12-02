import { useEffect } from "react";
import { useProductStore } from "../stores/productStore";

export function useProduct() {
    const { products, loading, error, fetchProduct } = useProductStore();

    useEffect(() => {
        const controller = new AbortController();
        fetchProduct(controller.signal);
        return () => {
            controller.abort();
        };
    }, [fetchProduct]);

    return { products, loading, error };
}