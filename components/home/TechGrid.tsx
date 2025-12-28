"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const techItems = [
    {
        id: "TECH-01",
        title: "Carbon Plate",
        desc: "Propulsive snap at toe-off.",
        col: "md:col-span-2",
        bg: "bg-gradient-to-br from-purple-900/20 to-transparent"
    },
    {
        id: "TECH-02",
        title: "Mesh Upper",
        desc: "Zonal breathability.",
        col: "md:col-span-1",
        bg: "bg-gradient-to-br from-blue-900/20 to-transparent"
    },
    {
        id: "TECH-03",
        title: "Nano Grip",
        desc: "All-weather traction.",
        col: "md:col-span-1",
        bg: "bg-gradient-to-br from-emerald-900/20 to-transparent"
    },
    {
        id: "TECH-04",
        title: "Heel Lock",
        desc: "Secure fit for stability.",
        col: "md:col-span-2",
        bg: "bg-gradient-to-br from-orange-900/20 to-transparent"
    },
];

export function TechGrid() {
    return (
        <section id="tech" className="py-24 scroll-mt-24">
            <Container>
                <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        PRECISION ENGINEERING
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 text-white">
                    {techItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-secondary/10 p-8 hover:border-primary/50 transition-colors min-h-[200px] md:min-h-[250px] ${item.col} ${item.bg}`}
                        >
                            <div className="absolute top-4 right-4 text-xs font-mono text-white/50">
                                {item.id}
                            </div>
                            <h3 className="text-2xl font-bold relative z-10">{item.title}</h3>
                            <p className="mt-2 text-white/70 relative z-10">{item.desc}</p>

                            {/* Hover Highlight */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
