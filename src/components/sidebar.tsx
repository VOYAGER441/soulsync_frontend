"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    SidebarRail
} from "@/components/ui/sidebar"
import Image from "next/image"
import { usePathname } from "next/navigation"

interface NavItem {
    title: string
    href: string
    isActive?: boolean
    items?: NavItem[]
}

interface SidebarProps {
    isLoading?: boolean
    isMobile?: boolean
    onNavigate?: (path: string) => void
}

export function AppSidebar({ isLoading = false, isMobile = false, onNavigate }: SidebarProps) {
    const pathname = usePathname()

    const handleNavigation = (path: string) => {
        if (onNavigate) {
            onNavigate(path)
        }
    }

    const navItems: NavItem[] = [
        {
            title: "About us",
            href: "/about",
            isActive: pathname === "/about",
        },
        {
            title: "Upgrade to Pro",
            href: "/upgrade",
            isActive: pathname === "/upgrade",
        },
        {
            title: "Contact Us",
            href: "/contact",
            isActive: pathname === "/contact",
        },
        {
            title: "Privacy Policy",
            href: "/privacy",
            isActive: pathname === "/privacy",
        },
        {
            title: "Terms & Conditions",
            href: "/terms",
            isActive: pathname === "/terms",
        },
    ]

    if (isMobile) {
        return (
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-14">
                <div className="container h-full flex items-center justify-end px-4">
                    <div className="flex items-center gap-4">
                        {navItems.map((item) => (
                            <button
                                key={item.title}
                                onClick={() => handleNavigation(item.href)}
                                className={`text-sm font-medium ${
                                    item.isActive ? 'text-primary' : 'text-muted-foreground'
                                }`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <Sidebar className="border-r border-border bg-background">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2" onClick={() => handleNavigation("/")}>
                    <Image src="/assets/logo1.webp" alt="logo" width={25} height={25} />
                    <span className="text-lg font-bold">SoulSync</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isLoading ? (
                                <>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <SidebarMenuItem key={i}>
                                            <SidebarMenuSkeleton showIcon={false} />
                                        </SidebarMenuItem>
                                    ))}
                                </>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                isActive={item.isActive}
                                                className="font-medium"
                                                onClick={() => handleNavigation(item.href)}
                                            >
                                                {item.title}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </div>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
