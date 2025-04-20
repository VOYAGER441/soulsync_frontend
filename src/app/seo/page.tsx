"use client"

import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"
import AboutPage from "../about/page"
import PrivacyPage from "../privacy/page"
import TermsPage from "../terms/page"
import ContactPage from "../contact/page"
import Home   from "../page"

export default function SEO() {
  
  const [selectedPage, setSelectedPage] = useState<string>("about")

 

  const renderContent = () => {
    switch (selectedPage) {
      case "/":
        return <Home />
      case "about":
        return <AboutPage />
      case "contact":
        return <ContactPage />
      case "privacy":
        return <PrivacyPage />
      case "terms":
        return <TermsPage />
      default:
        return <AboutPage />
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <SidebarProvider>
        <AppSidebar 
          
          onNavigate={(path: string) => {
            const page = path.replace("/", "")
            setSelectedPage(page)
          }}
        />
        <SidebarInset className="bg-black">
        
          <main className="h-[calc(100vh-4rem)] overflow-auto">
            {renderContent()}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
