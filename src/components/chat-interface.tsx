/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import service from "@/service";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { v4 as uuidv4 } from "uuid";
import { SentimentChart } from "@/components/chart-radial-stacked";
import { useSearchParams } from "next/navigation";
import * as Interface from "@/interface/soul.interface";

const initialMessages = [
  { id: "1", content: "Hello! How can I assist you today?", sender: "ai", sentiment: "Neutral", sentimentScore: 0.5 }
];

export default function ChatPageContent({ userId }: { userId: string }) {
  const searchParams = useSearchParams();
  const chatId = searchParams.get("chatId");

  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [aiTypingText, setAiTypingText] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageToSend = inputValue;
    const newMessage = { id: uuidv4(), content: messageToSend, sender: "user", sentiment: "Neutral", sentimentScore: 0 };
    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setPendingMessage(messageToSend);
  };

  useEffect(() => {
    if (!pendingMessage) return;

    const fetchAIResponse = async () => {
      setLoading(true);
      try {
        const aiResponse = await service.chatService.chatWithAIModel(userId, pendingMessage);
        const fullText = aiResponse.reply;

        // Add the sentiment message first
        setMessages((prev) => [
          ...prev,
          {
            id: uuidv4(),
            content: "",
            sender: "ai",
            sentiment: aiResponse.sentiment[0].label,
            sentimentScore: aiResponse.sentiment[0].score
          }
        ]);

        let i = 0;
        setAiTypingText("");

        const interval = setInterval(() => {
          i++;
          setAiTypingText(fullText.slice(0, i));

          if (i >= fullText.length) {
            clearInterval(interval);
            setMessages((prev) => [
              ...prev.slice(0, -1), // Remove the last message with empty content
              {
                id: uuidv4(),
                content: aiResponse.reply,
                sender: "ai",
                sentiment: aiResponse.sentiment[0].label,
                sentimentScore: aiResponse.sentiment[0].score
              }
            ]);
            setAiTypingText(null);
          }
        }, 20);
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
          const userData: Interface.IUserAvatar = {
            avatar: response.avatar
          };

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
      const fetchChatHistory = async () => {
        try {
          const chatHistory = await service.chatService.getChatHistory(userId);
          const filteredMessages = chatHistory.filter((chat) => chat.id === chatId);
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
  }, [messages, loading, aiTypingText]);

  return (
    <div className="flex flex-col h-full overflow-y-hidden text-white">
      <div className="flex-1 overflow-y-auto p-6 space-y-4 mb-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex flex-col ${message.sender === "user" ? "items-end" : "items-start"}`}>
            <div className="flex max-w-[90%] space-x-3" style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
              {message.sender === "ai" && (
                <Avatar className="h-8 w-8">
                  <Image src={"/assets/logo1.webp"} alt="AI" width={32} height={32} />
                </Avatar>
              )}

              <div className={`rounded-xl p-3 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800"}`}>
                {message.sender === "ai" ? (
                  <>
                    {message.sentiment && (
                      <SentimentChart
                        sentiment={message.sentiment}
                        sentimentScore={message.sentimentScore}
                      />
                    )}
                    <p className="font-bold">SoulSync AI reply according to your sentiment:</p>
                    <br></br>

                    <ReactMarkdown
                      components={{
                        p: (props) => <p className="text-sm md:text-base whitespace-pre-wrap" {...props} />,
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </>
                ) : (
                  <p className="text-sm md:text-base">{message.content}</p>
                )}
              </div>

              {message.sender === "user" && (
                <Avatar className="h-8 w-8">
                  {avatarUrl && <Image src={avatarUrl} alt="User" width={32} height={32} />}
                </Avatar>
              )}
            </div>
          </div>
        ))}

        {/* Typing animation message */}
        {aiTypingText && (
          <div className="flex flex-col items-start">
            <div className="flex max-w-[90%] space-x-3" style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
              <Avatar className="h-8 w-8">
                <Image src="/assets/logo1.webp" alt="AI" width={32} height={32} />
              </Avatar>
              <div className="rounded-xl p-3 bg-gray-800">
                <ReactMarkdown>{aiTypingText}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <Image src="/assets/logo1.webp" alt="AI" width={32} height={32} />
            </Avatar>
            <div className="bg-gray-800 rounded-xl p-3 flex items-center">
              <span className="text-gray-500 italic">Thinking...</span>
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
            placeholder="Ask anything"
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
