import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import caseStudies from '../data/caseStudies';
import work from '../data/work';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import ProjectThumb from '../components/ProjectThumb';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const asArray = (value) => (Array.isArray(value) ? value : [value]);

function SectionBody({ section }) {
  const { body, cards, steps, compare, table, findings, stories, metrics, list, tags } = section;

  return (
    <>
      {body && asArray(body).map((p) => <p key={p.slice(0, 32)}>{p}</p>)}

      {cards && (
        <div className="cs-cards">
          {cards.map((card) => (
            <div className="cs-card" key={card.title}>
              {card.tag && <span className="cs-chip">{card.tag}</span>}
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      )}

      {steps && (
        <ol className="cs-steps">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="cs-step-num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {compare && (
        <div className="cs-compare">
          {['before', 'after'].map((side) => (
            <div className={`cs-compare-col is-${side}`} key={side}>
              <h3>{compare[side].title}</h3>
              <ul>
                {compare[side].items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {table && (
        <div className="cs-table-wrap">
          <table className="cs-table">
            <thead>
              <tr>
                {table.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, ci) => (
                    <td key={ci}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {findings && (
        <div className="cs-findings">
          {findings.map((f) => (
            <article className="cs-finding" key={f.title}>
              <div className="cs-finding-top">
                <span className={`cs-sev sev-${f.severity.toLowerCase()}`}>{f.severity}</span>
                <span className="cs-finding-area">{f.area}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <p className="cs-finding-impact">
                <strong>Impact:</strong> {f.impact}
              </p>
            </article>
          ))}
        </div>
      )}

      {stories && (
        <div className="cs-stories">
          {stories.map((s) => (
            <article className="cs-story" key={s.want}>
              <p className="cs-story-text">
                As a <strong>{s.as}</strong>, I want <strong>{s.want}</strong>, so that {s.so}.
              </p>
              <span className="cs-story-label">Acceptance criteria</span>
              <ul>
                {s.criteria.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}

      {metrics && (
        <div className="cs-metrics">
          {metrics.map((m) => (
            <div className="cs-metric" key={m.label}>
              <span className="cs-metric-label">{m.label}</span>
              <span className="cs-metric-target">{m.target}</span>
            </div>
          ))}
        </div>
      )}

      {list && (
        <ul className="cs-list">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {tags && (
        <div className="cs-tags">
          {tags.map((t) => (
            <span className="cs-chip cs-chip-outline" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function CaseStudy() {
  const { slug } = useParams();
  const study = caseStudies[slug];
  const [activeId, setActiveId] = useState('');
  const contentRef = useRef(null);

  useEffect(() => {
    if (!study) return undefined;
    const sectionEls = Array.from(contentRef.current?.querySelectorAll('.cs-section') ?? []);
    if (sectionEls.length === 0) return undefined;

    const TRIGGER_LINE = 160;

    function updateActive() {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActiveId(sectionEls[sectionEls.length - 1].id);
        return;
      }
      let current = sectionEls[0].id;
      for (const el of sectionEls) {
        if (el.getBoundingClientRect().top <= TRIGGER_LINE) current = el.id;
        else break;
      }
      setActiveId(current);
    }

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [study, slug]);

  if (!study) {
    return (
      <>
        <Nav />
        <main className="case-study">
          <p>Case study not found.</p>
          <Link className="text-link" to="/">
            ← Back home
          </Link>
        </main>
        <CTA />
        <Footer />
      </>
    );
  }

  const isPlayground = study.kind === 'playground';
  const index = work.findIndex((w) => w.slug === slug);
  const next = index >= 0 ? work[(index + 1) % work.length] : null;

  return (
    <>
      <Nav />
      <main className="case-study">
        <Link className="back-link" to={isPlayground ? '/playground' : '/#work'}>
          {isPlayground ? '← Back to playground' : '← Back to work'}
        </Link>

        <header className="cs-hero">
          <p className="tag">{study.category}</p>
          <h1 className="case-title">{study.title}</h1>
          <p className="case-summary">{study.summary}</p>
          {study.demoUrl && (
            <div className="cs-hero-actions">
              <a className="pill-btn pill-btn-lg" href={study.demoUrl}>
                Open live demo
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </header>

        {study.meta && (
          <dl className="cs-meta">
            {study.meta.map((m) => (
              <div key={m.label}>
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ProjectThumb icon={study.icon} art={study.art} className="case-thumb" />

        <div className="cs-intro">
          <div className="cs-intro-card">
            <span className="eyebrow">Context</span>
            <p>{study.context}</p>
          </div>
          <div className="cs-intro-card">
            <span className="eyebrow">My role</span>
            <p>{study.role}</p>
          </div>
        </div>

        {study.highlights && (
          <div className="cs-highlights">
            {study.highlights.map((h) => (
              <div className="cs-highlight" key={h.label}>
                <span className="cs-highlight-value">{h.value}</span>
                <span className="cs-highlight-label">{h.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="case-layout">
          <div className="case-content" ref={contentRef}>
            {study.sections.map((section) => (
              <section
                className={`cs-section${section.highlight ? ' cs-section-highlight' : ''}`}
                id={slugify(section.heading)}
                key={section.heading}
              >
                <h2>{section.heading}</h2>
                <SectionBody section={section} />
              </section>
            ))}
          </div>

          <nav className="case-toc" aria-label="Sections">
            <span className="case-toc-label">On this page</span>
            <ul>
              {study.sections.map((section) => {
                const id = slugify(section.heading);
                return (
                  <li key={section.heading}>
                    <a href={`#${id}`} className={id === activeId ? 'is-active' : ''}>
                      {section.heading}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {next && next.slug !== slug && (
          <Link className="cs-next" to={`/work/${next.slug}`}>
            <span className="eyebrow">Next case study</span>
            <span className="cs-next-title">
              {next.title}
              <span className="cs-next-arrow" aria-hidden="true">
                →
              </span>
            </span>
            <span className="cs-next-category">{next.category}</span>
          </Link>
        )}
      </main>
      <CTA />
      <Footer />
    </>
  );
}

export default CaseStudy;
