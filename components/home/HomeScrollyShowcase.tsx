"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoeViewer, ShoeViewerApi } from "@/components/3d/ShoeViewer";
import { cn } from "@/lib/utils";
import * as THREE from "three";

const PHASES = [
    {
        title: "Responsive Cushion",
        desc: "Energy return in every stride. Nitrogen-infused foam reacts to your impact.",
        id: "step1"
    },
    {
        title: "Stability Core",
        desc: "Locked-in support on fast turns. The midfoot cage adapts to your foot shape.",
        id: "step2"
    },
    {
        title: "Grip Geometry",
        desc: "Confident traction on mixed surfaces. Carbon rubber outsole bites the pavement.",
        id: "step3"
    },
    {
        title: "Featherweight Build",
        desc: "Strong materials. Less drag. Engineered mesh upper breathes with you.",
        id: "step4"
    },
];

export function HomeScrollyShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePhase, setActivePhase] = useState(0);
    const progressRef = useRef(0);
    const [viewerApi, setViewerApi] = useState<ShoeViewerApi | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const [debugInfo, setDebugInfo] = useState({ progress: 0, step: 0 });
    const isDev = process.env.NODE_ENV === "development";

    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0 });

        if (containerRef.current) obs.observe(containerRef.current);
        return () => obs.disconnect();
    }, []);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionHeight = rect.height;
        const top = rect.top;

        const maxScroll = sectionHeight - viewportHeight;
        if (maxScroll <= 0) return;

        const scrollYWithin = -top;
        const p = Math.max(0, Math.min(1, scrollYWithin / maxScroll));

        progressRef.current = p;

        if (isDev) {
        }

        const phase = Math.min(Math.floor(p * 4), 3);
        setActivePhase((prev) => (prev !== phase ? phase : prev));
    }, [isDev]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        if (!isVisible || !viewerApi) return;

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        if (mediaQuery.matches) {
            const { camera, radius } = viewerApi;
            if (camera && radius) {
                const r = radius;
                camera.position.set(r * 6.0, r * 1.5, r * 3.0);
                camera.lookAt(0, r * 0.1, 0);
            }
            return;
        }

        let frameId: number;
        const { camera, radius } = viewerApi;
        const r = radius || 5.0;

        const KF = [
            { pos: new THREE.Vector3(4.0 * r, 2.0 * r, 5.0 * r), look: new THREE.Vector3(0, 0.1 * r, 0) },
            { pos: new THREE.Vector3(6.0 * r, 1.5 * r, 3.0 * r), look: new THREE.Vector3(0, 0.1 * r, 0) },
            { pos: new THREE.Vector3(4.5 * r, 3.5 * r, 2.8 * r), look: new THREE.Vector3(0, 0.2 * r, 0) },
            { pos: new THREE.Vector3(-4.0 * r, 2.0 * r, -5.0 * r), look: new THREE.Vector3(0, 0.1 * r, 0) },
        ];

        const targetPos = new THREE.Vector3();
        const targetLook = new THREE.Vector3();
        const currentLook = new THREE.Vector3(0, 0, 0);
        const lookTarget = new THREE.Vector3(0, 0, 0);

        const loop = () => {
            const p = progressRef.current;

            const totalSegs = 3;
            const rawSeg = p * totalSegs;
            const idx = Math.floor(rawSeg);
            const nextIdx = Math.min(idx + 1, totalSegs);
            const t = rawSeg - idx; 
            const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            const start = KF[Math.min(idx, 3)];
            const end = KF[Math.min(nextIdx, 3)];

            if (start && end) {
                targetPos.lerpVectors(start.pos, end.pos, easeT);
                targetLook.lerpVectors(start.look, end.look, easeT);

                const alpha = 0.1;

                camera.position.lerp(targetPos, alpha);
                lookTarget.lerp(targetLook, alpha);

                camera.lookAt(lookTarget);
                if (camera instanceof THREE.PerspectiveCamera) {
                    camera.updateProjectionMatrix();
                }
            }

            frameId = requestAnimationFrame(loop);
        };

        loop();
        return () => cancelAnimationFrame(frameId);
    }, [isVisible, viewerApi]);

    return (
        <section
            ref={containerRef}
            className="relative bg-background"
            style={{ height: "360vh" }}
        >


            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <div className="absolute inset-0 z-0 bg-background">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-background to-background" />
                    <ShoeViewer
                        mode="homeScrolly"
                        active={isVisible}
                        onReady={(api) => setViewerApi(api)}
                        className="w-full h-full"
                    />
                </div>

                <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 grid grid-cols-12 pointer-events-none">

                    <div className="hidden lg:flex col-span-2 flex-col justify-center items-center h-full">
                        <div className="relative h-64 w-1 bg-white/10 rounded-full flex flex-col justify-between items-center py-0">
                            <motion.div
                                className="absolute w-1 bg-primary rounded-full top-0"
                                animate={{ height: `${((activePhase) / (PHASES.length - 1)) * 100}%` }}
                                transition={{ type: "spring", stiffness: 50 }}
                                style={{ minHeight: "10px" }}
                            />
                            {PHASES.map((_, i) => (
                                <div key={i} className={cn(
                                    "z-10 w-3 h-3 rounded-full border border-background transition-colors duration-500",
                                    i <= activePhase ? "bg-primary" : "bg-white/20"
                                )} />
                            ))}
                        </div>
                    </div>

                    <div className="col-span-12 lg:col-span-6"></div>

                    <div className="col-span-12 lg:col-span-4 flex flex-col justify-end lg:justify-center pb-24 lg:pb-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhase}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="p-8"
                            >
                                <div className="inline-block px-3 py-1 mb-4 text-xs font-bold text-black bg-primary rounded-full uppercase tracking-wider backdrop-blur-md">
                                    Step 0{activePhase + 1}
                                </div>
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 italic tracking-tighter shadow-black drop-shadow-lg">
                                    {PHASES[activePhase].title}
                                </h3>
                                <p className="text-xl text-white/90 leading-relaxed font-light drop-shadow-md">
                                    {PHASES[activePhase].desc}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2 lg:hidden">
                    {PHASES.map((_, i) => (
                        <div key={i} className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            i === activePhase ? "w-8 bg-primary" : "w-2 bg-white/20"
                        )} />
                    ))}
                </div>
            </div>
        </section>
    );
}
