import Reveal from '../../animations/Reveal';
import Tilt3D from '../../animations/Tilt3D';
import StackOrbit from '../StackOrbit';
import { scrollToSection } from '../../../utils/scroll';

export default function IntroSection() {
  return (
    <section className="section home-intro" aria-label="Introduction">
      <div className="container grid-2 home-intro__layout">
        <Reveal direction="left">
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

          <div className="home-intro__stats">
            <Tilt3D max={8} scale={1.01}>
              <div className="glass home-stat-card">
                <strong>3+</strong>
                <span>Years shipping products</span>
              </div>
            </Tilt3D>
            <Tilt3D max={8} scale={1.01}>
              <div className="glass home-stat-card">
                <strong>4</strong>
                <span>Featured deliveries</span>
              </div>
            </Tilt3D>
            <Tilt3D max={8} scale={1.01}>
              <div className="glass home-stat-card">
                <strong>MERN</strong>
                <span>End-to-end stack</span>
              </div>
            </Tilt3D>
          </div>
        </Reveal>

        <Reveal delay={0.12} direction="right">
          <StackOrbit />
        </Reveal>
      </div>
    </section>
  );
}
