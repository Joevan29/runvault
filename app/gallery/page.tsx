"use client";

import { useState, useCallback, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShoeViewer, ViewPreset } from "@/components/3d/ShoeViewer";
import { Container } from "@/components/ui/Container";

const ITEMS = [
    { id: 1, title: "Front Profile", view: "front34" },
    { id: 2, title: "Lateral Side", view: "side" },
    { id: 3, title: "Top Down", view: "top" },
    { id: 4, title: "Heel Counter", view: "heel" },
    { id: 5, title: "Traction Map", view: "sole" },
    { id: 6, title: "Mesh Detail", view: "detail" },
    { id: 7, title: "Iso Left", view: "front34" },
    { id: 8, title: "Iso Right", view: "side" },
] as const;

function GalleryCard({ item, onClick, index }: { item: any, onClick: () => void, index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border border-white/5 bg-secondary/5 hover:border-primary/50 transition-colors"
        >
            {isInView ? (
                <div className="w-full h-full pointer-events-none">
                    <Suspense fallback={<div className="w-full h-full bg-secondary/10" />}>
                        <ShoeViewer
                            mode="galleryThumb"
                            view={item.view as ViewPreset}
                            className="w-full h-full"
                        />
                    </Suspense>
                </div>
            ) : <div className="w-full h-full bg-secondary/10" />}

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <ZoomIn className="h-8 w-8 text-white scale-90 group-hover:scale-100 transition-transform" />
            </div>
            <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-xs font-medium text-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/5 group-hover:text-white group-hover:bg-black/50 transition-all">
                    {item.title}
                </span>
            </div>
        </motion.div>
    );
}

export default function GalleryPage() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (selectedId === null) return;
        if (e.key === "Escape") setSelectedId(null);
        if (e.key === "ArrowLeft") navigate(-1);
        if (e.key === "ArrowRight") navigate(1);
    }, [selectedId]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    const navigate = (dir: number) => {
        if (selectedId === null) return;
        const currentIndex = ITEMS.findIndex(item => item.id === selectedId);
        const nextIndex = (currentIndex + dir + ITEMS.length) % ITEMS.length;
        setSelectedId(ITEMS[nextIndex].id);
    };

    const selectedItem = ITEMS.find((item) => item.id === selectedId);

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <section className="pt-32 pb-20">
                <Container>
                    <div className="mb-16 text-center max-w-2xl mx-auto">
                        <h1 className="text-5xl font-bold tracking-tighter mb-6">
                            GALLERY
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Inspect the construction. Select any angle to enter interactive mode.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {ITEMS.map((item, index) => (
                            <GalleryCard
                                key={item.id}
                                item={item}
                                index={index}
                                onClick={() => setSelectedId(item.id)}
                            />
                        ))}
                    </div>
                </Container>
            </section>

            <Footer />

            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
                        onClick={() => setSelectedId(null)}
                    >
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-6 top-6 z-50 text-white rounded-full bg-white/10 hover:bg-white/20"
                            onClick={() => setSelectedId(null)}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hidden sm:flex"
                            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                        >
                            <ChevronLeft className="h-10 w-10" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hidden sm:flex"
                            onClick={(e) => { e.stopPropagation(); navigate(1); }}
                        >
                            <ChevronRight className="h-10 w-10" />
                        </Button>

                        <div
                            className="relative w-full h-full max-w-6xl max-h-[80vh] flex flex-col items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-full flex-1 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-transparent relative">
                                <Suspense fallback={<div className="flex h-full w-full items-center justify-center text-white/50"><Loader2 className="animate-spin mr-2" /> Loading High-Res 3D...</div>}>
                                    <ShoeViewer
                                        mode="modal"
                                        view={selectedItem.view as ViewPreset}
                                        className="w-full h-full"
                                    />
                                </Suspense>

                                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                                    <h3 className="text-3xl font-bold text-white mb-1">{selectedItem.title}</h3>
                                    <p className="text-white/60 text-sm">Drag to rotate • Scroll to zoom</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
