"use client";

import { useState, Suspense } from "react";
import { useProductState } from "./useProductState";
import { SizeSelector } from "./SizeSelector";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, ShoppingBag, Truck } from "lucide-react";
import { ShoeViewer } from "@/components/3d/ShoeViewer";

export function ProductDetail() {
    const { size, setSize, mounted } = useProductState();
    const [error, setError] = useState(false);

    const handleAddToCart = async () => {
        if (!size) {
            setError(true);
            return;
        }
        setError(false);
        try {
            await new Promise(r => setTimeout(r, 600));
            alert(`Pre-ordered Skywave size ${size}`);
        } catch {
            alert("Error");
        }
    };

    if (!mounted) return <div className="min-h-screen bg-background" />;

    return (
        <div className="container max-w-7xl mx-auto min-h-screen px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">

                <div className="lg:col-span-7 flex flex-col items-center">
                    <div className="sticky top-28 w-full">
                        <motion.div
                            layoutId="product-viewer"
                            className="relative w-full rounded-3xl border border-white/5 bg-secondary/5 overflow-hidden shadow-2xl"
                            style={{
                                aspectRatio: "4/3",
                            }}
                        >
                            <div className="absolute inset-0">
                                <Suspense fallback={<div className="flex h-full items-center justify-center text-muted-foreground animate-pulse">Loading Model...</div>}>
                                    <ShoeViewer
                                        mode="product"
                                        className="w-full h-full"
                                    />
                                </Suspense>
                            </div>

                            <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none">
                                <span className="text-[10px] uppercase tracking-widest text-white/40 bg-black/20 px-4 py-1 rounded-full backdrop-blur-md border border-white/5">
                                    Interactive 3D • 360° View
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="lg:col-span-5 space-y-10 pt-4">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge variant="premium" className="px-3 py-1 text-xs">Flagship Model</Badge>
                            <span className="text-xs text-green-400 font-mono tracking-wide">● IN STOCK</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-foreground">AEROPULSE</h1>
                        <p className="text-2xl text-muted-foreground font-light">Rp 1.799.000</p>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Colorway</span>
                            <span className="text-sm font-bold text-sky-500">Skywave Blue</span>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <span className="text-sm font-medium text-muted-foreground">Select Size (US)</span>
                                <button className="text-xs text-white underline underline-offset-4">Size Guide</button>
                            </div>
                            <SizeSelector current={size} onChange={(s) => { setSize(s); setError(false); }} error={error} />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <Button size="lg" className="w-full h-14 text-lg font-bold rounded-xl" onClick={handleAddToCart}>
                            <ShoppingBag className="mr-2 h-5 w-5" /> PRE-ORDER
                        </Button>
                        <p className="text-center text-xs text-muted-foreground">
                            Estimated Shipping: <span className="text-white">Jan 25, 2025</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="rounded-xl border border-white/5 p-4 bg-white/5 flex flex-col gap-2">
                            <Truck className="h-5 w-5 text-primary" />
                            <div>
                                <div className="text-sm font-bold">Fast Delivery</div>
                                <div className="text-xs text-muted-foreground">Java & Bali</div>
                            </div>
                        </div>
                        <div className="rounded-xl border border-white/5 p-4 bg-white/5 flex flex-col gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <div>
                                <div className="text-sm font-bold">Authentic</div>
                                <div className="text-xs text-muted-foreground">Direct from Lab</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
