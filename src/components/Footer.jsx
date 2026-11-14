function Footer() {
  return (
    <footer className="footer" id="contact">
      <span>© {new Date().getFullYear()} Gayathri RK · QA &amp; Business Analyst</span>
      <span className="footer-links">
        <a href="https://www.linkedin.com/in/rk-gayathri/" target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href="https://medium.com/@gayathrirk" target="_blank" rel="noreferrer">
          Medium ↗
        </a>
        <a href="mailto:rkgayathri18@gmail.com">Email ↗</a>
      </span>
    </footer>
  );
}

export default Footer;
