"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function UpgradePage() {
  const features = [
    {
      title: "Advanced Sentiment Analysis",
      description: "Enhanced emotional tracking with detailed breakdowns and insights",
      comingSoon: true,
    },
    {
      title: "Personalized AI Responses",
      description: "More contextual and personalized AI interactions based on user history",
      comingSoon: true,
    },
    {
      title: "Journal Integration",
      description: "Private journaling with AI-powered reflection prompts",
      comingSoon: true,
    },
    {
      title: "Goal Setting & Tracking",
      description: "Set emotional well-being goals and track progress over time",
      comingSoon: true,
    },
    {
      title: "Community Support",
      description: "Connect with others on similar emotional well-being journeys",
      comingSoon: true,
    },
    {
      title: "Professional Support Integration",
      description: "Connect with licensed therapists when needed",
      comingSoon: true,
    },
  ];

  return (
    // <SidebarProvider>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
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

          {/* Main Content */}
          <main className="container py-12 mx-auto">
            {/* Pricing Section */}
            <section className="text-center mb-16">
              <h1 className="text-4xl font-bold mb-4">Upgrade Your Emotional Journey</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We`re working on premium features to enhance your emotional well-being experience
              </p>
            </section>

            {/* Features Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {feature.title}
                      {feature.comingSoon && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Separator className="my-16" />

            {/* Open Source Section */}
            <section className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Open Source Project</h2>
              <p className="text-muted-foreground mb-8">
                SoulSync is an open-source project dedicated to making emotional well-being support accessible to everyone. 
                We welcome developers to contribute and help us build a better platform.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Frontend Repository</CardTitle>
                    <CardDescription>React, Next.js, TypeScript</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link 
                      href="https://github.com/VOYAGER441/soulsync_frontend.git" 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Github className="w-5 h-5" />
                      View Frontend Code
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Backend Repository</CardTitle>
                    <CardDescription>Python, FastAPI, Machine Learning</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link 
                      href="https://github.com/VOYAGER441/SoulSync-_backend.git" 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <Github className="w-5 h-5" />
                      View Backend Code
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Want to contribute or learn more? Visit our GitHub profile:
                </p>
                <Link 
                  href="https://github.com/VOYAGER441" 
                  target="_blank"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="w-5 h-5" />
                  @VOYAGER441
                </Link>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-t mt-12">
            <div className="container py-8">
              <div className="flex justify-center items-center flex-wrap gap-4">
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
    // </SidebarProvider>
  );
}

export default UpgradePage;