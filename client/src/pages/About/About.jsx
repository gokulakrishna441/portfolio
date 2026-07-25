import { useEffect, useState } from 'react';
import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import Spinner from '../../components/ui/Spinner';
import { getProfile } from '../../services/api';
import profileImg from '../../assets/profile.png';
import { scrollToSection } from '../../utils/scroll';
import './About.css';

const fallback = {
  name: 'Gokula Krishna A',
  title: 'MERN Stack Developer',
  about:
    'I am a MERN Stack Developer based in Coimbatore, Tamil Nadu, with hands-on experience building modular full-stack applications, admin portals, analytics dashboards, and ERP workflows.',
  email: 'gokulakrishna441@gmail.com',
  phone: '+91 6379185957',
  location: 'Coimbatore, Tamil Nadu, India',
  availability: 'Open to full-time opportunities',
};

export default function About({ embedded = false }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => setProfile(res.data.data || fallback))
      .catch(() => setProfile(fallback))
      .finally(() => setLoading(false));
  }, []);

  const data = profile || fallback;

  const content = loading ? (
    <Spinner />
  ) : (
    <div className="container about-grid">
      <Reveal direction="left">
        <div className="about-photo glass">
          <img src={profileImg} alt={data.name} />
        </div>
      </Reveal>
      <div>
        <Reveal direction="right">
          <p className="eyebrow">About</p>
          <h2 className="section-title">{data.name}</h2>
          <p className="about-role">{data.title}</p>
          <p className="section-lead">{data.about}</p>
        </Reveal>
        <Reveal delay={0.12} direction="up">
          <ul className="about-meta glass">
            <li>
              <span>Location</span>
              <strong>{data.location}</strong>
            </li>
            <li>
              <span>Email</span>
              <strong>
                <a href={`mailto:${data.email}`}>{data.email}</a>
              </strong>
            </li>
            <li>
              <span>Phone</span>
              <strong>
                <a href={`tel:${data.phone}`}>{data.phone}</a>
              </strong>
            </li>
            <li>
              <span>Availability</span>
              <strong>{data.availability}</strong>
            </li>
          </ul>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="btn-group" style={{ marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-primary" onClick={() => scrollToSection('experience')}>
              Experience
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('contact')}>
              Contact
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <section id="about" className="section">
        {content}
      </section>
    );
  }

  return (
    <div className="page">
      <SEO title="About" description="About Gokula Krishna A — MERN Stack Developer from Coimbatore." />
      <section className="section">{content}</section>
    </div>
  );
}
