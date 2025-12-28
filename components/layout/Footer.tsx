import Link from "next/link";
import { Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold tracking-tighter">RUNVAULT</h3>
                        <p className="text-sm text-muted-foreground">
                            Engineered to run, built to last. Premium running gear for the
                            modern athlete.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/product" className="hover:text-primary">
                                    AeroPulse Runner
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="hover:text-primary">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/tech" className="hover:text-primary">
                                    Technology
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <Link href="/about" className="hover:text-primary">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-primary">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/privacy" className="hover:text-primary">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/legal/terms" className="hover:text-primary">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Connect</h4>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary">
                                <Github className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} RUNVAULT. All rights reserved.</p>
                    <p className="mt-2 text-[10px] opacity-50">
                        Concept project. Not affiliated with any commercial brand.
                    </p>
                </div>
            </div>
        </footer>
    );
}
