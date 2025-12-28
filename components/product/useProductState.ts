"use client";

import { useState, useEffect } from "react";

export type Variant = "Skywave" | "Midnight" | "Volt";

export function useProductState() {
    const [variant, setVariant] = useState<Variant>("Skywave");
    const [size, setSize] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedVariant = localStorage.getItem("runvault-variant") as Variant;
        const savedSize = localStorage.getItem("runvault-size");

        if (savedVariant) setVariant(savedVariant);
        if (savedSize) setSize(savedSize);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        localStorage.setItem("runvault-variant", variant);
    }, [variant, mounted]);

    useEffect(() => {
        if (!mounted) return;
        if (size) localStorage.setItem("runvault-size", size);
    }, [size, mounted]);

    return { variant, setVariant, size, setSize, mounted };
}
