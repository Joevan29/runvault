"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/Container";

export default function AboutPage() {

    const SPECS = [
        { label: "Weight", value: "210g" },
        { label: "Drop", value: "8mm" },
        { label: "Stack", value: "32/24mm" },
        { label: "Surface", value: "Road" },
    ];

    const CARDS = [
        { title: "Engineered Mesh", desc: "Adaptive upper that breathes with your foot, reducing heat buildup." },
        { title: "Locked Heel", desc: "Anatomical mold for zero slippage during high-speed transitions." },
        { title: "Responsive Midsole", desc: "Nitrogen-infused foam provides 85% energy return on impact." },
        { title: "Carbon Core", desc: "Composite plate engineered for maximum propulsive snap." },
        { title: "Grip Geometry", desc: "Multi-directional tread pattern adapted for wet and dry roads." },
        { title: "Aero Design", desc: "Sculpted by wind tunnel testing to minimize drag coefficient." },
    ];

    return (
        <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <Navbar />

            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="relative z-10"
                        >
                            <Badge variant="premium" className="mb-6">About Us</Badge>
                            <h1 className="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl leading-tight">
                                REDEFINING <br />
                                <span className="text-primary">MOMENTUM.</span>
                            </h1>
                            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mb-8">
                                We are a collective of engineers, designers, and athletes obsessed with the mechanics of speed. We don't follow trends; we follow physics.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-t border-white/10">
                                {SPECS.map(s => (
                                    <div key={s.label}>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
                                        <div className="text-base sm:text-lg font-bold text-white">{s.value}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="hidden lg:flex items-center justify-center p-12 relative">
                            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full -z-10" />
                            <div className="font-mono text-sm text-white/20 text-right space-y-2 relative z-10 w-full select-none">
                                <p className="border-b border-white/10 pb-2">PROJECT: AERO_V1</p>
                                <p>STATUS: PROTOTYPE_FINAL</p>
                                <p>INDEX: 0.9882</p>
                                <p>V_OFFSET: +12%</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="py-16 md:py-24">
                <Container>
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16">

                        <div className="lg:col-span-5 relative order-1">
                            <div className="sticky top-32">
                                <h3 className="text-2xl sm:text-3xl font-bold mb-6">The Breakdown</h3>
                                <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg">
                                    <p>
                                        Every component of the AeroPulse is deliberated. From the molecular structure of our midsole foam to the weave pattern of the upper, nothing is accidental.
                                    </p>
                                    <p>
                                        Our design philosophy is simple: Eliminate drag, maximize output. We believe that the best running shoe is the one you forget you're wearing.
                                    </p>
                                    <p className="hidden sm:block">
                                        Data-driven design meets raw athletic instinct. This is the future of performance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 order-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                {CARDS.map((v, i) => (
                                    <motion.div
                                        key={v.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group relative flex flex-col items-start gap-4 p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-primary/30 hover:bg-white/10 transition-colors min-h-[140px] sm:min-h-[180px]"
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-mono leading-none">
                                                0{i + 1}
                                            </div>
                                            <h4 className="text-base sm:text-lg font-semibold text-white group-hover:text-primary transition-colors line-clamp-1">
                                                {v.title}
                                            </h4>
                                        </div>
                                        <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                                            {v.desc}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <Footer />
        </main>
    );
}
