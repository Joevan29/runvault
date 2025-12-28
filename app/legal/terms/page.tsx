import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto min-h-[60vh] px-4 py-24 max-w-3xl">
                <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
                <div className="prose prose-invert max-w-none">
                    <p>Please read these Terms of Service carefuly before using the RUNVAULT website.</p>
                    <h2>Acceptance of Terms</h2>
                    <p>By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.</p>
                    <p className="text-muted-foreground italic">[Simplified for concept demo]</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
