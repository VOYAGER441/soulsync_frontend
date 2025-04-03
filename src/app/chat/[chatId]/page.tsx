import React from 'react';
import { ChatDetails } from '@/components/chat-details';

export default function Page({ params }: { params: { chatId: string; userId: string } }) {
  // Function to decode Base64 (URL-safe)
  const decodeData = (encoded: string) => {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/"); // Convert back to standard Base64
    return atob(base64);
  };

  // Decode chatId and userId separately
  const decodedChatId = decodeData(params.chatId);
  const decodedUserId = decodeData(params.userId);

  console.log("Decoded Chat ID:", decodedChatId);
  console.log("Decoded User ID:", decodedUserId);

  return (
    <div>
      <ChatDetails chatId={decodedChatId} userId={decodedUserId} />
    </div>
  );
}
