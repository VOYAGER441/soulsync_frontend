"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/ModeToggle";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     // Here you would typically send the contact form data to your backend
    //     // For now, we'll just show a success message
    //     toast.success("Message sent successfully! We'll get back to you soon.");
    //     setName("");
    //     setEmail("");
    //     setMessage("");
    // };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
                    <div className="container flex h-14 items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image src="/assets/logo1.webp" alt="SoulSync Logo" width={40} height={40} />
                            <span className="text-xl font-bold">SoulSync</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <ModeToggle />
                            <Link href="/login">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    </div>
                </header>

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto">
                        <Card className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col items-center text-center">
                                        <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
                                        <p className="text-muted-foreground text-balance">
                                            Have questions? We`d love to hear from you. Send us a message and we`ll get back to you as soon as possible.
                                        </p>
                                    </div>

                                    <form
                                        action={`${process.env.NEXT_PUBLIC_CONTACT_FORM_URL}`} 
                                        method="POST"
                                        className="space-y-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Your name"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="you@example.com"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="message">Message</Label>
                                            <textarea
                                                id="message"
                                                required
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                placeholder="Your message"
                                                className="min-h-[150px] w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                                            />
                                        </div>

                                        <Button type="submit" className="w-full">
                                            Send Message
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t mt-12">
                    <div className="container py-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Image src="/assets/logo1.webp" alt="SoulSync Logo" width={32} height={32} />
                                <span className="font-semibold">SoulSync</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                © 2025 SoulSync. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}