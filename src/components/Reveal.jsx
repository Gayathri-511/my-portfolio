import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Elements that fade up as they scroll into view.
const SELECTOR = [
  '.work-card',
  '.cs-highlight',
  '.cs-intro-card',
  '.cs-card',
  '.cs-finding',
  '.cs-steps li',
  '.cs-compare-col',
  '.cs-scope-col',
  '.cs-journey-stage',
  '.cs-story',
  '.cs-metric',
  '.cs-bars',
  '.cs-note',
  '.cs-table-wrap',
  '.cs-next',
  '.skill-card',
  '.about-stat',
  '.experience-item',
  '.education-item',
  '.play-card',
].join(',');

// These keep their reveal classes because child animations depend on them.
const KEEP = '.cs-bars, .cs-journey-stage';

function Reveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!('IntersectionObserver' in window)) return undefined;

    const timers = [];
    const finish = (el) => {
      if (el.matches(KEEP)) return;
      el.classList.remove('reveal', 'is-visible');
      el.style.transitionDelay = '';
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);
          el.classList.add('is-visible');
          // Drop the reveal styles afterwards so hover transitions work normally.
          const delay = parseFloat(el.style.transitionDelay) || 0;
          timers.push(setTimeout(() => finish(el), 700 + delay));
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    const raf = requestAnimationFrame(() => {
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (el.classList.contains('reveal')) return;
        // Stagger siblings slightly (max 5 steps).
        const siblings = [...el.parentElement.children].filter((c) => c.matches(SELECTOR));
        const i = Math.min(siblings.indexOf(el), 5);
        el.style.transitionDelay = `${i * 70}ms`;
        el.classList.add('reveal');
        io.observe(el);
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      timers.forEach(clearTimeout);
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.remove('reveal', 'is-visible');
        el.style.transitionDelay = '';
      });
    };
  }, [pathname]);

  return null;
}

export default Reveal;
