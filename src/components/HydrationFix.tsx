'use client';

import { useEffect, useState } from 'react';

export default function HydrationFix({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    document.body.classList.remove('vsc-initialized');
  }, []);

  if (!hasMounted) return null;

  return <>{children}</>;
}
