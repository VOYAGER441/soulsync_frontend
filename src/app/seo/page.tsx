"use client"

import { AppSidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useState } from "react"
import AboutPage from "../about/page"
import PrivacyPage from "../privacy/page"
import TermsPage from "../terms/page"
import ContactPage from "../contact/page"
import Home from "../page"
import UpgradePage from "../upgrade/page"


export default function SEO() {

    const [selectedPage, setSelectedPage] = useState<string>("about")



    const renderContent = () => {
        switch (selectedPage) {
            case "/":
                return <Home />
            case "about":
                return <AboutPage />
            case "upgrade":
                return <UpgradePage />
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
        <div className="h-screen flex flex-col">
            <SidebarProvider>
                <AppSidebar

                    onNavigate={(path: string) => {
                        const page = path.replace("/", "")
                        setSelectedPage(page)
                    }}
                />
                <SidebarInset className="h-screen flex-1 overflow-hidden">

                    <main className="h-screen overflow-auto">
                        {renderContent()}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}
