"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ModeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AboutPage() {
  return (
    <div className="min-h-screen  bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">

      {/* Header */}
      <header className="sticky top-0 z-50 w-full  border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2" >
          <SidebarTrigger />
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

      {/* Main Content */}
      <main className="container py-12">
        {/* Hero Section */}
        <section className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to SoulSync</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your AI-powered companion for emotional well-being and personal growth
          </p>
        </section>

        <Separator className="my-8" />

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 my-12">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
              <p className="text-muted-foreground">
                Advanced AI technology that understands your emotions through natural conversation and provides meaningful insights.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Personal Growth</h3>
              <p className="text-muted-foreground">
                Track your emotional journey with detailed sentiment charts and visualizations to help you understand your progress.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Safe Space</h3>
              <p className="text-muted-foreground">
                A private, judgment-free environment where you can express yourself freely and receive supportive responses.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            At SoulSync, we believe in the power of emotional intelligence and mental well-being. 
            Our mission is to provide accessible, AI-powered emotional support to everyone, 
            helping you understand and navigate your feelings while fostering personal growth.
          </p>
        </section>

        {/* CTA Section */}
        <section className="py-12 text-center bg-accent rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of users who have already discovered the benefits of emotional well-being with SoulSync.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-primary">
              Start Your Free Journey
            </Button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
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