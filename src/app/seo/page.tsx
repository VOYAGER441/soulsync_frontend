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
        
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
