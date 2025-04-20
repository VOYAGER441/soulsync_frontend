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
        <div className="flex min-h-screen items-center justify-center p-2 sm:p-4 bg-background">
            <div className="w-full max-w-[95vw] sm:max-w-[90vw] lg:max-w-[80vw]">
                <div className="bg-card text-card-foreground rounded-xl border shadow-lg p-3 sm:p-6 space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:justify-between">
                        <h1 className="text-2xl sm:text-3xl font-bold">Sentiment Analysis</h1>
                        <div className="flex items-center gap-2">
                            <Image src="/assets/logo1.webp" alt="logo" width={32} height={32} className="sm:w-[40px] sm:h-[40px]" />
                            <span className="text-base sm:text-lg font-bold">SoulSync</span>
                        </div>
                    </div>
                    <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 sm:p-4">
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
