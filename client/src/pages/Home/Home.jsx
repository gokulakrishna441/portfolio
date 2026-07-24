import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO';
import Reveal from '../../components/animations/Reveal';
import profileImg from '../../assets/profile.png';
import './Home.css';

export default function Home() {
  return (
    <div className="page home">
      <SEO
        title="Gokula Krishna A | MERN Stack Developer"
        description="MERN Stack Developer in Coimbatore building full-stack apps, dashboards, admin portals, and ERP workflows."
      />

      <section className="hero">
        <div className="hero__media" aria-hidden="false">
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
            Building elegant full-stack products with React, Node.js, and MongoDB — from dashboards
            to ERP workflows.
          </motion.p>
          <motion.div
            className="btn-group"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52 }}
          >
            <Link to="/projects" className="btn btn-primary">
              View projects
            </Link>
            <Link to="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section home-intro">
        <div className="container grid-2">
          <Reveal>
            <p className="eyebrow">Introduction</p>
            <h2 className="section-title">Full-stack craft with recruiter-ready clarity.</h2>
            <p className="section-lead">
              Based in Coimbatore, I ship modular MERN applications, reusable React systems, REST
              APIs, MongoDB schemas, and JWT-secured admin experiences. Currently programming at
              eNova Software And Hardware Solutions.
            </p>
            <div className="btn-group" style={{ marginTop: '1.5rem' }}>
              <Link to="/about" className="btn btn-primary">
                About me
              </Link>
              <Link to="/resume" className="btn btn-ghost">
                Download resume
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass home-intro__card">
              <div className="home-stat">
                <strong>3+</strong>
                <span>Years building web products</span>
              </div>
              <div className="home-stat">
                <strong>4</strong>
                <span>Featured product deliveries</span>
              </div>
              <div className="home-stat">
                <strong>MERN</strong>
                <span>React · Node · Express · MongoDB</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
