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
    onNavigate?: (path: string) => void
}

export function AppSidebar({ isLoading = false, onNavigate }: SidebarProps) {
    const pathname = usePathname()

    const handleNavigation = (path: string) => {
        if (onNavigate) {
            onNavigate(path)
        }
    }

    // Sample navigation data
    const navItems: NavItem[] = [
        {
            title: "Home",
            href: "/",
            isActive: pathname === "/home",
        },
        {
            title: "About us",
            href: "/about",
            isActive: pathname === "/about",
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

    return (
        <Sidebar className="border-r border-border bg-black">
            <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                    <Image src={"/assets/logo1.webp"} alt={"logo"} width={25} height={25} />
                    <span className="text-lg font-bold">SoulSync</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isLoading ? (
                                // Skeleton loading state
                                <>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <SidebarMenuItem key={i}>
                                            <SidebarMenuSkeleton showIcon={false} />
                                        </SidebarMenuItem>
                                    ))}
                                </>
                            ) : (
                                // Actual navigation items
                                <>
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
                                </>
                            )}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
            
        </Sidebar>
    )
}
