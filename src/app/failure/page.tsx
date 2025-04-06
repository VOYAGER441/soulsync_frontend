"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function FailurePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-background px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="h-12 w-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Something went wrong</h1>
        <p className="text-muted-foreground">
          We couldn&apos;t sign you in. Please try again or use a different method.
        </p>
        <Button asChild>
          <Link href="/signup">Go back to Sign Up</Link>
        </Button>
        <div className="text-xs text-muted-foreground">
          If the issue persists, contact support.
        </div>
      </div>
    </div>
  );
}
