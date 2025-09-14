"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import StaticLayout from "./layouts/StaticLayout";
import DynamicLayout from "./layouts/DynamicLayout";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // ✅ Check if session_id exists in localStorage
    const sessionId = localStorage.getItem("session_id");
    const userId = localStorage.getItem("user_id");

    // loggedIn = true if both are present
    const loggedIn = !!(sessionId && userId);
    setIsLoggedIn(loggedIn);
  }, [pathname]); // run also on route change

  if (isLoggedIn === null) return null; // loading sta

  return isLoggedIn ? (
    <DynamicLayout>{children}</DynamicLayout>
  ) : (
    <StaticLayout>{children}</StaticLayout>
  );
}
