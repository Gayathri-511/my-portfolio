import { useEffect, useRef, useState } from 'react';

// Counts the first number in a value like "10M+", "₹8,376 cr" or "+18.5%"
// up from zero when it scrolls into view. Prefix and suffix stay as they are.
const PARTS = /^([^\d]*)([\d,]*\.?\d+)(.*)$/;

function CountUp({ value, duration = 1200 }) {
  const ref = useRef(null);
  const match = String(value).match(PARTS);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!match) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const [, prefix, raw, suffix] = match;
    const target = parseFloat(raw.replace(/,/g, ''));
    const decimals = (raw.split('.')[1] || '').length;
    const useCommas = raw.includes(',');
    const format = (n) => {
      const fixed = n.toFixed(decimals);
      return useCommas ? Number(fixed).toLocaleString('en-IN', { minimumFractionDigits: decimals }) : fixed;
    };

    let frame;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(`${prefix}${format(target * eased)}${suffix}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(`${prefix}${format(0)}${suffix}`);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} aria-label={String(value)}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}

export default CountUp;
