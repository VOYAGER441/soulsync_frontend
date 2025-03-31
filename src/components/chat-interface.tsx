/* eslint-disable @next/next/no-img-element */
"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const initialMessages = [
  { id: "1", content: "Hello! How can I assist you today?", sender: "ai" }
];

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false); // Track AI response status
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
  
    const newMessage = { id: uuidv4(), content: inputValue, sender: "user" };
    setMessages([...messages, newMessage]);
    setInputValue("");
    setLoading(true);
  
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
  
    const aiResponse = { id: uuidv4(), content: "Let me process that for you!", sender: "ai" };
    setMessages((prev) => [...prev, aiResponse]);
    setLoading(false);
  };
  
  const handleKeyDown = (e: { key: string; shiftKey: unknown; preventDefault: () => void }) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);



  return (
    <div className="flex flex-col h-full overflow-y-hidden text-white">

      <div className="flex-1 overflow-y-auto p-6 space-y-4 mb-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex max-w-[75%] space-x-3" style={{ wordBreak: "break-word", whiteSpace: "pre-wrap" }}>
              {message.sender === "ai" && (
                <Avatar className="h-10 w-10">
                  <Image src="/assets/logo1.webp" alt="AI" width={40} height={40} />
                </Avatar>
              )}
              <div
                className={`rounded-xl p-4 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800"}`}
                
              >
                <p className="text-sm md:text-base">{message.content}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Loading Indicator (AI Typing...) */}
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

      <div className=" p-4 absolute bottom-0 left-0  w-full z-10">
        <div className="relative flex items-center z-10 mb-5">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent  text-black dark:text-white border border-gray-700 rounded-full py-3 pl-12 pr-24  placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-12 overflow-hidden"
            style={{ minHeight: "48px" }}
          />


          <div className="absolute right-4 flex items-center space-x-2">


            <Button
              onClick={handleSendMessage}
              className="bg-gray-700 hover:bg-gray-600  rounded-full px-4 py-2 text-sm flex items-center"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center">

          <span className=" text-center text-muted-foreground text-xs" >SoulSync can make mistakes. Check important info.</span>
        </div>
      </div>
    </div>
  );
}
