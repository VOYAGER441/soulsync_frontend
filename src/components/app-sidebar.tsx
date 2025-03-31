/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"

import { NavFavorites } from "@/components/nav-favorites"
// import { NavWorkspaces } from "@/components/nav-workspaces"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// import * as Interface from "@/interface/soul.interface"
import service from "@/service"
import { ChartArea, Gem } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"


// This is sample data.
const data = {
  navMain: [

    {
      title: "Sentiment Chart",
      url: "#",
      icon: ChartArea,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Upgrade plan More access to the best models",
      url: "#",
      icon: Gem,
    },
  ]
}



export function AppSidebar({ userId, ...props }: { userId: string } & React.ComponentProps<typeof Sidebar>) {
  const [histories, setHistories] = useState<{ id: string; name: string; url: string; emoji: string }[]>([]);

  useEffect(() => {
    if (!userId || userId.trim() === "") {
      console.warn("Skipping fetch: Invalid userId:", userId);
      return;
    }
  
    const getChats = async () => {
      console.log("Fetching chat history for userId:", userId);
      try {
        if (!service?.chatService?.getChatHistory) {
          console.error("getChatHistory method is not defined");
          toast.error("Service unavailable");
          return;
        }
  
        const response = await service.chatService.getChatHistory(userId);
        if (!response || response.length === 0) {
          console.warn("No chat history found for userId:", userId);
          setHistories([]);
          return;
        }
  
        console.log("Chat History Response:", response);
  
        const chatHistory = response
          .map(chat => {
            try {
              return typeof chat === "string" ? JSON.parse(chat) : chat;
            } catch (error) {
              console.error("Error parsing chat:", chat, error);
              return null;
            }
          })
          .filter(chat => chat && chat.id && chat.timestamp);
  
        const validChats = chatHistory.filter(chat => {
          const isValid = chat.timestamp && !isNaN(new Date(chat.timestamp).getTime());
          if (!isValid) console.warn("Invalid chat timestamp:", chat);
          return isValid;
        });
  
        validChats.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const latestChats = validChats.slice(0, 10);
  
        const formattedHistories = latestChats.map(chat => ({
          id: chat.id,
          name: `${getFormattedDate(new Date(chat.timestamp))} - ${chat.message.substring(0, 20)}...`,
          url: `/chat/${chat.id}`,
          emoji: "💬",
        }));
  
        setHistories(formattedHistories);
        console.log("Updated Histories:", formattedHistories);
      } catch (error) {
        console.error("Error fetching chat history for userId:", userId, error);
        toast.error("Failed to fetch chat history");
      }
    };
  
    getChats();
  }, [userId]); // Only run when `userId` is valid
  
  
  const getFormattedDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
    return date.toLocaleDateString();
  };
  return (
    <Sidebar className="border-r-0 w-64" {...props}>
      <SidebarHeader>
        {/* Logo & New Chat Button */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo1.webp" alt="logo" width={40} height={40} />
            <span className="text-lg font-bold">SoulSync</span>
          </div>
        </div>
        <button className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          + New Chat
        </button>
      </SidebarHeader>
      <NavMain items={data.navMain} />
      <SidebarContent>
        {/* Recent Chat History */}
        <NavFavorites favorites={histories} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      
      <SidebarRail />
    </Sidebar>
  );
}