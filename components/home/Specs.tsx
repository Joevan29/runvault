"use client";

import { motion } from "framer-motion";

const specs = [
    { label: "Weight", value: "210g (M9)" },
    { label: "Drop", value: "8mm" },
    { label: "Stack Height", value: "38mm / 30mm" },
    { label: "Upper Material", value: "Engineered Mesh" },
    { label: "Outsole", value: "Nano-Grip Rubber" },
];

export function Specs() {
    return (
        <section className="bg-secondary/10 py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter">
                        TECHNICAL SPECIFICATIONS
                    </h2>
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-background/50 backdrop-blur-sm">
                        {specs.map((spec, index) => (
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-between border-b border-white/5 p-6 last:border-0 hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-muted-foreground">{spec.label}</span>
                                <span className="font-bold">{spec.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
