"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  const toggleLoading = () => {
    setIsLoading((prev) => !prev)
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <SidebarProvider>
        <AppSidebar isLoading={isLoading} />
        <SidebarInset className="bg-black">
          <header className="flex h-16 items-center gap-4 border-b border-border px-6">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">OpenAI</h1>
            <div className="ml-auto">
              <Button
                variant="outline"
                onClick={toggleLoading}
                className="text-white border-white/20 hover:bg-white/10"
              >
                {isLoading ? "Show Content" : "Show Skeleton"}
              </Button>
            </div>
          </header>
          <main className="container py-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Company</h2>
              <h1 className="text-6xl font-bold tracking-tight">About</h1>
            </div>
            <div className="mt-8 max-w-2xl">
              <p className="text-lg text-white/80">
                OpenAI is an AI research and deployment company. Our mission is to ensure that artificial general
                intelligence benefits all of humanity.
              </p>
            </div>
            <div className="mt-12 aspect-video w-full rounded-lg bg-zinc-800/50">
              {/* Placeholder for image content */}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
