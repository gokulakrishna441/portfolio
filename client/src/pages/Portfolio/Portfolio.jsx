import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import DepthField from '../../components/animations/DepthField';
import HeroSection from '../../components/sections/HeroSection';
import IntroSection from '../../components/sections/IntroSection';
import About from '../About';
import Skills from '../Skills';
import Experience from '../Experience';
import Projects from '../Projects';
import Education from '../Education';
import Resume from '../Resume';
import Contact from '../Contact';
import { scrollToSection } from '../../utils/scroll';
import './Portfolio.css';

export default function Portfolio() {
  const location = useLocation();
  const hash = useMemo(() => location.hash.replace('#', ''), [location.hash]);

  useEffect(() => {
    if (!hash) return undefined;
    const timer = setTimeout(() => scrollToSection(hash, { updateHash: false }), 120);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="portfolio-page">
      <SEO
        title="Gokula Krishna A | MERN Stack Developer"
        description="MERN Stack Developer in Coimbatore building full-stack apps, dashboards, admin portals, and ERP workflows."
      />
      <DepthField />
      <HeroSection />
      <IntroSection />
      <About embedded />
      <Skills embedded />
      <Experience embedded />
      <Projects embedded />
      <Education embedded />
      <Resume embedded />
      <Contact embedded />
    </div>
  );
}
