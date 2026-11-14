import services from '../data/services';

function Services() {
  return (
    <section className="services">
      <h2>What I do</h2>
      <div className="services-grid">
        {services.map((group) => (
          <div className="service-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
