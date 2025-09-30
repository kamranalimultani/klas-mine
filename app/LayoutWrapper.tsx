"use client";
import { useEffect, useState } from "react";
import StaticLayout from "./layouts/StaticLayout";
import DynamicLayout from "./layouts/DynamicLayout";
import { postRequest } from "./utils/api";
import { useAuthStore } from "./store/useAuthStore";
import pkg from "./../package.json";
import { usePathname, useRouter } from "next/navigation";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();
  const fetchUser = async () => {
    const user_id = localStorage.getItem("user_id");
    const sess_id = localStorage.getItem("session_id");

    if (!user_id || !sess_id) {
      setIsLoggedIn(false);
      router.push("/");
      return;
    }

    try {
      const payload = {
        device: "android",
        app_version: pkg.version,
        latitude: "28.6139",
        longitude: "77.2090",
        user_id,
        sess_id,
      };

      const res: {
        success?: boolean;
        data?: { user?: any };
        [key: string]: any;
      } = await postRequest("/account/authorized", payload);

      if (res?.success && res?.data?.user) {
        setAuth(res.data.user);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem("user_id");
        localStorage.removeItem("session_id");
        setIsLoggedIn(false);
        router.push("/");
      }
    } catch (err) {
      localStorage.removeItem("user_id");
      localStorage.removeItem("session_id");
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return isLoggedIn ? (
    <DynamicLayout>{children}</DynamicLayout>
  ) : (
    <StaticLayout>{children}</StaticLayout>
  );
}
