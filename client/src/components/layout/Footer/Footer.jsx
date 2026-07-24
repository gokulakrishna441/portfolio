import { Link, useLocation } from 'react-router-dom';
import { scrollToSection } from '../../../utils/scroll';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const onHome = location.pathname === '/';

  const goContact = (e) => {
    if (!onHome) return;
    e.preventDefault();
    scrollToSection('contact');
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__brand">Gokula Krishna A</p>
          <p className="footer__tag">MERN Stack Developer · Coimbatore</p>
        </div>
        <div className="footer__links">
          <a href="mailto:gokulakrishna441@gmail.com">Email</a>
          <a
            href="https://www.linkedin.com/in/gokula-krishna-2b0984229"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <Link to="/#contact" onClick={goContact}>
            Contact
          </Link>
          <Link to="/admin">Admin</Link>
        </div>
        <p className="footer__copy">© {year} Gokula Krishna A. All rights reserved.</p>
      </div>
    </footer>
  );
}
