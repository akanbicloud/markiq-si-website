'use client';

import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Lenis from 'lenis';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check prefers-reduced-motion: if reduced, do not initialize Lenis
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener('change', handleChange);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
