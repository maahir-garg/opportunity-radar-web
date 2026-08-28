'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { scrollToId } from '@/lib/hash-navigation';

/**
 * Completes a cross-page hash link. Arriving at `/#preview` from another route
 * renders the landing page at the top, because the App Router ignores the
 * fragment; this scrolls to it once the section actually exists.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const raw = window.location.hash.slice(1);
    if (!raw) return;

    const id = decodeURIComponent(raw);
    let frame = 0;
    let attempts = 0;

    // The section can mount a frame or two after the route does.
    const attempt = () => {
      if (scrollToId(id)) return;
      if (attempts++ < 30) frame = requestAnimationFrame(attempt);
    };

    frame = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
