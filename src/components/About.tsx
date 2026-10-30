import { useState } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { useInView } from '../hooks/useAnimations';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function About() {
  const { ref, inView } = useInView(0.1);
  const [activeStage, setActiveStage] = useState(-1);
  const { about } = siteConfig;

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="section-divider" />
      <div className="container">
        {/* Section Header */}
        <div className="about__header">
          <motion.span
            className="section-label"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={0}
          >
            {about.sectionLabel}
          </motion.span>

          <motion.h2
            className="section-headline"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            {about.headline}
          </motion.h2>
        </div>

        {/* Main Content Grid */}
        <div className="about__grid">
          {/* Left Column: Premium Profile Card */}
          <motion.div
            className="about__portrait-col"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={2}
          >
            <div className="about-profile-card">
              {/* Subtle Cyan and Purple Ambient Glow */}
              <div className="about-profile-card__ambient-cyan" />
              <div className="about-profile-card__ambient-purple" />

              {/* Glassmorphic Card Container */}
              <div className="about-profile-card__container">
                {/* Subtle Animated Corner Accents */}
                <span className="about-profile-card__corner about-profile-card__corner--tl" />
                <span className="about-profile-card__corner about-profile-card__corner--tr" />
                <span className="about-profile-card__corner about-profile-card__corner--bl" />
                <span className="about-profile-card__corner about-profile-card__corner--br" />

                {/* Status Bar */}
                <div className="about-profile-card__status-bar font-mono">
                  <span className="about-profile-card__status-dot" />
                  <span className="about-profile-card__status-text">AVAILABLE // 2026 GRADUATE</span>
                </div>

                {/* Refined Image Viewport */}
                <div className="about-profile-card__image-viewport">
                  <img
                    src="/profile.jpg"
                    alt="Nishanth M S — Data Analytics & AI Engineer"
                    className="about-profile-card__img"
                    loading="lazy"
                  />
                  {/* Subtle blend to dark background */}
                  <div className="about-profile-card__bottom-blend" />
                </div>

                {/* Identity Footnote */}
                <div className="about-profile-card__footer">
                  <div className="about-profile-card__name font-heading">NISHANTH M S</div>
                  <div className="about-profile-card__role font-mono">DATA ANALYTICS · MACHINE LEARNING</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative, Philosophy Pipeline & Terminal */}
          <div className="about__content-col">
            <div className="about__paragraphs">
              {about.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  className="about__paragraph"
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  custom={2.5 + i * 0.3}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Journey pipeline */}
            <motion.div
              className="about__pipeline-wrap"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={3.5}
            >
              <span className="about__pipeline-title font-mono">WORKING PHILOSOPHY:</span>
              <div className="about__pipeline">
                {about.journey.map((stage, i) => (
                  <div
                    key={stage}
                    className={`about__stage ${activeStage >= i ? 'about__stage--active' : ''}`}
                    onMouseEnter={() => setActiveStage(i)}
                    onMouseLeave={() => setActiveStage(-1)}
                  >
                    <div className="about__stage-dot" />
                    <span className="about__stage-label font-mono">{stage}</span>
                    {i < about.journey.length - 1 && (
                      <div
                        className={`about__stage-connector ${
                          activeStage >= i + 1 ? 'about__stage-connector--active' : ''
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Terminal */}
            <motion.div
              className="about__terminal glass-card"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={4}
            >
              <div className="about__terminal-header">
                <span className="about__terminal-dot" style={{ background: '#FF5F57' }} />
                <span className="about__terminal-dot" style={{ background: '#FEBC2E' }} />
                <span className="about__terminal-dot" style={{ background: '#28C840' }} />
                <span className="about__terminal-title font-mono">identity.sh</span>
              </div>
              <div className="about__terminal-body font-mono">
                <div className="about__terminal-line">
                  <span className="about__terminal-prompt">$</span> whoami
                </div>
                <div className="about__terminal-output">Nishanth M S</div>

                <div className="about__terminal-line">
                  <span className="about__terminal-prompt">$</span> interests
                </div>
                <div className="about__terminal-output">Data Analytics | Machine Learning | AI Engineering</div>

                <div className="about__terminal-line">
                  <span className="about__terminal-prompt">$</span> philosophy
                </div>
                <div className="about__terminal-output">
                  Understand the data.<br />
                  Question the assumptions.<br />
                  Build something useful.
                </div>

                <div className="about__terminal-line about__terminal-cursor">
                  <span className="about__terminal-prompt">$</span>
                  <span className="about__cursor">▊</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
