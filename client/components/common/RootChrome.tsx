'use client';

import { usePathname } from 'next/navigation';
// import AnnouncementBar from '@/components/common/AnnouncementBar';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import ScrollProgress from '@/components/common/ScrollProgress';

const AUTH_ROUTES = ['/login', '/register'];

export default function RootChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = AUTH_ROUTES.includes(pathname) || pathname.startsWith('/dashboard');

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Noise texture overlay */}
      <div className="pointer-events-none fixed inset-0 noise z-0" />
      {/* Radial glow blobs */}
      <div className="pointer-events-none fixed -top-40 -left-40 h-125 w-125 rounded-full bg-primary/15 blur-[120px] z-0" />
      <div className="pointer-events-none fixed top-1/3 -right-40 h-150 w-150 rounded-full bg-accent/15 blur-[140px] z-0" />

      {!isAuthRoute && <ScrollProgress />}
      {/* {!isAuthRoute && <AnnouncementBar />} */}
      {!isAuthRoute && <Navbar />}
      <main className="relative z-10">{children}</main>
      {!isAuthRoute && <Footer />}
    </div>
  );
}
