import { lazy, Suspense, useEffect, useState } from 'react';
import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import Spinner from '../../components/ui/Spinner';
import { getSkills } from '../../services/api';
import './Skills.css';

const SkillsCharts = lazy(() => import('../../components/sections/SkillsCharts'));

const fallbackSkills = [
  { name: 'JavaScript', category: 'Languages', level: 92 },
  { name: 'TypeScript', category: 'Languages', level: 85 },
  { name: 'PHP', category: 'Languages', level: 80 },
  { name: 'React.js', category: 'Frontend', level: 92 },
  { name: 'React Router', category: 'Frontend', level: 90 },
  { name: 'Redux', category: 'Frontend', level: 88 },
  { name: 'React Hook Form', category: 'Frontend', level: 86 },
  { name: 'Material UI', category: 'Frontend', level: 84 },
  { name: 'Node.js', category: 'Backend', level: 90 },
  { name: 'Express.js', category: 'Backend', level: 90 },
  { name: 'Sails.js', category: 'Backend', level: 78 },
  { name: 'Socket.io', category: 'Backend', level: 82 },
  { name: 'MongoDB', category: 'Databases', level: 88 },
  { name: 'MySQL', category: 'Databases', level: 84 },
  { name: 'REST API', category: 'API & Technologies', level: 92 },
  { name: 'GraphQL', category: 'API & Technologies', level: 75 },
  { name: 'Redis', category: 'API & Technologies', level: 80 },
  { name: 'Google Analytics', category: 'API & Technologies', level: 78 },
  { name: 'Google Indexing API', category: 'API & Technologies', level: 76 },
  { name: 'GIT / GitHub', category: 'Tools & Platforms', level: 90 },
  { name: 'SEO', category: 'Tools & Platforms', level: 85 },
  { name: 'AWS', category: 'Tools & Platforms', level: 72 },
  { name: 'Jira', category: 'Tools & Platforms', level: 80 },
  { name: 'VS Code', category: 'Tools & Platforms', level: 92 },
  { name: 'TablePlus', category: 'Tools & Platforms', level: 78 },
  { name: 'ChatGPT / Cursor AI / Perplexity', category: 'Tools & Platforms', level: 88 },
];

export default function Skills({ embedded = false }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then((res) => setSkills(res.data.data?.length ? res.data.data : fallbackSkills))
      .catch(() => setSkills(fallbackSkills))
      .finally(() => setLoading(false));
  }, []);

  const content = (
    <div className="container">
      <Reveal>
        <div className="section-head">
          <p className="eyebrow">Skills</p>
          <h2 className="section-title">A practical stack for shipping products.</h2>
          <p className="section-lead">
            Explore proficiency as interactive 3D charts and graphs — rotate, zoom, and filter by
            category.
          </p>
        </div>
      </Reveal>

      {loading ? (
        <Spinner />
      ) : (
        <Reveal delay={0.08}>
          <Suspense fallback={<Spinner label="Loading 3D charts..." />}>
            <SkillsCharts skills={skills} />
          </Suspense>
        </Reveal>
      )}
    </div>
  );

  if (embedded) {
    return (
      <section id="skills" className="section">
        {content}
      </section>
    );
  }

  return (
    <div className="page">
      <SEO
        title="Skills"
        description="Technical skills of Gokula Krishna A visualized as 3D charts across MERN, PHP, databases, and tooling."
      />
      <section className="section">{content}</section>
    </div>
  );
}
