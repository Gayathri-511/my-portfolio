import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import Experience from '../components/Experience';
import Education from '../components/Education';
import CountUp from '../components/CountUp';
import { SOCIAL_LINKS, EMAIL, EMAIL_COMPOSE_URL } from '../data/site';

const BASE = import.meta.env.BASE_URL;

const STATS = [
  { value: '3+ yrs', label: 'Quality Analyst at Amazon, since Jun 2023' },
  { value: '95%', label: 'Test coverage on business-aligned test plans' },
  { value: '80+', label: 'Defects logged in JIRA across app projects' },
  { value: '2', label: 'Independent BA case studies' },
];

const LINKS = [
  { label: EMAIL, href: EMAIL_COMPOSE_URL, external: true },
  ...SOCIAL_LINKS.map((l) => ({ ...l, external: true })),
];

function About() {
  return (
    <>
      <Nav />
      <main>
        <section className="about-hero about-hero-split">
          <div className="about-photo">
            <picture>
              <source srcSet={`${BASE}images/gayathri.webp`} type="image/webp" />
              <img
                src={`${BASE}images/gayathri.jpg`}
                alt="Gayathri RK"
                width="1440"
                height="1800"
                fetchPriority="high"
              />
            </picture>
            <span className="about-photo-badge">
              <span className="tag-dot" aria-hidden="true" />
              Chennai, India
            </span>
          </div>

          <div className="about-intro">
            <p className="tag">About</p>
            <h1 className="about-title">Hi, I'm Gayathri.</h1>
            <p className="about-bio">
              A results-driven Business Analyst focused on data accuracy and process improvement. I
              turn business needs into clear documentation, spot the gaps, and back decisions with
              data. Currently a Quality Analyst at Amazon.
            </p>

            <div className="about-links">
              {LINKS.map((l) => (
                <a
                  className="about-link"
                  href={l.href}
                  key={l.label}
                  {...(l.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {l.label}
                  {l.external && <span aria-hidden="true"> ↗</span>}
                </a>
              ))}
            </div>
          </div>
        </section>

        <div className="about-stats">
          {STATS.map((s) => (
            <div className="about-stat" key={s.label}>
              <span className="about-stat-value">
                <CountUp value={s.value} />
              </span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        <Experience />
        <Education />
      </main>
      <CTA />
      <Footer />
    </>
  );
}

export default About;
