import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS, RESUME_URL } from '../data/site';

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
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <Link className="logo" to="/" onClick={close}>
        <span className="logo-mark" aria-hidden="true">G</span>
        <span>
          Gayathri<span className="logo-dot">.</span>
        </span>
      </Link>

      <nav className={`nav-links ${open ? 'is-open' : ''}`}>
        {NAV_LINKS.map((l) =>
          l.hash ? (
            <Link to={l.to} key={l.label} onClick={close}>
              {l.label}
            </Link>
          ) : (
            <NavLink to={l.to} key={l.label} onClick={close}>
              {l.label}
            </NavLink>
          ),
        )}
        <a className="pill-btn nav-links-cta" href={RESUME_URL} download onClick={close}>
          <DownloadIcon />
          Download Resume
        </a>
      </nav>

      <a className="pill-btn nav-cta-desktop" href={RESUME_URL} download>
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
