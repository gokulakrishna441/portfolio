import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import SEO from '../../../components/common/SEO';
import Spinner from '../../../components/ui/Spinner';
import { admin } from '../../../services/api';
import '../styles/Admin.css';

const emptyProject = {
  title: '',
  shortDescription: '',
  description: '',
  techStack: '',
  category: 'Full Stack',
  featured: false,
  isPublished: true,
};

const emptySkill = { name: '', category: 'Languages', level: 80 };
const emptyExp = {
  company: '',
  role: '',
  location: '',
  startDate: '',
  endDate: 'Present',
  description: '',
  technologies: '',
};

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [tab, setTab] = useState('projects');
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [messages, setMessages] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [skillForm, setSkillForm] = useState(emptySkill);
  const [expForm, setExpForm] = useState(emptyExp);
  const [status, setStatus] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const [p, s, e, m] = await Promise.all([
        admin.projects.list(),
        admin.skills.list(),
        admin.experience.list(),
        admin.messages.list(),
      ]);
      setProjects(p.data.data || []);
      setSkills(s.data.data || []);
      setExperience(e.data.data || []);
      setMessages(m.data.data || []);
    } catch {
      setStatus('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    await admin.projects.create({
      ...projectForm,
      techStack: projectForm.techStack.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setProjectForm(emptyProject);
    setStatus('Project created');
    load();
  };

  const removeProject = async (id) => {
    await admin.projects.remove(id);
    setStatus('Project deleted');
    load();
  };

  const createSkill = async (e) => {
    e.preventDefault();
    await admin.skills.create(skillForm);
    setSkillForm(emptySkill);
    setStatus('Skill created');
    load();
  };

  const removeSkill = async (id) => {
    await admin.skills.remove(id);
    setStatus('Skill deleted');
    load();
  };

  const createExp = async (e) => {
    e.preventDefault();
    await admin.experience.create({
      ...expForm,
      description: expForm.description.split('\n').map((d) => d.trim()).filter(Boolean),
      technologies: expForm.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setExpForm(emptyExp);
    setStatus('Experience created');
    load();
  };

  const removeExp = async (id) => {
    await admin.experience.remove(id);
    setStatus('Experience deleted');
    load();
  };

  const uploadResume = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await admin.resume.upload(file);
    setStatus('Resume uploaded');
  };

  if (loading) return <Spinner label="Loading admin..." />;

  return (
    <div className="admin-shell">
      <SEO title="Admin Dashboard" />
      <aside className="admin-side glass">
        <p className="eyebrow">Admin</p>
        <h1>Dashboard</h1>
        <p className="admin-user">{user?.email}</p>
        <nav>
          {['projects', 'skills', 'experience', 'resume', 'messages'].map((t) => (
            <button
              key={t}
              type="button"
              className={tab === t ? 'is-active' : ''}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>
        <div className="admin-side__foot">
          <Link to="/">View site</Link>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {status && <p className="admin-status">{status}</p>}

        {tab === 'projects' && (
          <section className="admin-panel glass">
            <h2>Projects</h2>
            <form className="admin-form" onSubmit={createProject}>
              <input
                placeholder="Title"
                value={projectForm.title}
                onChange={(e) => setProjectForm((f) => ({ ...f, title: e.target.value }))}
                required
              />
              <input
                placeholder="Short description"
                value={projectForm.shortDescription}
                onChange={(e) => setProjectForm((f) => ({ ...f, shortDescription: e.target.value }))}
                required
              />
              <textarea
                placeholder="Full description"
                value={projectForm.description}
                onChange={(e) => setProjectForm((f) => ({ ...f, description: e.target.value }))}
                required
              />
              <input
                placeholder="Tech stack (comma separated)"
                value={projectForm.techStack}
                onChange={(e) => setProjectForm((f) => ({ ...f, techStack: e.target.value }))}
              />
              <select
                value={projectForm.category}
                onChange={(e) => setProjectForm((f) => ({ ...f, category: e.target.value }))}
              >
                {['Full Stack', 'Frontend', 'Backend', 'ERP', 'Other'].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <button className="btn btn-primary" type="submit">
                Add project
              </button>
            </form>
            <ul className="admin-list">
              {projects.map((p) => (
                <li key={p._id}>
                  <div>
                    <strong>{p.title}</strong>
                    <span>{p.category}</span>
                  </div>
                  <button type="button" onClick={() => removeProject(p._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'skills' && (
          <section className="admin-panel glass">
            <h2>Skills</h2>
            <form className="admin-form" onSubmit={createSkill}>
              <input
                placeholder="Skill name"
                value={skillForm.name}
                onChange={(e) => setSkillForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
              <select
                value={skillForm.category}
                onChange={(e) => setSkillForm((f) => ({ ...f, category: e.target.value }))}
              >
                {['Languages', 'Frontend', 'Backend', 'Databases', 'API & Technologies', 'Tools & Platforms'].map(
                  (c) => (
                    <option key={c}>{c}</option>
                  )
                )}
              </select>
              <input
                type="number"
                min="1"
                max="100"
                value={skillForm.level}
                onChange={(e) => setSkillForm((f) => ({ ...f, level: Number(e.target.value) }))}
              />
              <button className="btn btn-primary" type="submit">
                Add skill
              </button>
            </form>
            <ul className="admin-list">
              {skills.map((s) => (
                <li key={s._id}>
                  <div>
                    <strong>{s.name}</strong>
                    <span>
                      {s.category} · {s.level}%
                    </span>
                  </div>
                  <button type="button" onClick={() => removeSkill(s._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'experience' && (
          <section className="admin-panel glass">
            <h2>Experience</h2>
            <form className="admin-form" onSubmit={createExp}>
              <input
                placeholder="Company"
                value={expForm.company}
                onChange={(e) => setExpForm((f) => ({ ...f, company: e.target.value }))}
                required
              />
              <input
                placeholder="Role"
                value={expForm.role}
                onChange={(e) => setExpForm((f) => ({ ...f, role: e.target.value }))}
                required
              />
              <input
                placeholder="Location"
                value={expForm.location}
                onChange={(e) => setExpForm((f) => ({ ...f, location: e.target.value }))}
              />
              <input
                placeholder="Start date"
                value={expForm.startDate}
                onChange={(e) => setExpForm((f) => ({ ...f, startDate: e.target.value }))}
                required
              />
              <input
                placeholder="End date"
                value={expForm.endDate}
                onChange={(e) => setExpForm((f) => ({ ...f, endDate: e.target.value }))}
              />
              <textarea
                placeholder="Bullet points (one per line)"
                value={expForm.description}
                onChange={(e) => setExpForm((f) => ({ ...f, description: e.target.value }))}
              />
              <input
                placeholder="Technologies (comma separated)"
                value={expForm.technologies}
                onChange={(e) => setExpForm((f) => ({ ...f, technologies: e.target.value }))}
              />
              <button className="btn btn-primary" type="submit">
                Add experience
              </button>
            </form>
            <ul className="admin-list">
              {experience.map((exp) => (
                <li key={exp._id}>
                  <div>
                    <strong>
                      {exp.role} @ {exp.company}
                    </strong>
                    <span>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <button type="button" onClick={() => removeExp(exp._id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tab === 'resume' && (
          <section className="admin-panel glass">
            <h2>Resume upload</h2>
            <p>Upload a PDF/DOC resume. It becomes the active downloadable file.</p>
            <input type="file" accept=".pdf,.doc,.docx" onChange={uploadResume} />
          </section>
        )}

        {tab === 'messages' && (
          <section className="admin-panel glass">
            <h2>Contact messages</h2>
            <ul className="admin-list">
              {messages.map((msg) => (
                <li key={msg._id} className="admin-message">
                  <div>
                    <strong>
                      {msg.name} · {msg.subject}
                    </strong>
                    <span>{msg.email}</span>
                    <p>{msg.message}</p>
                  </div>
                  {!msg.isRead && (
                    <button
                      type="button"
                      onClick={async () => {
                        await admin.messages.markRead(msg._id);
                        load();
                      }}
                    >
                      Mark read
                    </button>
                  )}
                </li>
              ))}
              {messages.length === 0 && <li>No messages yet.</li>}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
