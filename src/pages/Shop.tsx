import ProductCard from "../components/blocks/ProductCard";
import { Spinner } from "../components/ui/spinner";
import { useProduct } from "../hooks/useProduct";


export default function Shop() {
    const { products, loading, error } = useProduct();

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-heading font-semibold">Shop</h2>
                <p className="text-lg text-slate-400">Browse our collection of products.</p>
            </div>

            {loading && (
                <div className="flex items-center justify-center h-[70vh]">
                    <Spinner className="size-10" />
                </div>
            )}

            {error && (
                <div className="flex items-center justify-center h-[70vh]">
                    <p className="text-rose-500">{error}</p>
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <p>No products available.</p>
            )}
            {!loading && !error && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
}