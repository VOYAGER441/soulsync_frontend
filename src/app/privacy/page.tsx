"use client";

import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function PrivacyPage() {
  return (
    
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
         

          {/* Main Content */}
          <main className="container py-12  mx-auto">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-6">Last updated: April 20, 2025</p>

            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-muted-foreground">
                  SoulSync (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our AI-powered emotional well-being platform.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-medium">Personal Information</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Name and email address</li>
                    <li>Google account information (when using Google Sign-In)</li>
                    <li>Profile information including avatar</li>
                  </ul>

                  <h3 className="text-xl font-medium">Usage Data</h3>
                  <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                    <li>Chat messages and conversation history</li>
                    <li>Sentiment analysis data and mood trends</li>
                    <li>Device information (operating system, device name)</li>
                    <li>Location data (country name only)</li>
                    <li>Usage patterns and preferences</li>
                  </ul>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>To provide and personalize our AI-powered emotional support services</li>
                  <li>To analyze and track your emotional well-being through sentiment analysis</li>
                  <li>To improve our services and develop new features</li>
                  <li>To communicate with you about your account and updates</li>
                  <li>To ensure the security and proper functioning of our platform</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
                <p className="text-muted-foreground mb-4">
                  We use Appwrite as our backend service provider and implement industry-standard security measures to protect your data. Your information is stored securely and processed in accordance with applicable data protection laws.
                </p>
                <p className="text-muted-foreground">
                  We use local storage and cookies for essential platform functionality, such as maintaining your session and remembering your preferences.
                </p>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Export your data</li>
                  <li>Opt-out of certain data processing activities</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:{" "}
                  <a href="mailto:voyagerwebteams@gmail.com" className="text-primary hover:underline">
                    voyagerwebteams@gmail.com
                  </a>
                </p>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="border-t mt-12">
            <div className="container py-8">
              <div className="flex justify-center items-center flex-wrap gap-4">
                <div className="flex items-center gap-2" onClick={() => window.location.href = "/"}>
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