import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
            <h1 className="text-9xl font-bold tracking-tighter text-primary/20">404</h1>
            <h2 className="mt-8 text-3xl font-bold">Off Track</h2>
            <p className="mt-4 text-muted-foreground max-w-md">
                The page you are looking for has hit a wall. Let's get you back on course.
            </p>
            <Button asChild size="lg" className="mt-8">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
