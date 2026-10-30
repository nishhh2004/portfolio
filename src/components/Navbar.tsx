import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../config/siteConfig';
import { useActiveSection, scrollToSection, useKeyboardShortcut } from '../hooks/useAnimations';
import './Navbar.css';

const sectionIds = ['about', 'expertise', 'projects', 'experience', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth > 768) setMobileOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  // Cmd+K / Ctrl+K
  useKeyboardShortcut('k', 'ctrl', () => setCmdOpen(prev => !prev));
  useKeyboardShortcut('k', 'meta', () => setCmdOpen(prev => !prev));

  const handleNav = useCallback((href: string) => {
    scrollToSection(href);
    setMobileOpen(false);
    setCmdOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner container">
          <a href="#" className="navbar__logo font-heading" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            {siteConfig.shortName}
            <span className="navbar__availability-dot" aria-label="Available for opportunities" />
          </a>

          {/* Desktop nav */}
          <div className="navbar__links">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`navbar__link ${activeSection === item.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
              >
                {item.label}
              </a>
            ))}
            <button className="navbar__cmd-btn font-mono" onClick={() => setCmdOpen(true)} aria-label="Open command menu">
              ⌘K
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {siteConfig.navigation.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="mobile-menu__link font-heading"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
              >
                <span className="mobile-menu__num font-mono">0{i + 1}</span>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command menu */}
      <AnimatePresence>
        {cmdOpen && (
          <motion.div
            className="cmd-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCmdOpen(false)}
          >
            <motion.div
              className="cmd-menu"
              initial={{ opacity: 0, y: -20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-label="Command menu"
            >
              <div className="cmd-menu__header font-mono">
                <span>NAVIGATION</span>
                <button onClick={() => setCmdOpen(false)} aria-label="Close">ESC</button>
              </div>
              <div className="cmd-menu__items">
                {siteConfig.navigation.map((item) => (
                  <button
                    key={item.href}
                    className="cmd-menu__item"
                    onClick={() => handleNav(item.href)}
                  >
                    <span className="cmd-menu__icon">→</span>
                    {item.label}
                  </button>
                ))}
                <div className="cmd-menu__divider" />
                <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" className="cmd-menu__item">
                  <span className="cmd-menu__icon">↗</span>
                  GitHub
                </a>
                <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" className="cmd-menu__item">
                  <span className="cmd-menu__icon">↗</span>
                  LinkedIn
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
