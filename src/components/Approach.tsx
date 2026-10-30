import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { useInView } from '../hooks/useAnimations';
import './Approach.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Approach() {
  const { ref, inView } = useInView(0.1);
  const { approach } = siteConfig;

  return (
    <section className="section approach" ref={ref}>
      <div className="section-divider" />
      <div className="container">
        <motion.h2
          className="section-headline"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          {approach.headline}
        </motion.h2>

        <div className="approach__steps">
          {approach.steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="approach__step"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={1 + i}
            >
              <div className="approach__step-header">
                <span className="approach__step-number font-mono">{step.number}</span>
                <div className="approach__step-line" />
              </div>
              <h3 className="approach__step-title font-heading">{step.title}</h3>
              <p className="approach__step-desc">{step.description}</p>

              {/* Visual transformation dots */}
              <div className="approach__step-visual">
                {Array.from({ length: 5 }).map((_, di) => (
                  <div
                    key={di}
                    className="approach__particle"
                    style={{
                      '--particle-delay': `${di * 0.15 + i * 0.3}s`,
                      '--particle-x': `${Math.random() * 60 - 30}%`,
                      '--particle-y': `${Math.random() * 60 - 30}%`,
                      '--final-x': `${(di - 2) * 15}%`,
                      left: `${20 + di * 15}%`,
                      top: `${30 + Math.sin(di + i) * 20}%`,
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
