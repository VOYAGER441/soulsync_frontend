"use client"; // Ensures it's a client component

import { Chart } from "@/components/sentimentChart";
import utils from "@/utils";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";


function ChartPage() {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("u") || "";


  const decodedUserId = utils.decodeData(userIdParam);

  console.log("Decoded User ID:", decodedUserId);

  return <Chart userId={decodedUserId}/>;
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChartPage />
    </Suspense>
  );
}
