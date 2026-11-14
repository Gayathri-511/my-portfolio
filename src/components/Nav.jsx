import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function DownloadIcon() {
  return (
    <svg className="icon-download" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v12m0 0 4-4m-4 4-4-4M5 19h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <Link className="logo" to="/" onClick={close}>
        <span className="logo-mark" aria-hidden="true">G</span>
        <span>
          Gayathri<span className="logo-dot">.</span>
        </span>
      </Link>

      <nav className={`nav-links ${open ? 'is-open' : ''}`}>
        <Link to="/#work" onClick={close}>
          Work
        </Link>
        <NavLink to="/about" onClick={close}>
          About
        </NavLink>
        <NavLink to="/playground" onClick={close}>
          Playground
        </NavLink>
        <NavLink to="/blog" onClick={close}>
          Blog
        </NavLink>
        <a className="pill-btn nav-links-cta" href="/Gayathri_RK_Resume.pdf" download onClick={close}>
          <DownloadIcon />
          Download Resume
        </a>
      </nav>

      <a className="pill-btn nav-cta-desktop" href="/Gayathri_RK_Resume.pdf" download>
        <DownloadIcon />
        Resume
      </a>

      <button
        className={`nav-toggle ${open ? 'is-open' : ''}`}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  );
}

export default Nav;
