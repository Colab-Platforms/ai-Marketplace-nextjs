'use client';

import { usePathname } from 'next/navigation';
import AnnouncementBar from '@/components/common/AnnouncementBar';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ScrollProgress from '@/components/common/ScrollProgress';

const AUTH_ROUTES = ['/login', '/register'];

export default function RootChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname) || pathname.startsWith('/dashboard');

  return (
    <>
      {!isAuthRoute && <ScrollProgress />}
      {!isAuthRoute && <AnnouncementBar />}
      {!isAuthRoute && <Navbar />}
      {children}
      {!isAuthRoute && <Footer />}
    </>
  );
}
