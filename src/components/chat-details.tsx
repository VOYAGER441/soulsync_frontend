"use client";

import React, { useEffect, useState } from "react";
// import { getChatDetails } from "@/service/chat-api";
import { toast } from "sonner";
import service from "@/service";

interface ChatDetailsProps {
  chatId: string;
  onClose: () => void; // Callback to close the chat details view
}

export function ChatDetails({ chatId, onClose }: ChatDetailsProps) {
  const [chat, setChat] = useState<{ id: string; message: string; reply: string; timestamp: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatDetails = async () => {
      setLoading(true);
      try {
        const chatData = await service.chatService.getChatHistory(chatId);
        setChat(chatData.length > 0 ? chatData[0] : null);
      } catch (error) {
        console.error("Failed to fetch chat details:", error);
        toast.error("Failed to load chat details");
      } finally {
        setLoading(false);
      }
    };

    if (chatId) {
      fetchChatDetails();
    }
  }, [chatId]);

  if (loading) {
    return <div className="p-4 text-center">Loading chat details...</div>;
  }

  if (!chat) {
    return <div className="p-4 text-center">No chat details available</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <button
        onClick={onClose}
        className="mb-4 text-sm text-gray-500 hover:text-gray-700 underline"
      >
        Back to History
      </button>
      <h2 className="text-lg font-bold mb-2">Chat Details</h2>
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Message:</strong> {chat.message}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Reply:</strong> {chat.reply}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Timestamp:</strong> {new Date(chat.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
