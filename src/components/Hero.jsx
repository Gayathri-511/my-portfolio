import skills, { TOOLS } from '../data/skills';

function Hero() {
  const items = [...skills.map((s) => s.name), ...TOOLS];

  return (
    <section className="hero">
      <p className="tag">
        <span className="tag-dot" aria-hidden="true" />
        Quality Analyst · Business Analyst · Chennai, India
      </p>

      <h1>
        I'm Gayathri, a QA &amp; business analyst who turns{' '}
        <span className="muted">messy user flows into shippable, trustworthy products.</span>
      </h1>

      <div className="marquee" aria-label="Skills">
        <div className="marquee-track">
          {[...items, ...items].map((item, i) => (
            <span className="marquee-item" key={`${item}-${i}`} aria-hidden={i >= items.length}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
