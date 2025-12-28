"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
    {
        question: "What makes the AeroPulse Runner different?",
        answer: "The AeroPulse features our proprietary Nano-Grip outsole and Carbon-infused plate, delivering industry-leading energy return and stability in a lightweight package.",
    },
    {
        question: "How does the sizing run?",
        answer: "The AeroPulse runs true to size. If you prefer a wider fit, we recommend sizing up by half a size.",
    },
    {
        question: "Is this shoe suitable for long distance?",
        answer: "Absolutely. The dual-density foam stack is engineered specifically for marathons and daily high-mileage training.",
    },
    {
        question: "What is the return policy?",
        answer: "We offer a 30-day trial run. If you're not completely satisfied, return them in any condition for a full refund.",
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 100 countries worldwide with expedited shipping options available.",
    },
    {
        question: "How do I care for my AeroPulse Runners?",
        answer: "Hand wash with mild soap and air dry. Do not machine wash or dry, as this may compromise the structural integrity of the upper.",
    },
];

export function FAQ() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer
            }
        }))
    };

    return (
        <section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tighter">
                        FREQUENTLY ASKED
                    </h2>
                    <p className="mb-8 text-muted-foreground">
                        Everything you need to know about the AeroPulse.
                    </p>
                    <Button asChild>
                        <Link href="/contact">Still have questions?</Link>
                    </Button>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
