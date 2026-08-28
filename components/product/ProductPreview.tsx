'use client';

import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { ForYouScreen } from './screens/ForYouScreen';
import { WhyMatchScreen } from './screens/WhyMatchScreen';
import { RadarScreen } from './screens/RadarScreen';
import styles from './ProductPreview.module.css';

const TABS = [
  { id: 'for-you', label: 'For You', caption: 'A short list, not an inbox.' },
  { id: 'why', label: 'Why this matches', caption: 'Every number explains itself.' },
  { id: 'radar', label: '30-day Radar', caption: 'Confirmed and expected, never mixed.' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const SCREENS: Record<TabId, () => React.JSX.Element | null> = {
  'for-you': ForYouScreen,
  why: WhyMatchScreen,
  radar: RadarScreen,
};

export type ProductPreviewProps = {
  className?: string;
};

/**
 * Marketing product imagery: three static screen compositions behind a tab
 * switcher. The tabs are the only interactive part — the screens themselves
 * are inert, because the working prototype lives elsewhere.
 */
export function ProductPreview({ className }: ProductPreviewProps) {
  const [active, setActive] = useState<TabId>('for-you');
  const baseId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = TABS.findIndex((tab) => tab.id === active);
  const Screen = SCREENS[active];

  function focusTab(index: number) {
    const next = (index + TABS.length) % TABS.length;
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusTab(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusTab(index - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusTab(TABS.length - 1);
    }
  }

  const classNames = [styles.preview, className ?? ''].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Product preview screens"
      >
        {TABS.map((tab, index) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              className={`type-label ${styles.tab} ${selected ? styles.tabSelected : ''}`}
              onClick={() => setActive(tab.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active}`}
        aria-labelledby={`${baseId}-tab-${active}`}
        tabIndex={0}
        className={styles.panel}
      >
        <p className={`type-small ${styles.caption}`}>{TABS[activeIndex].caption}</p>
        <PhoneFrame>
          <Screen />
        </PhoneFrame>
      </div>
    </div>
  );
}
