import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import Spinner from '../../components/ui/Spinner';
import { getProject } from '../../services/api';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getProject(slug)
      .then((res) => setProject(res.data.data))
      .catch(() => setError('Project not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Spinner />;

  if (error || !project) {
    return (
      <div className="page section">
        <div className="container">
          <h1 className="section-title">Project not found</h1>
          <Link to="/#projects" className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <SEO title={project.title} description={project.shortDescription} />
      <section className="section">
        <div className="container project-detail">
          <Reveal>
            <Link to="/#projects" className="back-link">
              ← Projects
            </Link>
            <p className="eyebrow">{project.category}</p>
            <h1 className="section-title">{project.title}</h1>
            <p className="section-lead">{project.description || project.shortDescription}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="glass project-detail__panel">
              <h2>Tech stack</h2>
              <div className="chip-row">
                {(project.techStack || []).map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
              {project.features?.length > 0 && (
                <>
                  <h2>Highlights</h2>
                  <ul>
                    {project.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </>
              )}
              <div className="btn-group">
                {project.liveUrl && (
                  <a href={project.liveUrl} className="btn btn-primary" target="_blank" rel="noreferrer">
                    Live demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className="btn btn-ghost" target="_blank" rel="noreferrer">
                    Source
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
