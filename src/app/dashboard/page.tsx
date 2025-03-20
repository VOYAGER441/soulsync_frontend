"use client"
import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeSwitch } from "@/components/ui/switch";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import ChatInterface from "@/components/chat-interface";
import { useState, useEffect } from "react";

import { Suspense } from "react";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {

  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    setUserId(searchParams.get("userId"));
  }, [searchParams]);

  console.log("userId", userId);


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">
                    <div className="flex items-center gap-2">
                      <Image src={"/assets/logo1.webp"} alt={"logo"} width={25} height={25} />
                      <span className="text-lg font-bold">SoulSync</span>
                    </div>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <nav className="flex justify-between items-center p-4">
            <span className="text-black text-xs dark:text-white">
              Light <ThemeSwitch /> Dark
            </span>
          </nav>
          <div className="ml-auto px-3">

            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

          </div>
        </header>
        {/* loading add //TODO */}
        {/* <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
          <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
        </div> */}
       <ChatInterface/>
      </SidebarInset>
    </SidebarProvider>
  )
}
