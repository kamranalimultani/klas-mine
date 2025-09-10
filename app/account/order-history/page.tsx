// app/page.tsx
"use client";

import OrderCard, { Order } from "@/app/account/order/OrderCard";

export default function Home() {
  const orders: Order[] = [
    {
      id: "8596-854621-8546",
      title:
        "8 Terracotta Warli Handpainted Pots With Sheesham Wooden Frame Wall Hanging",
      size: "50 x 40 inches",
      total: 1105,
      date: "Apr 1, 2025",
      status: "Delivered",
      image: "assets/images/order-img.png",
    },
    {
      id: "8596-854621-8547",
      title:
        "8 Terracotta Warli Handpainted Pots With Sheesham Wooden Frame Wall Hanging",
      size: "50 x 40 inches",
      total: 1105,
      date: "Apr 1, 2025",
      status: "Cancelled",
      image: "assets/images/order-img.png",
    },
  ];

  return (
    <main className="min-h-screen py-10">
      <div className="">
        <h1 className="ont-medium text-[#333333] text-[44px] mb-2">My Order History</h1>
        <p className="text-sm text-gray-500 mb-6">March 2025</p>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} />
          ))}
        </div>
      </div>
    </main>
  );
}
