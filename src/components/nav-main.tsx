"use client"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import utils from "@/utils";
import { type LucideIcon } from "lucide-react"

export function NavMain({ items, userId }: { items: { title: string, url: string, icon: LucideIcon, isActive?: boolean }[], userId: string }) {

  const encodedUserId = utils.encodeData(userId);

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <a href={`${item.url}?u=${encodedUserId}`}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
