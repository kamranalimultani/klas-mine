'use client';

import { ChevronDown } from 'lucide-react';

const notifications = [
  {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'April 26, 2025',
    time: '2:45 PM',
    month: 'April 2025',
  },
  {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'April 26, 2025',
    time: '2:45 PM',
    month: 'April 2025',
  },
  {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'March 26, 2025',
    time: '2:45 PM',
    month: 'March 2025',
  },
    {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'March 26, 2025',
    time: '2:45 PM',
    month: 'March 2025',
  },
    {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'March 26, 2025',
    time: '2:45 PM',
    month: 'March 2025',
  },
    {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'March 26, 2025',
    time: '2:45 PM',
    month: 'March 2025',
  },
    {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'May 26, 2025',
    time: '2:45 PM',
    month: 'May 2025',
  },
     {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'May 26, 2025',
    time: '2:45 PM',
    month: 'May 2025',
  },
     {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'May 26, 2025',
    time: '2:45 PM',
    month: 'May 2025',
  },
     {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'May 26, 2025',
    time: '2:45 PM',
    month: 'May 2025',
  },
     {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'May 26, 2025',
    time: '2:45 PM',
    month: 'May 2025',
  },
     {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'June 26, 2025',
    time: '2:45 PM',
    month: 'June 2025',
  },
      {
    title: 'Plan Activated Successfully!',
    message:
      'Your ₹499 plan is now active. Enjoy seamless services, exclusive benefits, and stay connected without any interruptions. Thank you!',
    date: 'June 26, 2025',
    time: '2:45 PM',
    month: 'June 2025',
  },
];

const groupedNotifications = notifications.reduce((acc, item) => {
  acc[item.month] = acc[item.month] || [];
  acc[item.month].push(item);
  return acc;
}, {} as Record<string, typeof notifications>);

export default function NotificationPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="ont-medium text-[#333333] text-[44px]">Notification</h1>
        <button className="flex items-center gap-1 px-6 py-4 border rounded-lg text-[14px] border-gray-200 text-gray-700 bg-gray-100 hover:bg-gray-100">
          Short by <ChevronDown size={16} />
        </button>
      </div>

      {Object.entries(groupedNotifications).map(([month, items]) => (
        <div key={month} className="mb-10">
          {/* Month Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-200" />
            <span className="mx-4 text-gray-400 text-sm">{month}</span>
            <hr className="flex-grow border-t border-gray-200" />
          </div>

          {/* Notification Items */}
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 mb-6">
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full font-bold text-lg shadow-md">
                P
              </div>

              {/* Text Content */}
              <div>
                <h2 className="text-[20px] font-medium text-gray-800">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{item.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.date} · {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
