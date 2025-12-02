import type { CartItem } from "../../types"
import { Badge } from "../ui/badge";
import { Quantity } from "../ui/quantity";
import { useCartStore } from "../../stores/cartStore";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

type Props = {
    products: CartItem;
}

export default function CartList({ products }: Props) {
    const setQuantity = useCartStore(state => state.setQuantity);
    const removeItem = useCartStore(state => state.removeItem);
    const lineTotal = (products.quantity * products.price).toFixed(2);

    return (
        <div className="flex flex-col gap-4">
            <div
                key={products.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <img
                        src={products.image}
                        alt={products.title}
                        className="h-24 w-24 rounded-xl bg-slate-950/60 object-contain p-2 pointer-events-none"
                        loading="lazy"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                        <p className="text-sm font-semibold text-slate-100 line-clamp-2">
                            {products.title}
                        </p>
                        <Badge className="w-fit bg-sky-500">${products.price.toFixed(2)}</Badge>
                    </div>

                    <div className="flex w-full md:w-auto">
                        <Quantity
                            value={products.quantity}
                            onChange={(value) => setQuantity(products.id, value)}
                            min={1}
                            onCheckout={true}
                        />
                    </div>

                    <p className="min-w-20 text-right text-base font-bold text-slate-50" aria-label="Line total">
                        ${lineTotal}
                    </p>

                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeItem(products.id)}
                        className="cursor-pointer hover:text-rose-500"
                        aria-label="Remove item"
                    >
                        <Trash className="size-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
