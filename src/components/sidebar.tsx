"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Folder } from "lucide-react"

interface NavItem {
  title: string
  href: string
  isActive?: boolean
  items?: NavItem[]
}

interface SidebarProps {
  isLoading?: boolean
}

export function AppSidebar({ isLoading = false }: SidebarProps) {
  const pathname = usePathname()

  // Sample navigation data
  const navItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
      isActive: pathname === "/",
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
    <Sidebar className="border-r border-border bg-black text-white">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
          <span>OpenAI</span>
        </Link>
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
                  <SidebarMenuItem>
                    <SidebarMenuSkeleton showIcon={false} />
                    <div className="ml-6 mt-2 space-y-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-4 w-24 rounded-md bg-gray-800 animate-pulse" />
                      ))}
                    </div>
                  </SidebarMenuItem>
                </>
              ) : (
                // Actual navigation items
                <>
                  {navItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                      {item.items ? (
                          // Item with sub-items
                          <>
                          <SidebarMenuButton asChild isActive={item.isActive} className="font-medium">
                          <Folder />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                                  <Link href={subItem.href}>{subItem.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </>
                      ) : (
                        // Regular item
                        <SidebarMenuButton asChild isActive={item.isActive} className="font-medium">
                          <Link href={item.href}>{item.title}</Link>
                        </SidebarMenuButton>
                      )}
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
