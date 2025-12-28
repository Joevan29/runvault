import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto min-h-[60vh] px-4 py-24 max-w-3xl">
                <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none">
                    <p>Effective Date: January 1, 2025</p>
                    <p>At RUNVAULT, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information.</p>
                    <h2>Information We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.</p>
                    <p className="text-muted-foreground italic">[Simplified for concept demo]</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
