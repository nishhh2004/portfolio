import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig, type Project } from '../config/siteConfig';
import { useInView } from '../hooks/useAnimations';
import './Projects.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const { ref, inView } = useInView(0.1);

  return (
    <motion.article
      ref={ref}
      className={`project-card ${project.isFlagship ? 'project-card--flagship' : ''}`}
      style={{ '--project-accent': project.accentColor, '--gradient-from': project.gradientFrom, '--gradient-to': project.gradientTo } as React.CSSProperties}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={0}
    >
      <div className="project-card__inner">
        {/* Header */}
        <div className="project-card__header">
          <div className="project-card__meta">
            <span className="project-card__number font-mono">{project.number}</span>
            <span className="project-card__category font-mono">{project.category}</span>
          </div>
          <h3 className="project-card__name font-heading">{project.name}</h3>
          <p className="project-card__tagline font-mono">{project.tagline}</p>
        </div>

        {/* Preview area */}
        <div className="project-card__preview">
          <div className="project-card__preview-screen">
            <div className="project-card__preview-chrome">
              <span className="project-card__dot" />
              <span className="project-card__dot" />
              <span className="project-card__dot" />
              <span className="project-card__preview-url font-mono">{project.liveUrl.replace('https://', '')}</span>
            </div>
            <div className="project-card__preview-body">
              {/* Simulated app UI */}
              <div className="project-card__ui-header">
                <div className="project-card__ui-logo" />
                <div className="project-card__ui-nav">
                  <div className="project-card__ui-nav-item" />
                  <div className="project-card__ui-nav-item" />
                  <div className="project-card__ui-nav-item" />
                </div>
              </div>
              <div className="project-card__ui-content">
                <div className="project-card__ui-title" />
                <div className="project-card__ui-subtitle" />
                <div className="project-card__ui-charts">
                  {/* Mini chart bars */}
                  {[65, 80, 45, 90, 70, 55, 85].map((h, i) => (
                    <div
                      key={i}
                      className="project-card__ui-bar"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <div className="project-card__ui-metrics">
                  <div className="project-card__ui-metric" />
                  <div className="project-card__ui-metric" />
                  <div className="project-card__ui-metric" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="project-card__description">{project.description}</p>

        {/* Tech stack */}
        <div className="project-card__tech">
          {project.techStack.map((tech) => (
            <span key={tech} className="project-card__tech-tag font-mono">{tech}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="project-card__actions">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary btn-primary--cyan"
          >
            {project.isFlagship ? 'LAUNCH NEXUS AI' : `EXPLORE ${project.name.toUpperCase()}`}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
          <button
            className="btn-primary btn-primary--outline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'CLOSE DETAILS' : 'VIEW DETAILS'}
          </button>
        </div>

        {/* Expanded details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              className="project-card__details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="project-card__details-inner">
                <div className="project-card__detail-section">
                  <h4 className="font-heading">Overview</h4>
                  <p>{project.description}</p>
                </div>

                <div className="project-card__detail-section">
                  <h4 className="font-heading">Key Features</h4>
                  <ul>
                    {project.features.map((f) => (
                      <li key={f}>
                        <span className="project-card__feature-dot">▹</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="project-card__detail-section">
                  <h4 className="font-heading">Challenges & Learnings</h4>
                  <p>{project.challenges}</p>
                </div>

                {/* Architecture diagram for flagship */}
                {project.architectureSteps && (
                  <div className="project-card__detail-section">
                    <h4 className="font-heading">Architecture</h4>
                    <div className="project-card__architecture">
                      {project.architectureSteps.map((step, i) => (
                        <div key={step} className="project-card__arch-step font-mono">
                          <div className="project-card__arch-node" style={{ animationDelay: `${i * 0.2}s` }} />
                          <span>{step}</span>
                          {i < (project.architectureSteps?.length || 0) - 1 && (
                            <div className="project-card__arch-arrow">↓</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="project-card__detail-section">
                  <h4 className="font-heading">Technology Stack</h4>
                  <div className="project-card__tech">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="project-card__tech-tag font-mono">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Accent glow */}
      <div className="project-card__glow" />
    </motion.article>
  );
}

export default function Projects() {
  const { ref, inView } = useInView(0.05);
  const { projects } = siteConfig;

  return (
    <section id="projects" className="section projects" ref={ref}>
      <div className="section-divider" />
      <div className="container">
        <motion.span
          className="section-label"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={0}
        >
          {projects.sectionLabel}
        </motion.span>

        <motion.h2
          className="section-headline"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={1}
        >
          {projects.headline}
        </motion.h2>

        <motion.p
          className="projects__subtitle"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          custom={2}
        >
          {projects.subtitle}
        </motion.p>

        <div className="projects__gallery">
          {projects.items.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
