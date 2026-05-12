'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '../../../lib/gtag';

const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    pageview(pathname);
  }, [pathname]);

  return null;
};

export default Analytics;
