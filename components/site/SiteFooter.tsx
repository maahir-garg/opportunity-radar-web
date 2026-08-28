import { AnchorLink } from './AnchorLink';
import { RadarMark } from '@/components/primitives/RadarMark';
import { Disclaimer } from '@/components/primitives/Disclaimer';
import styles from './SiteFooter.module.css';

const FOOTER_LINKS = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Preview', href: '/#preview' },
  { label: 'Campaign', href: '/marketing' },
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <RadarMark withWordmark />
          <p className={`type-body-large ${styles.tagline}`}>Find your signal.</p>
          <Disclaimer />
        </div>

        <div className={styles.column}>
          <p className={`type-caption ${styles.heading}`}>Links</p>
          <ul className={styles.linkList}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <AnchorLink href={link.href} className={`type-body ${styles.link}`}>
                  {link.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <p className={`type-caption ${styles.heading}`}>Built by students</p>
          <p className={`type-body ${styles.meta}`}>
            Radar is made by NUS undergraduates who kept missing the deadlines they cared about.
          </p>
          <p className={`type-small ${styles.meta}`}>
            Join the pilot list and we will write to you before it opens.
          </p>
        </div>
      </div>

      <div className={styles.notice}>
        <p className={`type-small ${styles.noticeInner}`}>
          Sample content: the listings, reviews, organisers and dates shown on this site are
          examples, not live opportunities.
        </p>
      </div>
    </footer>
  );
}
