import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { useInView } from '../hooks/useAnimations';
import './Expertise.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Expertise() {
  const { ref, inView } = useInView(0.08);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const { skills } = siteConfig;

  const connections = activeSkill ? skills.connections[activeSkill] : null;

  return (
    <section id="expertise" className="section expertise" ref={ref}>
      <div className="section-divider" />
      <div className="container">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          {skills.sectionLabel}
        </motion.span>

        <motion.h2
          className="section-headline"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          {skills.headline}
        </motion.h2>

        {/* Category tabs */}
        <motion.div
          className="expertise__tabs"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
        >
          {skills.categories.map((cat, i) => (
            <button
              key={cat.name}
              className={`expertise__tab font-mono ${activeCategory === i ? 'expertise__tab--active' : ''}`}
              style={{ '--cat-color': cat.color } as React.CSSProperties}
              onClick={() => { setActiveCategory(i); setActiveSkill(null); }}
            >
              <span className="expertise__tab-icon">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          className="expertise__content"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={3}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="expertise__skills-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {skills.categories[activeCategory].items.map((skill, i) => (
                <motion.button
                  key={skill}
                  className={`expertise__skill glass-card ${activeSkill === skill ? 'expertise__skill--active' : ''}`}
                  style={{ '--cat-color': skills.categories[activeCategory].color } as React.CSSProperties}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  onClick={() => setActiveSkill(activeSkill === skill ? null : skill)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <span className="expertise__skill-name">{skill}</span>
                  <span className="expertise__skill-dot" />
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Connection path */}
          <AnimatePresence>
            {connections && (
              <motion.div
                className="expertise__connections"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="expertise__connection-path font-mono">
                  <span className="expertise__connection-node" style={{ color: skills.categories[activeCategory].color }}>
                    {activeSkill}
                  </span>
                  {connections.map((step, i) => (
                    <span key={i} className="expertise__connection-step">
                      <span className="expertise__connection-arrow">→</span>
                      <span>{step}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Visual — interconnected dots */}
        <motion.div
          className="expertise__visual"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={4}
        >
          <div className="expertise__constellation">
            {skills.categories.map((cat, ci) => (
              <div key={cat.name} className="expertise__constellation-cluster" data-index={ci}>
                {cat.items.slice(0, 4).map((skill, si) => (
                  <div
                    key={skill}
                    className="expertise__constellation-node"
                    style={{
                      '--node-color': cat.color,
                      '--delay': `${si * 0.2}s`,
                      left: `${25 + ci * 18 + Math.sin(si * 1.2) * 8}%`,
                      top: `${20 + Math.cos(ci * 1.5 + si * 0.8) * 30 + si * 12}%`,
                    } as React.CSSProperties}
                  >
                    <span className="expertise__constellation-dot" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
