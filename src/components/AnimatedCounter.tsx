"use client";

import React, { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 1200
}) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = 0;
          const end = target;
          const totalFrames = Math.round(duration / 16.6); // ~60fps
          let frame = 0;

          const timer = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentCount = Math.round(start + (end - start) * easeProgress);
            
            setCount(currentCount);

            if (frame >= totalFrames) {
              setCount(end);
              clearInterval(timer);
            }
          }, 16.6);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <div ref={elementRef}>{count}</div>;
};
