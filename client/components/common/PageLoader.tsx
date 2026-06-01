'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[#1E2D42] z-[9999] flex items-center justify-center transition-opacity duration-600">
      <div className="animate-pulse">
        <Image src="/Aavtat logo.svg" alt="Avatar logo" width={1000} height={50} className="logo-mark" />
      </div>
    </div>
  );
}
