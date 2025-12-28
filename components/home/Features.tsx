"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Feather } from "lucide-react";
import { Container } from "@/components/ui/Container";

const features = [
    {
        icon: Feather,
        title: "Ultralight Build",
        description: "At just 210g, the AeroPulse vanish on your feet.",
    },
    {
        icon: Shield,
        title: "Impact Protection",
        description: "Dual-density foam absorbs shock for taller stacks.",
    },
    {
        icon: Zap,
        title: "Energy Return",
        description: "Carbon-infused plate propels you forward.",
    },
];

export function Features() {
    return (
        <section className="py-24 bg-background">
            <Container>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-primary/50">
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-3 text-xl font-bold tracking-tight">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
