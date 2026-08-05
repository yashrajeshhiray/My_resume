import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Metric } from '../../content/types';

function formatValue(metric: Metric, current: number): string {
  const rounded = metric.kind === 'score' ? current.toFixed(2) : Math.round(current).toLocaleString();
  const suffix = metric.raw.replace(/^[\d.,]+/, '');
  return `${rounded}${suffix}`;
}

function CountUpValue({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplay(metric.value);
      return;
    }
    const duration = 900;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(metric.value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, metric.value]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-medium text-accent">
      {formatValue(metric, display)}
    </span>
  );
}

export function StatTile({ metric }: { metric: Metric }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-surface-line/60 bg-surface-raised/40 p-5"
    >
      <CountUpValue metric={metric} />
      <p className="mt-2 text-sm leading-snug text-text-secondary">{metric.label}</p>
    </motion.div>
  );
}
