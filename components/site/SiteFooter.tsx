import Link from 'next/link';
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
                <Link href={link.href} className={`type-body ${styles.link}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <p className={`type-caption ${styles.heading}`}>Contact</p>
          <p className={`type-body ${styles.contactValue}`}>hello@opportunityradar.example</p>
          <p className={`type-small ${styles.meta}`}>Placeholder address for this prototype.</p>
          <p className={`type-small ${styles.meta}`}>
            A CS3216 Assignment 1 project, National University of Singapore.
          </p>
        </div>
      </div>

      <div className={styles.notice}>
        <p className={`type-small ${styles.noticeInner}`}>
          Demo content — every listing, review, organiser and date shown here is fictional and used
          for design testing.
        </p>
      </div>
    </footer>
  );
}
