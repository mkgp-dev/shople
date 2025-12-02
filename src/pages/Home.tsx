import { ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";

export default function Home() {

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-7xl font-heading font-semibold mb-2">Welcome to Sho<span className="text-sky-500">ple</span>!</h2>
            <p className="text-2xl">Your one-stop shop for all your needs.</p>
            <Button className="bg-sky-500 hover:bg-sky-600 mt-6 cursor-pointer">
                <Link to="/shop" className="flex items-center gap-2">
                    <ShoppingBag className="size-5" />
                    Start shopping
                </Link>
            </Button>
        </div>
    );
}