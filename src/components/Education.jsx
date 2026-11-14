import education from '../data/education';

function Education() {
  return (
    <section className="education" id="education">
      <h2>Education</h2>
      <div className="education-list">
        {education.map((item) => (
          <div className="education-item" key={item.level}>
            <div className="education-head">
              <h3>{item.school}</h3>
              <span className="experience-period">{item.period}</span>
            </div>
            <p className="experience-company">
              {item.level} · {item.course}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
