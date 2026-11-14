import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import ProjectThumb from '../components/ProjectThumb';
import playground from '../data/playground';

function Playground() {
  return (
    <>
      <Nav />
      <main>
        <section className="about-hero">
          <p className="tag">Playground</p>
          <h1 className="about-title">Side projects and tools I've built to make QC work faster.</h1>
          <p className="about-bio">
            Small, working experiments. Open one to try it live in your browser, or read the short
            write-up on how it was built.
          </p>
        </section>

        <section className="work play">
          <div className="work-grid">
            {playground.map((item) => (
              <article className="work-card play-card" key={item.slug}>
                <a className="play-card-main" href={item.demoUrl}>
                  <ProjectThumb art={item.art} />
                  <div className="work-card-body">
                    <div className="work-card-top">
                      <span className="play-live">
                        <span className="tag-dot" aria-hidden="true" />
                        Live demo
                      </span>
                      <span className="work-category">{item.category}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p className="work-summary">{item.summary}</p>
                    <span className="work-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                </a>
                <div className="play-card-foot">
                  <a className="pill-btn" href={item.demoUrl}>
                    Try it
                  </a>
                  <Link className="text-link" to={`/playground/${item.slug}`}>
                    Read the case study
                  </Link>
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

export default Playground;
