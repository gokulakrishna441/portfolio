import Reveal from '../../animations/Reveal';
import { scrollToSection } from '../../../utils/scroll';

export default function IntroSection() {
  return (
    <section className="section home-intro" aria-label="Introduction">
      <div className="container grid-2">
        <Reveal>
          <p className="eyebrow">Introduction</p>
          <h2 className="section-title">Full-stack craft with recruiter-ready clarity.</h2>
          <p className="section-lead">
            Based in Coimbatore, I ship modular MERN applications, reusable React systems, REST APIs,
            MongoDB schemas, and JWT-secured admin experiences. Currently programming at eNova
            Software And Hardware Solutions.
          </p>
          <div className="btn-group" style={{ marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-primary" onClick={() => scrollToSection('about')}>
              About me
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('resume')}>
              Download resume
            </button>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass home-intro__card">
            <div className="home-stat">
              <strong>3+</strong>
              <span>Years building web products</span>
            </div>
            <div className="home-stat">
              <strong>4</strong>
              <span>Featured product deliveries</span>
            </div>
            <div className="home-stat">
              <strong>MERN</strong>
              <span>React · Node · Express · MongoDB</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
