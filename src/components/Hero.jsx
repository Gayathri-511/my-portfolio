import { Link } from 'react-router-dom';
import services from '../data/services';

function Hero() {
  const skills = services.flatMap((group) => group.items);

  return (
    <section className="hero">
      <div className="hero-top">
        <p className="tag">
          <span className="tag-dot" aria-hidden="true" />
          Quality Analyst · Business Analyst · Chennai, India
        </p>
      </div>

      <h1>
        I'm Gayathri, a QA &amp; business analyst who turns{' '}
        <span className="muted">messy user flows into shippable, trustworthy products.</span>
      </h1>

      <div className="hero-bottom">
        <p className="hero-lead">
          I test products the way real users break them, then translate every defect into the
          language the roadmap is prioritised in: conversion, drop-off and trust. Currently a
          Quality Analyst at Amazon, working on Prime Video content quality.
        </p>
        <div className="hero-actions">
          <Link className="pill-btn pill-btn-lg" to="/#work">
            View case studies
            <span aria-hidden="true">→</span>
          </Link>
          <Link className="ghost-btn" to="/about">
            About me
          </Link>
        </div>
      </div>

      <div className="marquee" aria-label="Skills">
        <div className="marquee-track">
          {[...skills, ...skills].map((skill, i) => (
            <span className="marquee-item" key={`${skill}-${i}`} aria-hidden={i >= skills.length}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
