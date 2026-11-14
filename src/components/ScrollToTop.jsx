import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    // Jump (not smooth-scroll) to the anchor once fonts have loaded, so text
    // reflow on a long page can't leave us above or below the target section.
    let cancelled = false;
    const id = decodeURIComponent(hash.slice(1));
    const jump = () => {
      if (cancelled) return;
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    };
    (document.fonts?.ready ?? Promise.resolve()).then(() => requestAnimationFrame(jump));
    return () => {
      cancelled = true;
    };
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
