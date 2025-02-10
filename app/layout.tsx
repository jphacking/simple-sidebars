// File: /app/layout.tsx

"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/common/Loader";
import ToastProvider from "@/components/common/ToastProvider";

/**
 * Custom hook to simulate a loading state.
 * @param delay - Time in milliseconds to simulate the loading period.
 * @returns A boolean indicating whether the loading state is active.
 */
function useSimulatedLoading(delay: number = 1000): boolean {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const loading = useSimulatedLoading(1000);

  return (
    <html lang="en">
      <body>
        {loading ? <Loader /> : children}
        <ToastProvider />
      </body>
    </html>
  );
}
