import experience from '../data/experience';

function Experience() {
  return (
    <section className="experience" id="experience">
      <h2>Experience</h2>
      <div className="experience-list">
        {experience.map((job) => (
          <div className="experience-item" key={job.company}>
            <div className="experience-head">
              <h3>{job.role}</h3>
              <span className="experience-period">{job.period}</span>
            </div>
            <p className="experience-company">{job.company}</p>
            <ul>
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
