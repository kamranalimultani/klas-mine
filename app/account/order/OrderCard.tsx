'use client';

import Link from "next/link";
import Image from "next/image";

export type Order = {
  id: string;
  title: string;
  size: string;
  total: number;
  date: string;
  status: 'Delivered' | 'Cancelled';
  image: string;
};

export default function OrderCard({ order }: { order: Order }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm">
    {/* Order Header */}
    <div className="flex justify-between p-6 border-b border-gray-200">
      <p>Order ID - {order.id}</p>
      <p>Grand Total - ₹{order.total}</p>
    </div>

    {/* Order Details */}
    <div className="flex p-6 border-b border-gray-200">
      {/* Order Image */}
      <div className="mr-8 relative flex-shrink-0 rounded-xl overflow-hidden">
        <Image src="/assets/images/order-img.png" width={200} height={150} alt="Order Image" />
      </div>

      {/* Order Info */}
      <div className="flex w-full justify-between items-center">
        <div className="max-w-2xl">
          <h2 className="text-[22px] font-semibold text-gray-800 leading-snug">{order.title}</h2>
          <p className="text-sm text-gray-400">{order.size}</p>
        </div>
        <div>
          <p className="text-[32px] font-semibold text-[rgba(33,150,83,1)] font-['Open_Sans']">
            ₹{order.total}.00
          </p>
        </div>
      </div>
    </div>

    {/* Order Status & Button */}
    <div className="flex-1 p-6">
      <div className="flex justify-between items-center mt-1">
        <p className="text-sm flex items-center text-gray-400">
          <span
            className={`text-xs font-medium w-[12px] h-[12px] mr-2 inline-block rounded-full ${
              order.status === "Delivered" ? "text-green-600 bg-green-500" : "text-red-600 bg-red-500"
            }`}
          />
          {order.status} on {order.date}
        </p>
        <Link href={`order/${order.id}`}>
          <button className="cursor-pointer px-4 py-2 text-blue-500 font-normal transition hover:underline">
            View Order Details
          </button>
        </Link>
      </div>
    </div>
  </div>
  );
}
