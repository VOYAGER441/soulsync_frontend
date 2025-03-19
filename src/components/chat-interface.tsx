/* eslint-disable @next/next/no-img-element */
"use client"

import type React from "react"

import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy, RefreshCw, Send, Volume2 } from "lucide-react"
import { useEffect, useRef, useState } from "react"
// import { useMobile } from "@/hooks/use-mobile"
import { useIsMobile } from "@/hooks/use-mobile"
import Image from "next/image"


type Message = {
  id: string
  content: string
  sender: "user" | "ai"
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "I have found your order. It is currently being processed and will be shipped out soon.",
    sender: "ai",
  },
  {
    id: "2",
    content: "Thank you for your help!",
    sender: "user",
  },
  {
    id: "3",
    content: "If you have any more questions, feel free to ask.",
    sender: "ai",
  },
]

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  console.log("isMobile", isMobile);


  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    }

    setMessages([...messages, newMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm processing your request. How else can I assist you today?",
        sender: "ai",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "flex max-w-[80%] md:max-w-[70%]",
                  message.sender === "user" ? "flex-row-reverse" : "flex-row",
                  message.sender === "user" ? "items-end" : "items-start",
                )}
              >
                {message.sender === "ai" && (
                  <div className="flex-shrink-0 mr-3">
                    <Avatar className="h-10 w-10 border border-gray-700">
                      <div className="bg-gray-800 h-full w-full flex items-center justify-center">
                        <span className="text-primary text-xs">
                          <Image src={"/assets/logo1.webp"} alt={"logo"} width={25} height={25} />
                        </span>
                      </div>
                    </Avatar>
                  </div>
                )}

                <div
                  className={cn(
                    "rounded-lg p-4",
                    message.sender === "user" ? "bg-white text-black mr-3" : "bg-gray-800 text-white",
                  )}
                >
                  <p className="text-sm md:text-base">{message.content}</p>

                  {message.sender === "ai" && (
                    <div className="flex space-x-2 mt-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4 text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Volume2 className="h-4 w-4 text-gray-400" />
                      </Button>
                    </div>
                  )}
                </div>

                {message.sender === "user" && (
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10 bg-gray-200">
                      <img
                        src="https://github.com/shadcn.png"
                        alt="User"
                        className="h-full w-full object-cover rounded-full"
                      />
                    </Avatar>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-800 p-4 absolute bottom-0 left-0 w-full  z-10 ">
        <div className="relative flex items-center z-10">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-1 bg-transparent border border-gray-700 rounded-full py-3 pl-12 pr-24 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none h-12 overflow-hidden"
            style={{ minHeight: "48px" }}
          />

          <div className="absolute left-4 flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              {/* <Paperclip className="h-5 w-5 text-gray-400" /> */}
            </Button>
          </div>

          <div className="absolute right-4 flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="h-6 w-6 mr-2">
              {/* <Mic className="h-5 w-5 text-gray-400" /> */}
            </Button>

            <Button
              onClick={handleSendMessage}
              className="bg-gray-700 hover:bg-gray-600 text-white rounded-full px-4 py-2 text-sm flex items-center"
            >
              <span className="mr-1">Send Message</span>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

