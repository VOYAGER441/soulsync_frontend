"use client"; // Ensures it's a client component

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ChatDetails } from "@/components/chat-details";
import utils from "@/utils";

function ChatPageContent() {
  const searchParams = useSearchParams();
  const chatIdParam = searchParams.get("c") || "";
  const userIdParam = searchParams.get("u") || "";


  // Decode chatId and userId separately
  const decodedChatId = utils.decodeData(chatIdParam);
  const decodedUserId = utils.decodeData(userIdParam);

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
