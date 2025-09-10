'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import StaticLayout from './layouts/StaticLayout';
import DynamicLayout from './layouts/DynamicLayout';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, [pathname]); // run on route change too

  if (isLoggedIn === null) return null; // show nothing until state is determined

  return isLoggedIn ? (
    <DynamicLayout>{children}</DynamicLayout>
  ) : (
    <StaticLayout>{children}</StaticLayout>
  );
}
