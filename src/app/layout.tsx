import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProviderWrapper from "@/components/ThemeProviderWrapper";
import { Geist, Geist_Mono } from "next/font/google";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "SoulSync AI",
  description: "An AI chatbot that can help you with your mental health",
};

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} ${geistMono.className}`}>
        <ThemeProviderWrapper>
          {children}
          <Toaster />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}