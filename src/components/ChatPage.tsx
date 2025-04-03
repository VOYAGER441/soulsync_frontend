/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import service from "@/service";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import * as Interface from "@/interface/soul.interface";



export default function ChatPage({ userId }: { userId: string }) {

    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const { chatId } = router.query;
  
    // Set state to true when component is mounted (client-side)
    useEffect(() => {
      setIsClient(true);
    }, []);
  
    if (!isClient) {
      return null; // Return null or a loading spinner while the component is mounting
    }


  
  const [messages, setMessages] = useState<any[]>([]); // Any type for general messages
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = { id: uuidv4(), content: inputValue, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setPendingMessage(inputValue);
  };

  useEffect(() => {
    if (!pendingMessage) return;

    const fetchAIResponse = async () => {
      setLoading(true);
      try {
        const aiResponse = await service.chatService.chatWithAIModel(userId, pendingMessage);
        setMessages((prev) => [
          ...prev,
          { id: uuidv4(), content: aiResponse.reply, sender: "ai" }
        ]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
      } finally {
        setLoading(false);
        setPendingMessage(null);
      }
    };

    fetchAIResponse();
  }, [pendingMessage, userId]);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await service.appWriteService.getCurrentUserData(userId);

          const userData: Interface.IUserAvatar = JSON.parse(response.avatar); // Ensure avatar is parsed into IUserAvatar

          setAvatarUrl(userData?.avatar || "/assets/logo1.webp");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [userId]);

  useEffect(() => {
    if (chatId) {
      // Fetch messages for today or yesterday
      const fetchChatHistory = async () => {
        try {
          const chatHistory = await service.chatService.getChatHistory(userId);
          const filteredMessages = chatHistory.filter((chat) => chat.category === chatId);
          setMessages(filteredMessages);
        } catch (error) {
          console.error("Error fetching chat history:", error);
        }
      };

      fetchChatHistory();
    }
  }, [chatId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full overflow-y-hidden text-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 mb-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex max-w-[75%] space-x-3" style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
              {/* AI Avatar (Left) */}
              {message.sender === "ai" && (
                <Avatar className="h-10 w-10">
                  <Image src={"/assets/logo1.webp"} alt="AI" width={40} height={40} />
                </Avatar>
              )}

              {/* Chat Bubble */}
              <div className={`rounded-xl p-4 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800"}`}>
                {message.sender === "ai" ? (
                  <ReactMarkdown
                    components={{
                      p: (props) => <p className="text-sm md:text-base whitespace-pre-wrap" {...props} />,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-sm md:text-base">{message.content}</p>
                )}
              </div>

              {/* User Avatar (Right) */}
              {message.sender === "user" && (
                <Avatar className="h-10 w-10">
                  {avatarUrl && <Image src={avatarUrl} alt="User" width={40} height={40} />}
                </Avatar>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <Image src="/assets/logo1.webp" alt="AI" width={40} height={40} />
            </Avatar>
            <div className="bg-gray-800 rounded-xl p-4 flex items-center">
              <span className="text-gray-500 italic">Typing...</span>
              <div className="animate-spin border-t-2 border-gray-400 rounded-full h-4 w-4 ml-2"></div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 absolute bottom-0 left-0 w-full z-10">
        <div className="relative flex items-center z-10 mb-5">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent text-black dark:text-white border border-gray-700 rounded-full py-3 pl-12 pr-24 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-12 overflow-hidden"
            style={{ minHeight: "48px" }}
          />

          <div className="absolute right-4 flex items-center space-x-2">
            <Button
              onClick={handleSendMessage}
              className="bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-2 text-sm flex items-center"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="text-center text-muted-foreground text-xs">SoulSync can make mistakes. Check important info.</span>
        </div>
      </div>
    </div>
  );
}
