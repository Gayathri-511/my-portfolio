import { Link } from 'react-router-dom';
import work from '../data/work';
import ProjectThumb from './ProjectThumb';

function Work() {
  return (
    <section className="work" id="work">
      <div className="section-head">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>Case studies</h2>
        </div>
        <p className="section-head-note">{String(work.length).padStart(2, '0')} projects</p>
      </div>

      <div className="work-grid">
        {work.map((item, i) => (
          <Link className="work-card" to={`/work/${item.slug}`} key={item.title}>
            <ProjectThumb icon={item.icon} art={item.art} />
            <div className="work-card-body">
              <div className="work-card-top">
                <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="work-category">{item.category}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="work-summary">{item.summary}</p>
              <span className="work-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Work;
