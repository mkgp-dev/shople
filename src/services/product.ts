import type { Product } from "../types";

const URL = 'https://fakestoreapi.com/products?limit=12';

export async function fetchProduct(signal?: AbortSignal): Promise<Product[]> {
    const response = await fetch(URL, { signal });
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    
    return await response.json();
}