"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Wind, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoeViewer } from "@/components/3d/ShoeViewer";
import { Container } from "@/components/ui/Container";

export function Hero() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "0px 0px -20% 0px" });

    const ACTION_SHOT = "/gallery/thumb.svg"; 
    return (
        <>
            <section ref={ref} className="relative min-h-[90vh] overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
                <div className="absolute inset-0 bg-background pointer-events-none">
                    <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
                </div>

                <Container className="grid lg:grid-cols-2 gap-12 items-center h-full">
                    <div className="space-y-8 z-10 pointer-events-none md:pointer-events-auto order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge variant="premium" className="mb-6">
                                New Arrival • AeroPulse
                            </Badge>
                            <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl xl:text-8xl leading-[0.9]">
                                ENGINEERED <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/50">TO RUN.</span>
                            </h1>
                            <p className="mt-8 max-w-[600px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
                                Precision cushioning for daily miles. Built with adaptive response technology for the ultimate stride.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col gap-4 sm:flex-row pointer-events-auto"
                        >
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
                                <Link href="/product">
                                    Pre-order Now <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full" asChild>
                                <Link href="#tech">
                                    Explore Tech
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex items-center gap-6 pt-6 text-sm text-muted-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <Wind className="h-4 w-4 text-primary" /> Breathable
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-primary" /> Stable
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4 text-primary" /> Energy Return
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative w-full flex items-center justify-center order-1 lg:order-2 h-[320px] md:h-[420px] lg:h-[520px]">
                        <div className="relative w-full h-full max-w-[520px] max-h-[520px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl -z-10" />

                            <Suspense fallback={
                                <div className="flex h-full w-full items-center justify-center">
                                    <span className="animate-pulse text-muted-foreground text-sm">Loading 3D...</span>
                                </div>
                            }>
                                <ShoeViewer
                                    mode="homeHero"
                                    active={isInView}
                                    className="w-full h-full"
                                />
                            </Suspense>
                        </div>
                    </div>
                </Container>
            </section>


        </>
    );
}
