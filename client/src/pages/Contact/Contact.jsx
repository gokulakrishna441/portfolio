import { useState } from 'react';
import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import { submitContact } from '../../services/api';
import './Contact.css';

const socials = [
  { label: 'Email', href: 'mailto:gokulakrishna441@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gokula-krishna-2b0984229' },
  { label: 'Phone', href: 'tel:+916379185957' },
];

export default function Contact({ embedded = false }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', text: '' });
  const [sending, setSending] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', text: '' });
    try {
      await submitContact(form);
      setStatus({ type: 'success', text: 'Message sent. I will get back to you soon.' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.response?.data?.message || 'Could not send message. Please try email directly.',
      });
    } finally {
      setSending(false);
    }
  };

  const content = (
    <div className="container contact-grid">
      <Reveal>
        <div className="section-head">
          <p className="eyebrow">Contact</p>
          <h2 className="section-title">Let’s build something solid.</h2>
          <p className="section-lead">
            Open to full-time roles and meaningful product work. Prefer email or LinkedIn for the
            fastest reply.
          </p>
        </div>
        <ul className="contact-socials">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <form className="glass contact-form" onSubmit={onSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" value={form.name} onChange={onChange} required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={form.subject} onChange={onChange} required />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={form.message}
              onChange={onChange}
              required
            />
          </div>
          {status.text && (
            <p className={`form-status form-status--${status.type}`} role="status">
              {status.text}
            </p>
          )}
          <button className="btn btn-primary" type="submit" disabled={sending}>
            {sending ? 'Sending...' : 'Send message'}
          </button>
        </form>
      </Reveal>
    </div>
  );

  if (embedded) {
    return (
      <section id="contact" className="section">
        {content}
      </section>
    );
  }

  return (
    <div className="page">
      <SEO title="Contact" description="Contact Gokula Krishna A for opportunities and collaborations." />
      <section className="section">{content}</section>
    </div>
  );
}
