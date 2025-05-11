"use client"

import { ModeToggle } from "@/components/ModeToggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useIsMobile } from "@/hooks/use-mobile"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import AboutPage from "../about/page"
import ContactPage from "../contact/page"
import PrivacyPage from "../privacy/page"
import TermsPage from "../terms/page"
import UpgradePage from "../upgrade/page"

export default function SEO() {
    const [selectedPage, setSelectedPage] = useState<string>("about")
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const isMobile = useIsMobile()

    const navItems = [

        { title: "About", path: "about" },
        { title: "Upgrade", path: "upgrade" },
        { title: "Contact", path: "contact" },
        { title: "Privacy", path: "privacy" },
        { title: "Terms", path: "terms" }
    ]

    const handleNavigation = (path: string) => {
        const page = path.replace("/", "")
        setSelectedPage(page)
        setMobileMenuOpen(false)
    }

    const renderContent = () => {
        switch (selectedPage) {
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
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="container flex h-14 items-center justify-between">
                        <div className="flex items-center gap-2">
                            {/* <SidebarTrigger /> */}
                            {/* <Toggle/> */}
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

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <nav className="flex items-center space-x-6 mx-6">
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    variant="ghost"
                                    className={`${selectedPage === item.path ? 'text-primary' : 'text-muted-foreground'}`}
                                    onClick={() => handleNavigation(item.path)}
                                >
                                    {item.title}
                                </Button>
                            ))}
                        </nav>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="ml-auto">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-2">
                                        <Image src="/assets/logo1.webp" alt="" width={24} height={24} />
                                        <span>Navigation Menu</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col space-y-4 mt-6">
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.path}
                                            variant="ghost"
                                            className={`justify-start ${selectedPage === item.path ? 'text-primary' : 'text-muted-foreground'}`}
                                            onClick={() => handleNavigation(item.path)}
                                        >
                                            {item.title}
                                        </Button>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </header>

            <main className="flex-1 overflow-auto container py-6">
                {renderContent()}
            </main>
        </div>
    )
}
