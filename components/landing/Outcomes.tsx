import { Bell, Check, CircleHelp, Search } from 'lucide-react';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { CategoryIcon } from '@/components/product/CategoryIcon';
import { ReviewSummary } from '@/components/product/ReviewSummary';
import { SourceTrustBlock } from '@/components/product/SourceTrustBlock';
import { categories, getOpportunity } from '@/lib/data';
import { formatDeadline, relativeDeadline } from '@/lib/date';
import styles from './Outcomes.module.css';

const research = getOpportunity('proto-research-hcai');
const civic = getOpportunity('proto-civic-tech');

function DiscoverVisual() {
  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.searchRow}>
        <Search size={16} strokeWidth={1.75} aria-hidden="true" />
        <span className={`type-small ${styles.searchText}`}>Search opportunities</span>
      </div>
      <ul className={styles.categoryGrid}>
        {categories.map((category) => (
          <li key={category.id} className={`type-small ${styles.categoryItem}`}>
            <CategoryIcon categoryId={category.id} />
            <span>{category.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DecideVisual() {
  if (!research) return null;
  return (
    <div className={styles.visual} aria-hidden="true">
      <SourceTrustBlock source={research.source} organiser={research.organiser} />
      <div className={styles.eligibility}>
        <h4 className={`type-caption ${styles.eligibilityTitle}`}>You meet</h4>
        <ul className={styles.eligibilityList}>
          {research.eligibility.confirmed.map((item) => (
            <li key={item} className={`type-small ${styles.eligibilityItem}`}>
              <Check size={14} strokeWidth={2} aria-hidden="true" className={styles.metCheck} />
              {item}
            </li>
          ))}
        </ul>
        <h4 className={`type-caption ${styles.eligibilityTitle}`}>Check this</h4>
        <ul className={styles.eligibilityList}>
          {research.eligibility.toCheck.map((item) => (
            <li key={item} className={`type-small ${styles.eligibilityItem}`}>
              <CircleHelp size={14} strokeWidth={2} aria-hidden="true" className={styles.metCheck} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <ReviewSummary rating={research.rating} />
    </div>
  );
}

const PLAN_TABS = ['Saved', 'Preparing', 'Applied', 'Past'] as const;

function ActVisual() {
  if (!civic?.applicationDeadline || !research?.applicationDeadline) return null;
  return (
    <div className={styles.visual} aria-hidden="true">
      <ul className={styles.planTabs}>
        {PLAN_TABS.map((tab, index) => (
          <li
            key={tab}
            className={`type-label ${styles.planTab} ${index === 0 ? styles.planTabCurrent : ''}`}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div className={styles.nextUp}>
        <p className={`type-caption ${styles.nextUpLabel}`}>Next up</p>
        <p className={`type-label ${styles.nextUpTitle}`}>{civic.title}</p>
        <p className={`type-small ${styles.nextUpMeta} tabular`}>
          {relativeDeadline(civic.applicationDeadline)} · {formatDeadline(civic.applicationDeadline)}
        </p>
        <p className={`type-small ${styles.nextUpAction}`}>
          Next action: confirm a teammate by 29 Aug
        </p>
      </div>
      <div className={styles.reminderRow}>
        <Bell size={16} strokeWidth={1.75} aria-hidden="true" />
        <span className={`type-small ${styles.reminderText}`}>
          Reminder set · 3 days before {formatDeadline(research.applicationDeadline)}
        </span>
      </div>
    </div>
  );
}

const OUTCOMES = [
  {
    goal: 'Goal 1: Discover',
    title: 'One place instead of six channels.',
    body: 'Internships, research, competitions, exchanges, volunteering, talks, grants and ventures share one catalogue and one taxonomy. Search works the ordinary way, and the feed keeps the list short enough to actually read.',
    Visual: DiscoverVisual,
  },
  {
    goal: 'Goal 2: Decide',
    title: 'The evidence sits next to the decision.',
    body: 'Before you commit an evening, you can see who is running it, which page the listing came from, when we last checked that page, what you already qualify for, what you still need to confirm, and what students who went before you said.',
    Visual: DecideVisual,
  },
  {
    goal: 'Goal 3: Act',
    title: 'A deadline plan you can actually keep.',
    body: 'Saving something records a status and a next action instead of burying it in a bookmark folder. Reminders use the real deadline, and Plan groups everything by when it is due.',
    Visual: ActVisual,
  },
] as const;

export function Outcomes() {
  return (
    <Section id="outcomes" tone="surface">
      <Container>
        <SectionHeader
          overline="What it changes"
          title="Three goals, and the surfaces that serve them."
          lead="Every feature in Radar traces back to one of these. If it does not, we have not built it."
        />
        <div className={styles.rows}>
          {OUTCOMES.map(({ goal, title, body, Visual }, index) => (
            <article
              key={goal}
              className={`${styles.row} ${index % 2 === 1 ? styles.reversed : ''}`}
            >
              <div className={styles.copy}>
                <p className={`type-caption ${styles.goal}`}>{goal}</p>
                <h3 className={`type-h2 ${styles.title}`}>{title}</h3>
                <p className={`type-body ${styles.body}`}>{body}</p>
              </div>
              <figure className={styles.visualWrap}>
                <figcaption className={`type-caption ${styles.visualLabel}`}>
                  From the app
                </figcaption>
                <Visual />
              </figure>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
