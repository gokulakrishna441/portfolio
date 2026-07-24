export const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'education',
  'resume',
  'contact',
];

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export function scrollToSection(id, { updateHash = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (updateHash) {
    const url = id === 'home' ? '/' : `/#${id}`;
    window.history.replaceState(null, '', url);
  }
}
