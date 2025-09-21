"use client";

import { useAuthStore } from "@/app/store/useAuthStore";
import { postRequest } from "@/app/utils/api";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

// const groupedNotifications = notifications.reduce((acc, item) => {
//   acc[item.month] = acc[item.month] || [];
//   acc[item.month].push(item);
//   return acc;
// }, {} as Record<string, typeof notifications>);

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const fetchNotifications = async () => {
    try {
      const response = await postRequest("/notification", {
        device: "android",
        app_version: "1.0.5",
        latitude: "28.6139",
        longitude: "77.2090",
        user_id: user?.user_id,
        sess_id: user?.sess_id,
        page: "1",
      });

      if (response.success) {
        setNotifications(response.data.notifications || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  if (!user || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full"></div>
        <span className="ml-3 text-lg text-gray-600">
          Loading notifications...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="ont-medium text-[#333333] text-[44px]">Notification</h1>
        <button className="flex items-center gap-1 px-6 py-4 border rounded-lg text-[14px] border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-100">
          Short by <ChevronDown size={16} />
        </button>
      </div>
      {notifications.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No notifications found.
        </p>
      ) : (
        notifications.map((monthGroup, idx) => (
          <div key={idx} className="mb-10">
            {/* Month Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-t border-gray-200" />
              <span className="mx-4 text-gray-400 text-sm">
                {monthGroup.month}
              </span>
              <hr className="flex-grow border-t border-gray-200" />
            </div>

            {/* Notification Items */}
            {monthGroup.notifications.map((item: any) => (
              <div key={idx} className="flex gap-4 mb-6">
                {/* Icon */}
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold text-lg shadow-md">
                  P
                </div>

                {/* Text Content */}
                <div>
                  <h2 className="text-[20px] font-medium text-gray-800">
                    {item.notification_title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{item.created}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
