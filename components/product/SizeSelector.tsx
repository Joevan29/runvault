"use client";

import { cn } from "@/lib/utils";

const SIZES = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12", "US 13"];

export function SizeSelector({
    current,
    onChange,
    error,
}: {
    current: string | null;
    onChange: (s: string) => void;
    error?: boolean;
}) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <span className={cn("text-sm font-medium", error ? "text-destructive" : "text-muted-foreground")}>
                    Select Size {error && "(Required)"}
                </span>
                <button className="text-sm underline text-muted-foreground hover:text-primary">
                    Size Guide
                </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
                {SIZES.map((size) => (
                    <button
                        key={size}
                        onClick={() => onChange(size)}
                        className={cn(
                            "flex h-12 items-center justify-center rounded-md border text-sm font-medium transition-all hover:border-primary",
                            current === size
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-foreground",
                            error && !current && "border-destructive/50"
                        )}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </div>
    );
}
