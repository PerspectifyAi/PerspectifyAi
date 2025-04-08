'use client';

import { useEffect } from 'react';

export function RemoveVSCExtensionClass() {
  useEffect(() => {
    document.body.classList.remove('vsc-initialized');
  }, []);

  return null;
}
