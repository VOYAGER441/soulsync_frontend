"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "sonner";

export default function ContactPage() {
    return (
        
            <div className="min-h-screen bg-background text-foreground">
                {/* Header */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                   

                    <div className="container mx-auto px-4 py-12">
                        <div className=" mx-auto">
                            <Card className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col items-center text-center">
                                            <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
                                            <p className="text-muted-foreground text-balance">
                                                Have questions? We’d love to hear from you! Send us a message and we’ll get back to you as soon as possible. For contact inquiries, feedback, or support requests, you can also reach us at our official email: <strong>voyagerwebteams@gmail.com</strong>.
                                            </p>

                                        </div>

                                        <form
                                            action={`${process.env.NEXT_PUBLIC_CONTACT_FORM_URL}`} 
                                            method="POST"
                                            onSubmit={() => toast.success("Message sent successfully!")}
                                            className="space-y-6"
                                        >
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    type="text"
                                                    placeholder="Your name"
                                                    required
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    required
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <Label htmlFor="message">Message</Label>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    required
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
                            <div className="flex justify-center items-center flex-wrap gap-4">
                                <div className="flex items-center gap-2" onClick={()=>window.location.href="/"}>
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
