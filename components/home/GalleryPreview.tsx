"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const galleryImages = [
    "https://placehold.co/600x600/292524/FFF?text=Action+Shot+1",
    "https://placehold.co/600x600/171717/FFF?text=Action+Shot+2",
    "https://placehold.co/600x600/404040/FFF?text=Action+Shot+3",
];

const testimonials = [
    {
        quote: "The energy return is unreal. My daily runs just got faster.",
        author: "Alex R.",
        role: "Marathoner",
    },
    {
        quote: "Finally a shoe that looks as good as it performs.",
        author: "Sarah K.",
        role: "Urban Runner",
    },
    {
        quote: "Stable, lightweight, and incredibly durable.",
        author: "Mike T.",
        role: "Trail Enthusiast",
    },
];

export function GalleryPreview() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex items-end justify-between">
                    <h2 className="text-3xl font-bold tracking-tighter">IN ACTION</h2>
                    <Button variant="link" asChild className="hidden sm:inline-flex">
                        <Link href="/gallery">View Full Gallery <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {galleryImages.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-secondary"
                        >
                            <Image
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-4 rounded-xl border border-white/5 bg-white/5 p-6 backdrop-blur-sm"
                        >
                            <div className="flex gap-1 text-primary">
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-primary" />)}
                            </div>
                            <p className="text-lg font-medium italic">"{t.quote}"</p>
                            <div>
                                <div className="font-bold">{t.author}</div>
                                <div className="text-sm text-muted-foreground">{t.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
