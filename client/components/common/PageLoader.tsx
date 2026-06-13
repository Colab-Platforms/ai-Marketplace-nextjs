'use client';

import { useEffect, useState } from 'react';
import AavtarPreloader from '../AavtarPreloader/AavtarPreloader';

export default function PageLoader() {
  const [isComplete, setIsComplete] = useState(false);

  // Lock scroll while preloader is running, unlock as soon as it finishes.
  // Both html and body must be targeted — globals.css sets html { overflow-y: scroll }
  // which takes precedence over body alone.
  useEffect(() => {
    document.documentElement.style.overflowY = 'hidden';
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    if (isComplete) {
      document.documentElement.style.overflowY = '';
      document.body.style.overflow = '';
    }
  }, [isComplete]);

  if (isComplete) return null;

  return (
    <AavtarPreloader
      onComplete={() => setIsComplete(true)}
      duration={2200}
    />
  );
}
