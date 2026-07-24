import { useEffect, useState } from 'react';
import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import Spinner from '../../components/ui/Spinner';
import { getEducation, getCertifications } from '../../services/api';
import './Education.css';

const fallbackEdu = [
  {
    degree: 'Bachelor of Mechanical Engineering',
    institution: 'Sengunthar Engineering College, Tiruchengode',
    university: 'Anna University',
    startDate: 'June 2015',
    endDate: 'May 2019',
    description: 'Bachelor of Mechanical Engineering under Anna University.',
  },
];

export default function Education({ embedded = false }) {
  const [education, setEducation] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getEducation(), getCertifications()])
      .then(([eduRes, certRes]) => {
        setEducation(eduRes.data.data?.length ? eduRes.data.data : fallbackEdu);
        setCerts(certRes.data.data || []);
      })
      .catch(() => {
        setEducation(fallbackEdu);
        setCerts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const content = (
    <div className="container">
      <Reveal>
        <div className="section-head">
          <p className="eyebrow">Education</p>
          <h2 className="section-title">Academic foundation</h2>
          <p className="section-lead">
            Engineering education that grounds a systems approach to product building.
          </p>
        </div>
      </Reveal>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="edu-list">
            {education.map((item, idx) => (
              <Reveal key={item._id || item.degree} delay={idx * 0.06}>
                <article className="glass edu-card">
                  <p className="edu-dates">
                    {item.startDate} — {item.endDate}
                  </p>
                  <h3>{item.degree}</h3>
                  <p className="edu-school">
                    {item.institution}
                    {item.university ? ` · ${item.university}` : ''}
                  </p>
                  {item.description && <p className="edu-desc">{item.description}</p>}
                </article>
              </Reveal>
            ))}
          </div>

          <div className="certs-block">
            <Reveal>
              <div className="section-head" style={{ marginTop: '3rem' }}>
                <p className="eyebrow">Certifications</p>
                <h3 className="section-title">Credentials</h3>
                <p className="section-lead">
                  {certs.length
                    ? 'Professional certifications and learning credentials.'
                    : 'No certifications listed on the current resume. Add them anytime from the admin panel.'}
                </p>
              </div>
            </Reveal>

            {certs.length > 0 && (
              <div className="edu-list">
                {certs.map((cert, idx) => (
                  <Reveal key={cert._id || cert.title} delay={idx * 0.05}>
                    <article className="glass edu-card">
                      <p className="edu-dates">{cert.issueDate || 'Credential'}</p>
                      <h3>{cert.title}</h3>
                      <p className="edu-school">{cert.issuer}</p>
                      {cert.description && <p className="edu-desc">{cert.description}</p>}
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="edu-link"
                        >
                          View credential →
                        </a>
                      )}
                    </article>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );

  if (embedded) {
    return (
      <section id="education" className="section">
        {content}
      </section>
    );
  }

  return (
    <div className="page">
      <SEO title="Education" description="Education and certifications of Gokula Krishna A." />
      <section className="section">{content}</section>
    </div>
  );
}
