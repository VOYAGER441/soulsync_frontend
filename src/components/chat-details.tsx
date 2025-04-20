"use client";

import service from "@/service";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SentimentChart } from "./chart-radial-stacked";
import * as Interface from "@/interface/soul.interface";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";

interface ChatDetailsProps {
  chatId: string;
  userId: string;
}

export function ChatDetails({ chatId, userId }: ChatDetailsProps) {
  const [chat, setChat] = useState<Interface.IAllChatHistory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatDetails = async () => {
      setLoading(true);
      try {
        const chats = await service.chatService.getFilterChat(userId, chatId);
        if (chats.length === 0) {
          toast.error("No chat found with the provided ID");
          setChat(null);
        } else {
          setChat(chats[0]);
        }
      } catch (error) {
        console.error("Failed to fetch chat details:", error);
        toast.error("Failed to load chat details");
        setChat(null);
      } finally {
        setLoading(false);
      }
    };

    if (chatId && userId) {
      fetchChatDetails();
    }
  }, [chatId, userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-gray-500 dark:text-gray-300" size={32} />
      </div>
    );
  }

  if (!chat) {
    return <div className="p-4 text-center text-gray-400">No chat details available</div>;
  }

  const sentiment = chat.sentiment?.[0]?.label || null; // Assuming sentiment is an array and we want the first label

  const sentimentBadgeColor = sentiment === "positive"
    ? "bg-green-600"
    : sentiment === "negative"
      ? "bg-red-600"
      : "bg-gray-600";

  const sentimentEmoji = sentiment === "positive"
    ? "😊"
    : sentiment === "negative"
      ? "😠"
      : "😐";

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-8xl  rounded-2xl shadow-lg p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold ">Chat Report</h2>
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2" onClick={() => window.location.href = "/dashboard"}>
              <Image src="/assets/logo1.webp" alt="logo" width={40} height={40} />
              <span className="text-lg font-bold">SoulSync</span>
            </div>
          </div>
          {sentiment && (
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${sentimentBadgeColor}`}>
              {sentimentEmoji} {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
            </span>
          )}
          <ModeToggle />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-500 rounded-xl p-4 overflow-hidden">
            <p className="text-sm md:text-base  whitespace-pre-wrap">
              <strong className="text-gray-400">Message:</strong><br />{chat.message}
            </p>
            {chat.sentiment && (
              <div className="mt-4 w-full flex flex-col items-center bg-gray-700 rounded-lg p-4">
                <h3 className=" font-medium mb-4 text-center">Sentiment Breakdown</h3>
                <div className="">
                  <SentimentChart
                    sentiment={chat.sentiment.find(s => s.label === "POSITIVE") ? "POSITIVE" : chat.sentiment[0].label}
                    sentimentScore={chat.sentiment.find(s => s.label === "POSITIVE")?.score ?? chat.sentiment[0]?.score ?? 0}
                  />
                </div>
                <div className="text-xs text-gray-400 text-right">
                  ⏱ <strong>Timestamp:</strong> {new Date(chat.timestamp).toLocaleString()}
                </div>
              </div>
            )}
          </div>
          <div className="bg-blue-600 rounded-xl p-4 overflow-hidden">
            <strong className="text-gray-100">Reply:</strong><br />
            <ReactMarkdown>
              {chat.reply}
            </ReactMarkdown>
          </div>
        </div>





      </div>
    </div>
  );
}
