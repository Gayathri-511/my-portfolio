import { Link } from 'react-router-dom';
import { NAV_LINKS, SOCIAL_LINKS, EMAIL_COMPOSE_URL } from '../data/site';

function Footer() {
  return (
    <footer className="footer" id="contact">
      <nav className="footer-nav" aria-label="Footer">
        {NAV_LINKS.map((l) => (
          <Link to={l.to} key={l.label}>
            {l.label}
          </Link>
        ))}
      </nav>
      <span className="footer-links">
        {SOCIAL_LINKS.map((l) => (
          <a href={l.href} target="_blank" rel="noreferrer" key={l.label}>
            {l.label} ↗
          </a>
        ))}
        <a href={EMAIL_COMPOSE_URL} target="_blank" rel="noreferrer">
          Email ↗
        </a>
      </span>
    </footer>
  );
}

export default Footer;
