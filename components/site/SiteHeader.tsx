'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { RadarMark } from '@/components/primitives/RadarMark';
import { Button } from '@/components/primitives/Button';
import { AnchorLink } from './AnchorLink';
import styles from './SiteHeader.module.css';

const NAV_LINKS = [
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Preview', href: '/#preview' },
  { label: 'Trust', href: '/#trust' },
  { label: 'Campaign', href: '/marketing' },
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setIsMenuOpen(false);
    toggleRef.current?.focus();
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    const drawer = drawerRef.current;
    drawer?.querySelector<HTMLElement>('a, button')?.focus();

    // The page behind a drawer should not scroll with it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab' || !drawer) return;

      // Keep Tab inside the drawer while it is open.
      const focusable = drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label="Radar, home">
          <RadarMark />
          <span aria-hidden="true" className={`type-h3 ${styles.brandLabel}`}>
            Radar
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <AnchorLink href={link.href} className={`type-label ${styles.navLink}`}>
                  {link.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Button href="/#waitlist" className={styles.headerCta}>
            Reserve your spot
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuToggle}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Menu className={styles.menuIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Click-off layer. Keyboard users close with Escape or the drawer's own button. */}
      <div
        className={`${styles.scrim} ${isMenuOpen ? styles.scrimOpen : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id={menuId}
        ref={drawerRef}
        className={`${styles.drawer} ${isMenuOpen ? styles.drawerOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        // Hidden from the accessibility tree and the tab order while closed.
        inert={!isMenuOpen}
      >
        <div className={styles.drawerHeader}>
          <span className={`type-caption ${styles.drawerTitle}`}>Menu</span>
          <button
            type="button"
            className={styles.drawerClose}
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X className={styles.menuIcon} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Primary">
          <ul className={styles.drawerList}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <AnchorLink
                  href={link.href}
                  className={`type-title ${styles.drawerLink}`}
                  onNavigate={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.drawerFooter}>
          <Button href="/#waitlist" fullWidth onClick={() => setIsMenuOpen(false)}>
            Reserve your spot
          </Button>
        </div>
      </div>
    </header>
  );
}
