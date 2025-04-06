/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import service from "@/service";
import { toast } from "sonner";

export default function OAuthCallbackPage() {

    console.log("OAuthCallbackPage rendered");
    
  const router = useRouter();

  useEffect(() => {
    const processOAuth = async () => {
      try {
        const user = await service.appWriteService.handleOAuthCallback();
        localStorage.setItem("userId", user.$id);
        toast.success("Login Successful!");
        router.push("/dashboard");
      } catch {
        toast.error("OAuth failed");
        router.push("/login");
      }
    };
  
    processOAuth();
  }, []);
  

  return (
    <div className="h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
      Redirecting...
    </div>
  );
}
