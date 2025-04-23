import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar"; // adjust if your path is different

const BotLoader = ({ loading }: { loading: boolean }) => {
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loading) {
      setIsTyping(false);
      timeout = setTimeout(() => setIsTyping(true), 5000); // 2 sec delay
    }
    return () => clearTimeout(timeout);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <Image src="/assets/logo1.webp" alt="AI" width={32} height={32} />
      </Avatar>

      <div className="bg-gray-800 rounded-xl p-3 flex items-center min-w-[80px]">
        {!isTyping ? (
          <>
            <span className="text-gray-500 italic">Thinking...</span>
            <div className="animate-spin border-t-2 border-gray-400 rounded-full h-4 w-4 ml-2"></div>
          </>
        ) : (
          <div className="flex space-x-1">
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BotLoader;
