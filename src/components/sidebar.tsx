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
      title: "Our Charter",
      href: "/charter",
      isActive: pathname === "/charter",
    },
    {
      title: "Careers",
      href: "/careers",
      isActive: pathname === "/careers",
    },
    {
      title: "Brand",
      href: "#",
      items: [
        {
          title: "Overview",
          href: "/brand/overview",
          isActive: pathname === "/brand/overview",
        },
        {
          title: "Logos",
          href: "/brand/logos",
          isActive: pathname === "/brand/logos",
        },
        {
          title: "Gallery",
          href: "/brand/gallery",
          isActive: pathname === "/brand/gallery",
        },
        {
          title: "Partnerships",
          href: "/brand/partnerships",
          isActive: pathname === "/brand/partnerships",
        },
        {
          title: "Typography",
          href: "/brand/typography",
          isActive: pathname === "/brand/typography",
        },
        {
          title: "Language",
          href: "/brand/language",
          isActive: pathname === "/brand/language",
        },
        {
          title: "Contact",
          href: "/brand/contact",
          isActive: pathname === "/brand/contact",
        },
      ],
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
