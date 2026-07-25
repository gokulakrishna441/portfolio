import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import { AnimatePresence, motion } from 'framer-motion';
import Reveal, { Stagger, StaggerItem } from '../../components/animations/Reveal';
import Spinner from '../../components/ui/Spinner';
import { getProjects } from '../../services/api';
import './Projects.css';

const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'ERP', 'Other'];

const fallback = [
  {
    _id: '1',
    title: 'Teemie – Scheduling & Payroll App',
    slug: 'teemie',
    shortDescription:
      'Roster management UI, REST APIs, real-time notifications, and secure role-based access.',
    techStack: ['React.js', 'Node.js', 'Express', 'Socket.io'],
    category: 'Full Stack',
    featured: true,
  },
  {
    _id: '2',
    title: 'InstantRo – Automotive Platform',
    slug: 'instantro',
    shortDescription:
      'Backend workflows, ScraperAPI integration, React dashboards, and Redis-optimized data ops.',
    techStack: ['Node.js', 'React.js', 'Redis', 'PHP'],
    category: 'Full Stack',
    featured: true,
  },
  {
    _id: '3',
    title: 'Footprints – Retail Media Network',
    slug: 'footprints',
    shortDescription:
      'Campaign management modules, shopper analytics APIs, and retailer admin interfaces.',
    techStack: ['React.js', 'REST APIs'],
    category: 'Frontend',
    featured: true,
  },
  {
    _id: '4',
    title: 'eNova ERP Product – University ERP',
    slug: 'enova-erp',
    shortDescription: 'ERP modules for student, faculty, and administrative workflows.',
    techStack: ['PHP', 'CodeIgniter', 'MySQL'],
    category: 'ERP',
    featured: false,
  },
];

export default function Projects({ embedded = false }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    setLoading(true);
    getProjects({
      q: query || undefined,
      category: category === 'All' ? undefined : category,
    })
      .then((res) => setProjects(res.data.data?.length ? res.data.data : fallback))
      .catch(() => {
        const filtered = fallback.filter((p) => {
          const matchCat = category === 'All' || p.category === category;
          const q = query.toLowerCase();
          const matchQ =
            !q ||
            p.title.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q) ||
            p.techStack.some((t) => t.toLowerCase().includes(q));
          return matchCat && matchQ;
        });
        setProjects(filtered);
      })
      .finally(() => setLoading(false));
  }, [query, category]);

  const countLabel = useMemo(
    () => `${projects.length} project${projects.length === 1 ? '' : 's'}`,
    [projects]
  );

  const content = (
    <div className="container">
      <Reveal>
        <div className="section-head">
          <p className="eyebrow">Projects</p>
          <h2 className="section-title">Selected work</h2>
          <p className="section-lead">
            Search and filter product work across scheduling, automotive, retail media, and ERP.
          </p>
        </div>
      </Reveal>

      <div className="projects-toolbar glass">
        <label className="sr-only" htmlFor="project-search">
          Search projects
        </label>
        <input
          id="project-search"
          type="search"
          placeholder="Search by name, stack, or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="filter-row" role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              className={`filter-chip ${category === cat ? 'is-active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="projects-count">{countLabel}</p>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <Stagger className="projects-grid" stagger={0.07}>
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <StaggerItem key={project._id || project.slug} direction="scale">
                <motion.article
                  className="glass project-card"
                  layout
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                >
                  <div className="project-card__top">
                    <span className="project-card__cat">{project.category}</span>
                    {project.featured && <span className="project-card__feat">Featured</span>}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                  <div className="chip-row">
                    {(project.techStack || []).slice(0, 5).map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link to={`/projects/${project.slug || project._id}`} className="project-card__link">
                    View details →
                  </Link>
                </motion.article>
              </StaggerItem>
            ))}
          </AnimatePresence>
        </Stagger>
      )}

      {!loading && projects.length === 0 && (
        <p className="empty-state">No projects match your filters.</p>
      )}
    </div>
  );

  if (embedded) {
    return (
      <section id="projects" className="section">
        {content}
      </section>
    );
  }

  return (
    <div className="page">
      <SEO
        title="Projects"
        description="Selected projects by Gokula Krishna A — Teemie, InstantRo, Footprints, eNova ERP."
      />
      <section className="section">{content}</section>
    </div>
  );
}
