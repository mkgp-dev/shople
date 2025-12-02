import { useMemo } from "react";
import { Button } from "./button";
import { Minus, Plus } from "lucide-react";
import { Input } from "./input";

type Props = {
    value: number;
    onChange: (next: number) => void;
    min?: number;
    max?: number;
    onCheckout?: boolean;
}

export function Quantity({ value, onChange, min = 1, max = 99, onCheckout = false }: Props) {
    const clampValue = useMemo(() => {
        const limit = max ? Math.min(value, max) : value;
        return Math.max(min, Math.floor(limit));
    }, [value, min, max]);

    const handleInput = (nextValue: number) => {
        if (Number.isNaN(nextValue)) return;
        if (max && nextValue > max) {
            onChange(max);
            return;
        }
        onChange(Math.max(min, nextValue));
    };

    return (
        <div className="flex w-full items-center gap-2">
            {onCheckout ? (
                <>
                    <Input
                        type="number"
                        min={min}
                        max={max}
                        value={clampValue}
                        aria-label="Quantity"
                        onChange={event => handleInput(Number(event.target.value))}
                        className="bg-slate-800 w-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
                    />

                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleInput(clampValue - 1)}
                        disabled={clampValue <= min}
                        className="cursor-pointer"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="size-4" />
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleInput(clampValue - 1)}
                        disabled={clampValue <= min}
                        className="cursor-pointer"
                        aria-label="Decrease quantity"
                    >
                        <Minus className="size-4" />
                    </Button>

                    <Input
                        type="number"
                        min={min}
                        max={max}
                        value={clampValue}
                        onChange={event => handleInput(Number(event.target.value))}
                        aria-label="Quantity"
                        className="bg-slate-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
                    />
                </>
            )}

            <Button
                size="sm"
                variant="outline"
                onClick={() => handleInput(clampValue + 1)}
                disabled={max ? clampValue >= max : false}
                className="cursor-pointer"
                aria-label="Increase quantity"
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
}