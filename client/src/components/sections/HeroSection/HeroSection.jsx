import { motion } from 'framer-motion';
import profileImg from '../../../assets/profile.png';
import { scrollToSection } from '../../../utils/scroll';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section id="home" className="hero">
      <div className="hero__media">
        <motion.img
          src={profileImg}
          alt="Gokula Krishna A professional portrait"
          className="hero__photo"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="hero__veil" />
      </div>

      <div className="container hero__content">
        <motion.p
          className="hero__brand"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Gokula Krishna A
        </motion.p>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
        >
          MERN Stack Developer
        </motion.h1>
        <motion.p
          className="hero__lead"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Building elegant full-stack products with React, Node.js, and MongoDB — from dashboards to
          ERP workflows.
        </motion.p>
        <motion.div
          className="btn-group"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.52 }}
        >
          <button type="button" className="btn btn-primary" onClick={() => scrollToSection('projects')}>
            View projects
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => scrollToSection('contact')}>
            Get in touch
          </button>
        </motion.div>
        <motion.button
          type="button"
          className="hero__scroll"
          onClick={() => scrollToSection('about')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          aria-label="Scroll to about section"
        >
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </motion.button>
      </div>
    </section>
  );
}
