import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { useInView } from '../hooks/useAnimations';
import './Contact.css';

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const { contact } = siteConfig;

  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="section-divider" />

      {/* Background ambient network */}
      <div className="contact__bg">
        <div className="contact__bg-gradient" />
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className="contact__bg-node"
            style={{
              left: `${(i * 19) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${(i * 0.4) % 4}s`,
              animationDuration: `${3.5 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="container contact__inner">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          {contact.sectionLabel}
        </motion.span>

        <div className="contact__content">
          <motion.h2
            className="contact__headline section-headline"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={1}
          >
            {contact.headline}
          </motion.h2>

          <motion.p
            className="contact__description"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={2}
          >
            {contact.description}
          </motion.p>

          <motion.div
            className="contact__status-pill font-mono"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={2.5}
          >
            <span className="contact__status-dot" />
            <span>OPEN TO DATA SCIENCE, ML & AI OPPORTUNITIES (2026)</span>
          </motion.div>

          <motion.div
            className="contact__actions"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={3}
          >
            <a
              href={`mailto:${contact.email}`}
              className="btn-primary btn-primary--cyan"
            >
              LET'S TALK
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <a
              href={contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-primary--outline"
            >
              DOWNLOAD RESUME
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Bottom Social / Contact Cards */}
        <motion.div
          className="contact__links"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={4}
        >
          <a href={`mailto:${contact.email}`} className="contact__link" aria-label="Email">
            <div className="contact__link-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <span className="contact__link-label font-mono">DIRECT INBOX</span>
            <span className="contact__link-value">{contact.email}</span>
          </a>

          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="contact__link" aria-label="LinkedIn">
            <div className="contact__link-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <span className="contact__link-label font-mono">PROFESSIONAL NETWORK</span>
            <span className="contact__link-value">LinkedIn Profile ↗</span>
          </a>

          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="contact__link" aria-label="GitHub">
            <div className="contact__link-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </div>
            <span className="contact__link-label font-mono">CODE REPOSITORIES</span>
            <span className="contact__link-value">GitHub Profile ↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
