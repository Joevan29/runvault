"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Variant } from "./useProductState";

interface Hotspot {
    id: number;
    x: number;
    y: number;
    title: string;
    desc: string;
}

const HOTSPOTS: Hotspot[] = [
    { id: 1, x: 50, y: 70, title: "Nano-Grip Outsole", desc: "Proprietary rubber compound for all-weather traction." },
    { id: 2, x: 60, y: 40, title: "Engineered Mesh", desc: "Zonal breathability adapts to foot expansion." },
    { id: 3, x: 20, y: 65, title: "Carbon Plate", desc: "Embedded full-length plate for maximum energy return." },
    { id: 4, x: 85, y: 55, title: "Heel Lock", desc: "3D molded heel counter ensures a secure fit." },
];

export function Hotspots({ variant }: { variant: Variant }) {
    const [activeId, setActiveId] = useState<number | null>(null);

    const neonColors = {
        Skywave: "shadow-sky-500",
        Midnight: "shadow-white",
        Volt: "shadow-lime-400",
    };

    return (
        <div className="absolute inset-0 z-10">
            {HOTSPOTS.map((h) => (
                <div
                    key={h.id}
                    className="absolute"
                    style={{ top: `${h.y}%`, left: `${h.x}%` }}
                >
                    <button
                        onClick={() => setActiveId(activeId === h.id ? null : h.id)}
                        className={cn(
                            "group relative flex h-6 w-6 items-center justify-center rounded-full bg-background/80 backdrop-blur-md transition-transform hover:scale-110",
                            activeId === h.id ? "ring-2 ring-primary" : ""
                        )}
                    >
                        <span
                            className={cn(
                                "absolute inset-0 rounded-full opacity-50 contrast-150 animate-pulse",
                                activeId === h.id ? `shadow-[0_0_15px_2px] ${neonColors[variant]}` : ""
                            )}
                        />
                        <Plus
                            className={cn(
                                "h-3 w-3 transition-transform duration-300",
                                activeId === h.id ? "rotate-45" : "group-hover:rotate-90"
                            )}
                        />
                    </button>

                    <AnimatePresence>
                        {activeId === h.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute left-full top-0 ml-4 w-48 origin-top-left rounded-lg border border-white/10 bg-black/80 p-4 backdrop-blur-md"
                                style={{ zIndex: 50 }}
                            >
                                <h4 className="mb-1 text-xs font-bold uppercase tracking-wider text-primary">
                                    {h.title}
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {h.desc}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
