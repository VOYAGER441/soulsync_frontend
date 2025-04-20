"use client"; // Ensures it's a client component

import { Chart } from "@/components/sentimentChart";
import utils from "@/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";

function ChartPage() {
    const searchParams = useSearchParams();
    const userIdParam = searchParams.get("u") || "";
    const decodedUserId = utils.decodeData(userIdParam);

    console.log("Decoded User ID:", decodedUserId);

    return (
        <div className="flex min-h-screen items-center justify-center p-4 bg-background">
            <div className="w-full ">
                <div className="bg-card text-card-foreground rounded-xl border shadow-lg p-6 space-y-6">
                    <div className="flex items-center justify-between sm:flex-wrap">
                        <h1 className="text-3xl font-bold">Sentiment Analysis</h1>
                        <div className="flex items-center">
                            <Image src="/assets/logo1.webp" alt="logo" width={40} height={40} />
                            <span className="text-lg font-bold">SoulSync</span>
                        </div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 rounded-lg p-4">
                        <Chart userId={decodedUserId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChartPage />
        </Suspense>
    );
}
