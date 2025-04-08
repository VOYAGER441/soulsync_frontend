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
import * as Interface from "@/interface/soul.interface";



const data = {
  navMain: [
    {
      title: "Sentiment Chart",
      url: "/chart",
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
        const res = await service.chatService.getChatHistory(userId);

       

        const response = res.map((chat: Interface.IOnlyChatHistory) => ({
          id: chat.id,
          message: chat.message || "",
          reply: chat.reply || "",
          timestamp: chat.timestamp || "",
        })) as Interface.IOnlyChatHistory[];
        

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

        const encodeData = (data: string) => {
          return btoa(data).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_"); // URL-safe Base64
        };
        
        const formatChats = (chats: any[], label: string) =>
          chats.map((chat: { id: any; message: string; timestamp: string }) => {
            const encodedId = encodeData(chat.id);
            const encodedUserId = encodeData(userId);
        
            return {
              id: chat.id,
              name: `${chat.message.substring(0, 20)}...`,
              url: `/chat?c=${encodedId}&u=${encodedUserId}`, // Use query parameters instead of dynamic routes
              emoji: "☮️",
              category: label,
            };
          });

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

  // console.log(userId, "userId");
  return (
    <Sidebar className="border-r-0 w-64" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo1.webp" alt="logo" width={40} height={40} />
            <span className="text-lg font-bold">SoulSync</span>
          </div>
        </div>

      </SidebarHeader>
      <NavMain items={data.navMain} userId={userId}/>
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
      </SidebarContent>

      <NavSecondary items={data.navSecondary} className="mt-auto z-10" />
      <SidebarRail />
    </Sidebar>
  );
}
