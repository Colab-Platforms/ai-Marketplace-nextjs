'use client';

import { useEffect, useState } from 'react';
import AavtarPreloader from '../AavtarPreloader/AavtarPreloader';

export default function PageLoader() {
  const [isComplete, setIsComplete] = useState(false);

  if (isComplete) return null;

  return (
    <AavtarPreloader 
      onComplete={() => setIsComplete(true)} 
      duration={2200} 
    />
  );
}
