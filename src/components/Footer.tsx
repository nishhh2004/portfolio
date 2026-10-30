import { siteConfig } from '../config/siteConfig';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="section-divider" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name font-heading">{siteConfig.name.toUpperCase()}</span>
          <p className="footer__tagline">{siteConfig.footer.tagline}</p>
        </div>

        <div className="footer__links">
          {siteConfig.navigation.map((item) => (
            <a key={item.href} href={item.href} className="footer__link">
              {item.label}
            </a>
          ))}
        </div>

        <div className="footer__bottom">
          <span className="footer__copyright font-mono">
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <div className="footer__socials">
            <a href={siteConfig.contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer__social">
              GitHub
            </a>
            <a href={siteConfig.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
