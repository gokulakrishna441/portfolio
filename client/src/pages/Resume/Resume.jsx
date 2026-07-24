import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import { downloadResumeUrl } from '../../services/api';
import './Resume.css';

export default function ResumePage({ embedded = false }) {
  const downloadUrl = downloadResumeUrl();

  const content = (
    <div className="container resume-page">
      <Reveal>
        <div className="section-head">
          <p className="eyebrow">Resume</p>
          <h2 className="section-title">Curriculum vitae</h2>
          <p className="section-lead">
            Download the latest PDF resume or preview key highlights from the attached document.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="glass resume-card">
          <div>
            <h3>Gokula Krishna A</h3>
            <p>MERN Stack Developer · Coimbatore, Tamil Nadu</p>
            <p className="resume-contact">gokulakrishna441@gmail.com · (+91) 6379185957</p>
          </div>
          <div className="btn-group">
            <a className="btn btn-primary" href={downloadUrl} download>
              Download PDF
            </a>
            <a className="btn btn-ghost" href={downloadUrl} target="_blank" rel="noreferrer">
              Open in new tab
            </a>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="glass resume-preview">
          <h3>Snapshot</h3>
          <ul>
            <li>Programmer at eNova Software And Hardware Solutions (Mar 2026 – Present)</li>
            <li>MERN Stack Developer at App Innovation Technologies (Jun 2023 – Aug 2025)</li>
            <li>Web Developer at Sai Techno Solutions (Jun 2022 – Mar 2023)</li>
            <li>Intern at Besant Technologies, Bengaluru</li>
            <li>B.E. Mechanical Engineering — Anna University (2015–2019)</li>
          </ul>
        </div>
      </Reveal>
    </div>
  );

  if (embedded) {
    return (
      <section id="resume" className="section">
        {content}
      </section>
    );
  }

  return (
    <div className="page">
      <SEO title="Resume" description="View and download Gokula Krishna A's resume." />
      <section className="section">{content}</section>
    </div>
  );
}
