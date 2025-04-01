"use client"
import { AppSidebar } from "@/components/app-sidebar";
import ChatInterface from "@/components/chat-interface";
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
import Image from "next/image";
// import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Page() {
  return (
    <Suspense fallback={<div className="text-black dark:text-white">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {

  // const [userId, setUserId] = useState<string | null>(null);
  // const searchParams = useSearchParams();

  // useEffect(() => {
  //   setUserId(searchParams.get("userId"));
  // }, [searchParams]);

  // console.log("userId", userId);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId || "");

  }, []);

  // console.log("userId111111", userId);



  return (
    <SidebarProvider>
      <AppSidebar userId={userId} />
      <SidebarInset>
        <header className="overflow-hidden flex h-14 shrink-0 items-center gap-2 w-full bg-white dark:bg-black text-black dark:text-white sticky top-0 z-50 px-1 shadow-md">

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

          <nav className="flex items-center ">
            <div className="flex items-center gap-x-2 text-black text-xs dark:text-white">
              <span>Light</span>
              <ThemeSwitch />
              <span>Dark</span>
            </div>
          </nav>

          <div className="ml-auto px-3">

            <AlertDialog>
              <AlertDialogTrigger>

                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to sign out? You will need to log in again to access your account.
                  </AlertDialogDescription>

                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Log out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>




          </div>
        </header>
        {/* loading add //TODO */}
        {/* <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
          <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
        </div> */}
        <ChatInterface userId={userId}/>
      </SidebarInset>
    </SidebarProvider>
  )
}
