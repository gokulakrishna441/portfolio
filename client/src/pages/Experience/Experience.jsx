import { useEffect, useState } from 'react';
import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import Spinner from '../../components/ui/Spinner';
import { getExperience } from '../../services/api';
import './Experience.css';

const fallback = [
  {
    company: 'eNova Software And Hardware Solutions',
    role: 'Programmer',
    location: 'Coimbatore, Tamil Nadu',
    startDate: 'March 2026',
    endDate: 'Present',
    description: [
      'Developed course registration, faculty allocation, and student enrollment management features.',
      'Collaborated with cross-functional teams to deliver new features, perform code reviews, and maintain application stability.',
      'Worked extensively with REST APIs, MySQL, PHP (CodeIgniter CI4), JavaScript, jQuery, and Bootstrap.',
    ],
    technologies: ['PHP', 'CodeIgniter CI4', 'MySQL', 'JavaScript'],
  },
  {
    company: 'App Innovation Technologies',
    role: 'MERN Stack Developer',
    location: 'Coimbatore, Tamil Nadu',
    startDate: 'June 2023',
    endDate: 'August 2025',
    description: [
      'Built full-stack MERN applications with modular architecture & REST APIs.',
      'Built features including dynamic dashboards, admin portals, and user-driven analytics modules.',
      'Developed reusable React.js components, Redux state management, and React Router.',
      'Designed MongoDB schemas, aggregation pipelines & JWT authentication.',
      'Integrated Stripe & Google Analytics; optimized SEO with SSR where required.',
    ],
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Redux', 'JWT'],
  },
  {
    company: 'Sai Techno Solutions',
    role: 'Web Developer',
    location: 'Coimbatore, Tamil Nadu',
    startDate: 'June 2022',
    endDate: 'March 2023',
    description: [
      'Built static web pages with HTML/CSS; contributed to minor frontend updates.',
      'Built accessible and SEO-friendly web layouts with semantic HTML.',
    ],
    technologies: ['HTML', 'CSS', 'SEO'],
  },
  {
    company: 'Besant Technologies',
    role: 'Intern',
    location: 'Bengaluru, Tamil Nadu',
    startDate: 'November 2022',
    endDate: 'April 2022',
    description: [
      'Developed full-stack web applications using JavaScript, React.js, Node.js, Express.js, and MongoDB.',
    ],
    technologies: ['MERN'],
  },
];

export default function Experience({ embedded = false }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperience()
      .then((res) => setItems(res.data.data?.length ? res.data.data : fallback))
      .catch(() => setItems(fallback))
      .finally(() => setLoading(false));
  }, []);

  const content = (
    <div className="container">
      <Reveal>
        <div className="section-head">
          <p className="eyebrow">Experience</p>
          <h2 className="section-title">Career timeline</h2>
          <p className="section-lead">Roles spanning MERN product engineering, ERP modules, and web development.</p>
        </div>
      </Reveal>

      {loading ? (
        <Spinner />
      ) : (
        <div className="timeline">
          {items.map((job, idx) => (
            <Reveal key={job._id || job.company} delay={idx * 0.06}>
              <article className="timeline__item glass">
                <div className="timeline__meta">
                  <p className="timeline__dates">
                    {job.startDate} — {job.endDate}
                  </p>
                  <h3>{job.role}</h3>
                  <p className="timeline__company">
                    {job.company}
                    {job.location ? ` · ${job.location}` : ''}
                  </p>
                </div>
                <ul className="timeline__points">
                  {(job.description || []).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {job.technologies?.length > 0 && (
                  <div className="chip-row">
                    {job.technologies.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );

  if (embedded) {
    return (
      <section id="experience" className="section">
        {content}
      </section>
    );
  }

  return (
    <div className="page">
      <SEO title="Experience" description="Professional experience of Gokula Krishna A across MERN and ERP roles." />
      <section className="section">{content}</section>
    </div>
  );
}
