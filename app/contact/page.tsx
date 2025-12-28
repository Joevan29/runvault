"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Plus, Minus, AlertCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const FAQS = [
    { q: "How does the sizing run?", a: "AeroPulse runs true to size. If you have wide feet, we recommend sizing up 0.5." },
    { q: "What materials are used?", a: "We use a proprietary nitrogen-infused foam and recycled engineered mesh for the upper." },
    { q: "Shipping timeline?", a: "US orders arrive in 3-5 days. International orders take 7-14 business days." },
];

function FaqItem({ q, a }: { q: string, a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between py-4 text-left hover:text-primary transition-colors"
            >
                <span className="font-medium text-sm">{q}</span>
                {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const topic = formData.get("topic") as string;
        const message = formData.get("message") as string;

        if (!name || name.length < 2) return;
        if (!email || !email.includes("@")) return;
        if (!message || message.length < 10) return;
        if (!topic) return;

        setIsLoading(true);

        await new Promise((r) => setTimeout(r, 800));

        const subject = encodeURIComponent(`[RUNVAULT] ${topic} - ${name}`);
        const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);

        window.location.href = `mailto:hello@runvault.demo?subject=${subject}&body=${body}`;

        setSubmitted(true);
        setIsLoading(false);
    };

    if (submitted) {
        return (
            <main className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <section className="flex-1 flex items-center justify-center pt-32 pb-24">
                    <Container>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-md mx-auto text-center"
                        >
                            <div className="h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                <CheckCircle className="h-10 w-10" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Draft Opened</h2>
                            <p className="text-muted-foreground mb-8">
                                Please check your email client to complete sending the message.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button variant="outline" onClick={() => setSubmitted(false)}>
                                    Back to Form
                                </Button>
                                <a
                                    href="mailto:hello@runvault.demo"
                                    className="text-xs text-muted-foreground hover:text-white underline underline-offset-4"
                                >
                                    Client didn't open? Click here
                                </a>
                            </div>
                        </motion.div>
                    </Container>
                </section>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <section className="pt-32 pb-24">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

                        <div className="lg:col-span-5 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h1 className="text-5xl font-bold tracking-tighter mb-4">CONTACT</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Questions about sizing, shipping, or the Skywave technology? We're here.
                                </p>
                            </motion.div>

                            <div className="space-y-6">
                                <div className="p-6 rounded-2xl bg-secondary/5 border border-white/5">
                                    <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Quick Info</div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-white font-medium">Email</div>
                                            <div className="text-primary">hello@runvault.demo</div>
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">Response Time</div>
                                            <div className="text-muted-foreground text-sm">Within 24 hours</div>
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">Location</div>
                                            <div className="text-muted-foreground text-sm">Jakarta, ID</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-bold mb-4">FAQ</h3>
                                    <div className="border-t border-white/10">
                                        {FAQS.map((faq, i) => (
                                            <FaqItem key={i} q={faq.q} a={faq.a} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-secondary/5 border border-white/5 p-8 lg:p-10 rounded-3xl backdrop-blur-xl relative overflow-hidden"
                            >
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
                                            <input
                                                id="name" name="name"
                                                required minLength={2}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all invalid:border-red-500/50"
                                                placeholder="John Doe"
                                                onBlur={() => setTouched(p => ({ ...p, name: true }))}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</label>
                                            <input
                                                id="email" name="email" type="email"
                                                required
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all invalid:border-red-500/50"
                                                placeholder="john@example.com"
                                                onBlur={() => setTouched(p => ({ ...p, email: true }))}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="topic" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Topic</label>
                                        <div className="relative">
                                            <select
                                                id="topic" name="topic" required
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-primary/50 appearance-none transition-all cursor-pointer"
                                                defaultValue=""
                                                onBlur={() => setTouched(p => ({ ...p, topic: true }))}
                                            >
                                                <option value="" disabled className="bg-zinc-900 text-muted-foreground">Select a topic...</option>
                                                <option value="Product Sizing" className="bg-zinc-900">Product & Sizing</option>
                                                <option value="Order Status" className="bg-zinc-900">Order Status</option>
                                                <option value="Partnership" className="bg-zinc-900">Partnership</option>
                                                <option value="Other" className="bg-zinc-900">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                                <Plus className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Message</label>
                                        <textarea
                                            id="message" name="message"
                                            required minLength={10} rows={5}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none transition-all invalid:border-red-500/50"
                                            placeholder="Tell us details..."
                                            onBlur={() => setTouched(p => ({ ...p, message: true }))}
                                        />
                                        {touched.message && (
                                            <div className="hidden peer-invalid:flex items-center text-red-400 text-xs mt-1">
                                                <AlertCircle className="h-3 w-3 mr-1" /> Min 10 chars
                                            </div>
                                        )}
                                    </div>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" name="newsletter" className="w-4 h-4 rounded border-white/20 bg-black/20 checked:bg-primary accent-primary" />
                                        <span className="text-sm text-muted-foreground group-hover:text-white transition-colors">Send me product updates and lab reports</span>
                                    </label>

                                    <Button
                                        type="submit"
                                        className="w-full h-14 text-base font-bold rounded-xl bg-white text-black hover:bg-white/90"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Processing..." : <span className="flex items-center">Send via Email <ArrowRight className="ml-2 h-5 w-5" /></span>}
                                    </Button>

                                    <p className="text-center text-xs text-muted-foreground opacity-60">
                                        This site is a demo. Messages open your default email client.
                                    </p>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </Container>
            </section>

            <Footer />
        </main>
    );
}
