import { useEffect, useState } from "react";
import { selectItems, useCartStore } from "../../stores/cartStore";
import type { Product } from "../../types";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Quantity } from "../ui/quantity";
import { Button } from "../ui/button";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const addItem = useCartStore(state => state.addItem);
    const setCartQuantity = useCartStore(state => state.setQuantity);
    const cartItems = useCartStore(selectItems);

    const existingQuantity = cartItems[product.id]?.quantity ?? 0;

    const [quantity, setQuantityInput] = useState(
        Math.max(1, existingQuantity || 1)
    );

    useEffect(() => {
        if (existingQuantity > 0) {
            setQuantityInput(existingQuantity);
        }
    }, [existingQuantity]);

    const handleAddToCart = () => {
        if (existingQuantity > 0) {
            setCartQuantity(product.id, quantity);
        } else {
            addItem(product, quantity);
        }
    };

    return (
        <Card className="flex h-full flex-col gap-4 p-4 transition-all duration-300 hover:-translate-y-1 bg-slate-800 hover:border-sky-500">
            <div className="relative overflow-hidden rounded-xl bg-slate-950/40">
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-[220px] w-full object-contain p-2 pointer-events-none"
                    loading="lazy"
                />
                <Badge className="absolute right-3 top-3 bg-sky-500/30 text-slate-300">
                    ${product.price.toFixed(2)}
                </Badge>
            </div>
            <CardContent className="flex flex-1 flex-col gap-3 p-0">
                <h3 className="text-lg font-semibold leading-tight text-slate-50 truncate">
                    {product.title}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <Badge className="bg-slate-500/20 text-purple-100">
                        {product.category}
                    </Badge>
                    {existingQuantity > 0 && (
                        <Badge className="bg-sky-500/25 text-sky-300">
                            {existingQuantity} in cart
                        </Badge>
                    )}
                </div>
            </CardContent>
            <div className="flex flex-col gap-3">
                <Quantity value={quantity} onChange={setQuantityInput} min={1} />
                <Button
                    className="bg-sky-500 hover:bg-sky-600 cursor-pointer"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </div>
        </Card>
    );
}
