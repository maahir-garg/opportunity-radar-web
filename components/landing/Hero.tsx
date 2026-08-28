import { Button } from '@/components/primitives/Button';
import { Container } from '@/components/primitives/Container';
import { Disclaimer } from '@/components/primitives/Disclaimer';
import { RadarArcs } from '@/components/primitives/RadarArcs';
import { OpportunityCard } from '@/components/product/OpportunityCard';
import { getOpportunity } from '@/lib/data';
import styles from './Hero.module.css';

const showcase = getOpportunity('proto-research-hcai');

export function Hero() {
  return (
    <section className={styles.hero}>
      <RadarArcs className={styles.arcs} />
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={`type-caption ${styles.overline}`}>NUS Opportunity Radar</p>
          <h1 className={`type-display ${styles.title}`}>
            Find the opportunities worth your time.
          </h1>
          <p className={`type-body-large ${styles.lead}`}>
            Radar brings NUS internships, research, competitions, exchanges, grants and talks into
            one place, shows you a short list that fits your year and interests, explains why each
            one matched, and turns the ones you save into a deadline plan.
          </p>
          <div className={styles.actions}>
            <Button href="#waitlist" size="large">
              Reserve your spot
            </Button>
            <Button href="#how-it-works" variant="secondary" size="large">
              See how it works
            </Button>
          </div>
          <p className={`type-small ${styles.micro}`}>
            Free for students · Pilot opens to the first 100 sign-ups · No NUS login required
          </p>
          <Disclaimer className={styles.disclaimer} />
        </div>

        <div className={styles.visual}>
          {showcase ? (
            <OpportunityCard
              opportunity={showcase}
              variant="featured"
              titleAs="p"
              className={styles.card}
            />
          ) : null}
          <p className={`type-small ${styles.visualCaption}`}>
            One card carries the deadline, the organiser, where the listing came from, and why it
            reached you.
          </p>
        </div>
      </Container>
    </section>
  );
}
