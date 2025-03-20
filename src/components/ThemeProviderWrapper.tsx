"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch by not rendering anything until the component is mounted
    return <>{children}</>;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
