import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HomeScrollyShowcase } from "@/components/home/HomeScrollyShowcase";
import { TechGrid } from "@/components/home/TechGrid";
import { Specs } from "@/components/home/Specs";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { FAQ } from "@/components/home/FAQ";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <Hero />
            <HomeScrollyShowcase />
            <Features />
            <TechGrid />
            <Specs />
            <GalleryPreview />
            <FAQ />

            <section className="relative overflow-hidden py-32 text-center">
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-primary/10 to-transparent" />
                <div className="container mx-auto px-4">
                    <h2 className="mb-6 text-4xl font-bold tracking-tighter sm:text-6xl">
                        READY TO FLY?
                    </h2>
                    <p className="mx-auto mb-8 max-w-[600px] text-lg text-muted-foreground">
                        Join the revolution. Secure your pair of AeroPulse Runners today.
                    </p>
                    <Button size="lg" className="h-16 px-12 text-xl" asChild>
                        <Link href="/product">Pre-order Now</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
