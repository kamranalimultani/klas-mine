'use client';

import Sidebar from '../components/AccountSidebar/Sidebar';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token'); // example
    router.push('/login');
  };

  return (
    <div className="flex ">
      <Sidebar handleLogout={handleLogout} />
      <main className="flex-1 bg-white px-8 2xl:px-20 border-l border-gray-300">{children}</main>
    </div>
  );
}