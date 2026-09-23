'use client';

import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  affixClassName?: string;
};

export function CountUp({ value, prefix = '', suffix = '', duration = 1800, affixClassName }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  const finalText = `${prefix}${value.toLocaleString('en-US')}${suffix}`;

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true">
        {prefix && <span className={affixClassName}>{prefix}</span>}
        {display.toLocaleString('en-US')}
        {suffix && <span className={affixClassName}>{suffix}</span>}
      </span>
    </span>
  );
}
