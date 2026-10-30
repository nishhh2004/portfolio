import { motion } from 'framer-motion';
import NeuralScene from './NeuralScene';
import { siteConfig } from '../config/siteConfig';
import { scrollToSection } from '../hooks/useAnimations';
import './Hero.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-label="Hero section">
      <NeuralScene />

      <div className="hero__overlay" />

      <div className="hero__content container">
        {/* Status */}
        <motion.div
          className="hero__status font-mono"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="hero__status-dot" />
          {siteConfig.availability}
        </motion.div>

        {/* Name */}
        <motion.p
          className="hero__name font-heading"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.5}
        >
          {siteConfig.name}
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="hero__headline font-heading"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {siteConfig.tagline.split('\n').map((line, i) => (
            <span key={i} className="hero__headline-line">
              {line}
              {i === 0 && <br />}
            </span>
          ))}
        </motion.h1>

        {/* Role */}
        <motion.p
          className="hero__role font-mono"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {siteConfig.role}
        </motion.p>

        {/* Description */}
        <motion.p
          className="hero__description"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.5}
        >
          {siteConfig.heroDescription}
        </motion.p>

        {/* Actions */}
        <motion.div
          className="hero__actions"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <button
            className="btn-primary btn-primary--cyan"
            onClick={() => scrollToSection('#projects')}
          >
            EXPLORE MY WORK
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
          <button
            className="btn-primary btn-primary--outline"
            onClick={() => scrollToSection('#contact')}
          >
            LET'S CONNECT
          </button>
        </motion.div>

        {/* Bottom scroll indicator */}
        <motion.div
          className="hero__scroll-cta"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <button
            className="hero__scroll-btn font-mono"
            onClick={() => scrollToSection('#about')}
          >
            ENTER THE DATA UNIVERSE ↗
          </button>
          <div className="hero__scroll-line">
            <motion.div
              className="hero__scroll-progress"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Tech annotations */}
      <div className="hero__annotations font-mono">
        <span className="hero__annotation hero__annotation--tl">SYS: NEURAL_NET_v2.1</span>
        <span className="hero__annotation hero__annotation--tr">NODES: 800 · ACTIVE</span>
        <span className="hero__annotation hero__annotation--bl">COORD: 12.97°N 77.59°E</span>
        <span className="hero__annotation hero__annotation--br">STATUS: EXPLORING</span>
      </div>
    </section>
  );
}
