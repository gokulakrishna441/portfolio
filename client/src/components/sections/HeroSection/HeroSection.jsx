import { motion, useReducedMotion } from 'framer-motion';
import profileImg from '../../../assets/profile.png';
import { scrollToSection } from '../../../utils/scroll';
import './HeroSection.css';

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export default function HeroSection() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="hero">
      <div className="hero__media">
        <motion.img
          src={profileImg}
          alt="Gokula Krishna A professional portrait"
          className="hero__photo"
          initial={reduce ? false : { opacity: 0, scale: 1.08 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.35, ease: EASE }}
        />
        <div className="hero__veil" />
        {!reduce && (
          <>
            <span className="hero__glow hero__glow--a" aria-hidden="true" />
            <span className="hero__glow hero__glow--b" aria-hidden="true" />
          </>
        )}
      </div>

      <motion.div
        className="container hero__content"
        variants={reduce ? undefined : container}
        initial={reduce ? false : 'hidden'}
        animate={reduce ? undefined : 'show'}
      >
        <motion.p className="hero__brand" variants={reduce ? undefined : fadeUp}>
          Gokula Krishna A
        </motion.p>
        <motion.h1 className="hero__title" variants={reduce ? undefined : fadeUp}>
          <span className="hero__title-text">MERN Stack Developer</span>
        </motion.h1>
        <motion.p className="hero__lead" variants={reduce ? undefined : fadeUp}>
          Building elegant full-stack products with React, Node.js, and MongoDB — from dashboards to
          ERP workflows.
        </motion.p>
        <motion.div className="btn-group" variants={reduce ? undefined : fadeUp}>
          <motion.button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToSection('projects')}
            whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            View projects
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-ghost"
            onClick={() => scrollToSection('contact')}
            whileHover={reduce ? undefined : { y: -3, scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
          >
            Get in touch
          </motion.button>
        </motion.div>
        <motion.button
          type="button"
          className="hero__scroll"
          onClick={() => scrollToSection('about')}
          variants={reduce ? undefined : fadeUp}
          aria-label="Scroll to about section"
        >
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </motion.button>
      </motion.div>
    </section>
  );
}
