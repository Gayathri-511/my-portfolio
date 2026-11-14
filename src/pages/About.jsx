import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CTA from '../components/CTA';
import Services from '../components/Services';
import Experience from '../components/Experience';
import Education from '../components/Education';

function About() {
  return (
    <>
      <Nav />
      <main>
        <section className="about-hero">
          <p className="tag">About</p>
          <h1 className="about-title">A bit about me and how I like to work.</h1>
          <p className="about-bio">
            I'm a results-oriented content operations and QA professional
            based in Chennai, India, with a strong focus on content quality
            control, validation, and workflow optimization. I care about
            accuracy, cross-functional coordination, and making sure things
            work exactly as intended before they ship.
          </p>
        </section>
        <Services />
        <Experience />
        <Education />
      </main>
      <CTA />
      <Footer />
    </>
  );
}

export default About;
