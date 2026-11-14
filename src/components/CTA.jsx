import { EMAIL_COMPOSE_URL } from '../data/site';

function CTA() {
  return (
    <section className="cta" id="cta">
      <div className="cta-card">
        <p className="eyebrow eyebrow-light">Let's work together</p>
        <h2>Have a project that needs a sharp eye for detail? Drop me an email.</h2>
        <a className="cta-email" href={EMAIL_COMPOSE_URL} target="_blank" rel="noreferrer">
          rkgayathri18@gmail.com
          <span className="cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}

export default CTA;
