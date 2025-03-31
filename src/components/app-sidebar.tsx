"use client"

import {
  ChartArea,
  Gem,
  Search
} from "lucide-react"
import React, { useEffect/* , useState */ } from "react"

import { NavFavorites } from "@/components/nav-favorites"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
// import { NavWorkspaces } from "@/components/nav-workspaces"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Image from "next/image"
import { toast } from "sonner"
import service from "@/service"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
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
  histories: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Book Notes & Reading List",
      url: "#",
      emoji: "📚",
    },
    {
      name: "Sustainable Gardening Tips & Plant Care",
      url: "#",
      emoji: "🌱",
    },
    {
      name: "Language Learning Progress & Resources",
      url: "#",
      emoji: "🗣️",
    },
    {
      name: "Home Renovation Ideas & Budget Tracker",
      url: "#",
      emoji: "🏠",
    },
    {
      name: "Personal Finance & Investment Portfolio",
      url: "#",
      emoji: "💰",
    },
    {
      name: "Movie & TV Show Watchlist with Reviews",
      url: "#",
      emoji: "🎬",
    },
    {
      name: "Daily Habit Tracker & Goal Setting",
      url: "#",
      emoji: "✅",
    }
  ]
}

export function AppSidebar({ userId, ...props }: { userId: string } & React.ComponentProps<typeof Sidebar>) {

  // const [message, setMessage] = useState("");
  // const [reply, setReply] = useState("");
  // const [sentiment, setSentiment] = useState("");
  console.log("userid222222222",userId);

  useEffect(() => {
    const getChats = async () => {
      if (!userId) {
        console.error("Invalid userId");
        toast.error("Invalid user ID provided");
        return;
      }

      try {
        if (service?.chatService?.getChatHistory) {
          const response = await service.chatService.getChatHistory(userId);
          console.log("response",response);
        } else {
          console.error("getChatHistory method is not defined");
          toast.error("Service unavailable");
        }
      } catch (error) {
        toast.error("Failed to fetch chat history");
        console.error("Error fetching chat history:", error);
      }
    };
    getChats();
  }, [userId]);



  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center gap-2 ">
          <Image src={"/assets/logo1.webp"} alt={"logo"} width={50} height={50} />
          <span className="text-lg font-bold">SoulSync</span>
        </div>
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data.histories} />
        {/* <NavWorkspaces workspaces={data.workspaces} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
