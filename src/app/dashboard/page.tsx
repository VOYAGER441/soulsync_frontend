'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import ChatInterface from "@/components/chat-interface";
import { ThemeSwitch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Loader } from "lucide-react";
import service from "@/service";
import * as Interface from "@/interface/soul.interface";


export default function Page() {
  return (
    <Suspense fallback={<div className="text-black dark:text-white">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");

    const fetchUserData = async () => {
      try {
        if (!storedUserId) {
          throw new Error("User ID is null");

        }
        const response = await service.appWriteService.getCurrentUserData(storedUserId);
        // console.log("response", response);
        
        const userData: Interface.IUserAvatar = {
          avatar: response.avatar
        };

        setAvatarUrl(userData?.avatar || "/assets/logo1.webp");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    if (!storedUserId) {
      router.replace("/login"); 
    } else if (userId !== storedUserId) {
      setUserId(storedUserId);
    }

    setLoading(false);
  }, [router, userId]);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin text-gray-500 dark:text-gray-300" size={32} />
      </div>
    );
  }
// useEffect(() => {
//   if (userId) {
   
//   }
// }, [userId]);

if (!userId) return null;



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
                  <AvatarImage src={`${avatarUrl}`} />
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
                  <AlertDialogAction onClick={() => {
                    localStorage.removeItem("userId"); 
                    router.replace("/login");
                  }}>Log out</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </header>
        <ChatInterface userId={userId} />
      </SidebarInset>
    </SidebarProvider>
  );
}
