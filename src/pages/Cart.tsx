import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { cartTotal, selectItems, useCartStore } from "../stores/cartStore";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import CartList from "../components/blocks/CartList";

export default function Cart() {
    const items = useCartStore(selectItems);
    const total = useCartStore(cartTotal);

    const lists = Object.values(items);
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-heading font-semibold">Your cart</h2>
            {lists.length === 0 && (
                <Card className="grid gap-3 rounded-2xl bg-slate-800 p-8 text-center">
                    <p className="font-semibold text-slate-100">Your cart is empty.</p>
                    <p className="text-slate-400">Head back to the shop and add something you love.</p>
                    <Button asChild className="mx-auto w-full max-w-xs bg-sky-500 hover:bg-sky-600">
                        <Link to="/shop">Browse products</Link>
                    </Button>
                </Card>
            )}

            {lists.length > 0 && (
                lists.map((product) => (
                    <CartList key={product.id} products={product} />
                ))
            )}

            <Separator className="bg-white/20" />
            <div className="flex items-center justify-between">
                <p className="text-slate-300">Total</p>
                <p className="text-xl font-semibold text-slate-50">${total.toFixed(2)}</p>
            </div>
            <Button variant="outline" disabled>
                Checkout (coming soon)
            </Button>
        </div>
    );
}