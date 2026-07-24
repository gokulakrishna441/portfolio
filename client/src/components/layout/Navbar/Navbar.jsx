import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useScrollSpy } from '../../../hooks';
import { NAV_LINKS, SECTION_IDS, scrollToSection } from '../../../utils/scroll';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const sectionIds = useMemo(() => SECTION_IDS, []);
  const activeId = useScrollSpy(sectionIds, 90);
  const onHome = location.pathname === '/';

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goToSection = (id) => {
    setOpen(false);
    if (onHome) {
      scrollToSection(id);
      return;
    }
    navigate(id === 'home' ? '/' : `/#${id}`);
  };

  return (
    <header className={`navbar ${scrolled || !onHome ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link
          to="/"
          className="navbar__brand"
          aria-label="Gokula Krishna home"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              scrollToSection('home');
            }
          }}
        >
          <span className="navbar__mark">GK</span>
          <span className="navbar__name">Gokula Krishna</span>
        </Link>

        <nav className={`navbar__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const isActive = onHome ? activeId === link.id : false;
            return (
              <button
                key={link.id}
                type="button"
                className={`navbar__link ${isActive ? 'is-active' : ''}`}
                onClick={() => goToSection(link.id)}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            className={`navbar__toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
