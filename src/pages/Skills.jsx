import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import skills from '../data/skills';

const ICONS = {
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3" width="7" height="6" rx="1.5" />
      <rect x="14" y="15" width="7" height="6" rx="1.5" />
      <path d="M10 6h5a2 2 0 0 1 2 2v7" />
      <path d="m14.5 12.5 2.5 2.5 2.5-2.5" />
    </>
  ),
  gap: (
    <>
      <path d="M12 3v18" strokeDasharray="2 2.5" />
      <path d="M4 7h5M4 12h5M4 17h5" />
      <path d="M15 7h5M15 12h5M15 17h2" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </>
  ),
  data: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v18h18" />
      <rect x="7" y="12" width="3" height="6" rx="1" />
      <rect x="12" y="8" width="3" height="10" rx="1" />
      <rect x="17" y="5" width="3" height="13" rx="1" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M16 14.2a5 5 0 0 1 5.5 5" />
    </>
  ),
  priority: (
    <>
      <path d="M4 6h10M4 12h7M4 18h4" />
      <path d="M18 4v16M15 17l3 3 3-3" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  tools: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z" />
  ),
};

// Brand badge + display name for each linked study, keyed by route.
const STUDIES = {
  '/work/pantaloons': { name: 'Pantaloons', badge: 'pantaloons' },
  '/work/easemytrip': { name: 'EaseMyTrip', badge: 'easemytrip' },
  '/playground/sop-assistant': { name: 'SOP Assistant', badge: 'sop' },
};

function StudyBadge({ type }) {
  if (type === 'easemytrip') {
    return (
      <span className="proof-badge proof-badge-emt" aria-hidden="true">
        <svg viewBox="0 0 200 110">
          <path d="M8 6 L196 22 L120 104 Z" fill="#1fb3e6" />
          <path d="M120 104 L196 22 L90 62 Z" fill="#0c8fc7" />
        </svg>
      </span>
    );
  }
  if (type === 'sop') {
    return (
      <span className="proof-badge proof-badge-sop" aria-hidden="true">
        SOP
      </span>
    );
  }
  return (
    <span className="proof-badge proof-badge-pantaloons" aria-hidden="true">
      p
    </span>
  );
}

function ProofLink({ proof }) {
  const path = proof.to.split('#')[0];
  const study = STUDIES[path] ?? { name: proof.label, badge: 'pantaloons' };
  const section = proof.label.split(' · ')[1] ?? '';
  return (
    <Link className="proof-box" to={proof.to}>
      <StudyBadge type={study.badge} />
      <span className="proof-text">
        <span className="proof-study">{study.name}</span>
        <span className="proof-section">{section}</span>
      </span>
      <span className="proof-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

function Skills() {
  return (
    <>
      <Nav />
      <main>
        <section className="about-hero">
          <p className="tag">Skills</p>
          <h1 className="about-title">Proof of skill, not just a list.</h1>
          <p className="about-bio">
            Each skill links to the exact case study section where I used it. Pick a case study on any
            card to jump straight there.
          </p>
        </section>

        <section className="skills" aria-label="Skills">
          <div className="skills-grid">
            {skills.map((s) => (
              <article className={`skill-card area-${s.area.toLowerCase()}`} key={s.name}>
                <div className="skill-visual" aria-hidden="true">
                  <span className="skill-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {ICONS[s.icon]}
                    </svg>
                  </span>
                  <span className="skill-area">{s.area}</span>
                </div>

                <div className="skill-body">
                  <h2>{s.name}</h2>
                  <p>{s.description}</p>

                  {s.proofs && (
                    <div className="skill-proofs">
                      <span className="skill-proofs-label">See it in</span>
                      {s.proofs.map((p) => (
                        <ProofLink proof={p} key={p.to} />
                      ))}
                    </div>
                  )}

                  {s.tools && (
                    <ul className="skill-tools">
                      {s.tools.map((t) => (
                        <li key={t.name}>
                          <span className="skill-tool-name">{t.name}</span>
                          <span className="skill-tool-use">{t.use}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <CTA />
      <Footer />
    </>
  );
}

export default Skills;
