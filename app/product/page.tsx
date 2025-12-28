import { ProductDetail } from "@/components/product/ProductDetail";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function ProductPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <ProductDetail />
            <Footer />
        </main>
    );
}
