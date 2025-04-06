"use client"; // Required because useSearchParams is a client-side hook

import React from "react";
import { useSearchParams } from "next/navigation";
import { ChatDetails } from "@/components/chat-details";

export default function Page() {
  const searchParams = useSearchParams();
  const chatIdParam = searchParams.get("chatId") || "";
  const userIdParam = searchParams.get("userId") || "";

  // Function to decode Base64 (URL-safe)
  const decodeData = (encoded: string) => {
    try {
      const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
      return atob(base64);
    } catch (error) {
      console.error("Invalid Base64 encoding:", error);
      return "";
    }
  };

  // Decode chatId and userId separately
  const decodedChatId = decodeData(chatIdParam);
  const decodedUserId = decodeData(userIdParam);

  console.log("Decoded Chat ID:", decodedChatId);
  console.log("Decoded User ID:", decodedUserId);

  return (
    <div>
      <ChatDetails chatId={decodedChatId} userId={decodedUserId} />
    </div>
  );
}
