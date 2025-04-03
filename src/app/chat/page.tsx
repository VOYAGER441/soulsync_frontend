"use client"; // Ensures it's a client component

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatDetails } from "@/components/chat-details";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const chatIdParam = searchParams.get("c") || "";
  const userIdParam = searchParams.get("u") || "";

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

  return <ChatDetails chatId={decodedChatId} userId={decodedUserId} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPageContent />
    </Suspense>
  );
}
