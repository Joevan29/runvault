"use client";

import { useProductState, Variant } from "./useProductState";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const VARIANTS: { id: Variant; color: string; label: string }[] = [
    { id: "Skywave", color: "bg-sky-500", label: "Skywave" },
    { id: "Midnight", color: "bg-neutral-900", label: "Midnight" },
    { id: "Volt", color: "bg-lime-400", label: "Volt" },
];

export function VariantSelector({
    current,
    onChange,
}: {
    current: Variant;
    onChange: (v: Variant) => void;
}) {
    return (
        <div className="space-y-4">
            <span className="text-sm font-medium text-muted-foreground">
                Color: <span className="text-foreground">{current}</span>
            </span>
            <div className="flex gap-4">
                {VARIANTS.map((v) => (
                    <button
                        key={v.id}
                        onClick={() => onChange(v.id)}
                        className="group relative h-12 w-12 rounded-full border border-border p-1 focus:outline-none"
                        aria-label={`Select ${v.label}`}
                    >
                        <div
                            className={cn(
                                "h-full w-full rounded-full transition-all",
                                v.color,
                                current === v.id ? "scale-100 shadow-lg" : "scale-90 opacity-80 group-hover:scale-100"
                            )}
                        />
                        {current === v.id && (
                            <motion.div
                                layoutId="variant-ring"
                                className="absolute inset-0 rounded-full border-2 border-primary"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
