/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { NavFavorites } from "@/components/nav-favorites";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import service from "@/service";
import { ChartArea, Gem } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";

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
  ],
};

export function AppSidebar({ userId, ...props }: { userId: string } & React.ComponentProps<typeof Sidebar>) {
  const [histories, setHistories] = useState<{ id: string; name: string; url: string; emoji: string; category: string }[]>(
    []
  );

  useEffect(() => {
    if (!userId || userId.trim() === "") {
      console.warn("Skipping fetch: Invalid userId:", userId);
      return;
    }

    const getChats = async () => {
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

        const chatHistory = response
          .map((chat) => {
            try {
              return typeof chat === "string" ? JSON.parse(chat) : chat;
            } catch (error) {
              console.error("Error parsing chat:", chat, error);
              return null;
            }
          })
          .filter((chat) => chat && chat.timestamp);

        chatHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        const todayChats: any[] = [];
        const yesterdayChats: any[] = [];
        const olderChats: any[] = [];
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        chatHistory.forEach((chat) => {
          const chatDate = new Date(chat.timestamp);
          if (chatDate.toDateString() === today.toDateString()) {
            todayChats.push(chat);
          } else if (chatDate.toDateString() === yesterday.toDateString()) {
            yesterdayChats.push(chat);
          } else {
            olderChats.push(chat);
          }
        });

        const formatChats = (chats: any[], label: string) =>
          chats.map((chat: { id: any; message: string; timestamp: string }) => ({
            id: chat.id,
            name: `${chat.message.substring(0, 20)}...`,
            url: `/chat/${chat.id}`,
            emoji: "💬",
            category: label,
          }));

        setHistories([
          ...formatChats(todayChats, "Today"),
          ...formatChats(yesterdayChats, "Yesterday"),
          ...formatChats(olderChats, "Older"),
        ]);
      } catch (error) {
        console.error("Error fetching chat history for userId:", userId, error);
        toast.error("Failed to fetch chat history");
      }
    };

    getChats();
  }, [userId]);

  return (
    <Sidebar className="border-r-0 w-64" {...props}>
      <SidebarHeader>
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
        {["Today", "Yesterday", "Older"].map((category) => {
          const chatsInCategory = histories.filter((chat) => chat.category === category);
          if (chatsInCategory.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-xs font-semibold text-gray-400 px-4 mt-2">{category}</h3>
              <NavFavorites favorites={chatsInCategory} />
            </div>
          );
        })}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
