import type { Metadata } from 'next';
import { Container } from '@/components/primitives/Container';
import { Section } from '@/components/primitives/Section';
import { CampaignHero } from '@/components/marketing/CampaignHero';
import { AtAGlance } from '@/components/marketing/AtAGlance';
import { AudienceSection } from '@/components/marketing/AudienceSection';
import { ChannelGrid } from '@/components/marketing/ChannelGrid';
import { VideoStoryboard } from '@/components/marketing/VideoStoryboard';
import { AssetSamples } from '@/components/marketing/AssetSamples';
import { CampaignTimeline } from '@/components/marketing/CampaignTimeline';
import { MeasurementSection } from '@/components/marketing/MeasurementSection';
import { WhyItWorks } from '@/components/marketing/WhyItWorks';
import { RiskTable } from '@/components/marketing/RiskTable';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Launch campaign',
  description:
    'The marketing plan for the Radar pilot: six low-cost, non-disruptive channels, a real video shot list, sample assets and how we would measure it.',
};

const PAGE_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'audience', label: 'Audience' },
  { id: 'channels', label: 'Channels' },
  { id: 'video-outline', label: 'Video outline' },
  { id: 'assets', label: 'Sample assets' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'measurement', label: 'Measurement' },
  { id: 'why-it-works', label: 'Why it works' },
  { id: 'risks', label: 'Risks' },
] as const;

export default function MarketingPage() {
  return (
    <main id="main">
      <Section id="overview" tone="canvas">
        <Container>
          <CampaignHero />
          <AtAGlance />
          <nav aria-label="On this page" className={styles.pageNav}>
            <ul className={styles.pageNavList}>
              {PAGE_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a className={`type-small ${styles.pageNavLink}`} href={`#${section.id}`}>
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      <Section id="audience" tone="surface">
        <Container>
          <AudienceSection />
        </Container>
      </Section>

      <Section id="channels" tone="canvas">
        <Container>
          <ChannelGrid />
        </Container>
      </Section>

      <Section id="video-outline" tone="surface">
        <Container>
          <VideoStoryboard />
        </Container>
      </Section>

      <Section id="assets" tone="canvas">
        <Container>
          <AssetSamples />
        </Container>
      </Section>

      <Section id="timeline" tone="surface">
        <Container>
          <CampaignTimeline />
        </Container>
      </Section>

      <Section id="measurement" tone="canvas">
        <Container>
          <MeasurementSection />
        </Container>
      </Section>

      <Section id="why-it-works" tone="surface">
        <Container>
          <WhyItWorks />
        </Container>
      </Section>

      <Section id="risks" tone="canvas">
        <Container>
          <RiskTable />
        </Container>
      </Section>
    </main>
  );
}
