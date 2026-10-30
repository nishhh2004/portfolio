import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { useInView } from '../hooks/useAnimations';
import './Experience.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Experience() {
  const { ref, inView } = useInView(0.1);
  const { experience } = siteConfig;

  return (
    <section id="experience" className="section experience" ref={ref}>
      <div className="section-divider" />
      <div className="container">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          {experience.sectionLabel}
        </motion.span>

        <motion.h2
          className="section-headline"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          THE JOURNEY SO FAR.
        </motion.h2>

        <div className="experience__timeline">
          {experience.items.map((item, i) => (
            <motion.div
              key={i}
              className={`experience__item experience__item--${item.type}`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={2 + i}
            >
              <div className="experience__connector">
                <div className="experience__dot" />
                {i < experience.items.length - 1 && <div className="experience__line" />}
              </div>
              <div className="experience__content glass-card">
                <div className="experience__badge font-mono">
                  {item.type === 'education' ? '🎓 EDUCATION' : '💼 EXPERIENCE'}
                </div>
                <h3 className="experience__title font-heading">{item.title}</h3>
                <p className="experience__org">{item.organization}</p>
                <p className="experience__period font-mono">{item.period}</p>
                <p className="experience__desc">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
