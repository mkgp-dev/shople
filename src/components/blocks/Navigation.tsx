import clsx from "clsx";
import { Link, useLocation } from "react-router";
import { cartCount, useCartStore } from "../../stores/cartStore";
import { Badge } from "../ui/badge";

const pages = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/shop' },
    { name: 'Cart', to: '/cart' },
];

export default function Navigation() {
    const currentLocation = useLocation();
    const count = useCartStore(cartCount);

    return (
        <nav className="flex items-center justify-between gap-2">
            <h1 className="text-3xl font-heading font-bold">Sho<span className="text-sky-500">ple</span></h1>
            <ul className="flex items-center gap-4">
                {pages.map((page) => (
                    <li key={page.name}>
                        <Link
                            to={page.to}
                            className={clsx(
                                "hover:border-b-3 hover:border-sky-500 cursor-pointer",
                                currentLocation.pathname === page.to && "border-b-3 border-sky-500",
                            )}
                        >
                            {page.name}
                        </Link>
                        {page.name === 'Cart' && count > 0 && (
                            <Badge className="bg-sky-500 ms-2">
                                {count}
                            </Badge>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}