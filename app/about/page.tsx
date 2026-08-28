import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { Disclaimer } from '@/components/primitives/Disclaimer';
import { ProductStory } from '@/components/about/ProductStory';
import { GoalsGrid } from '@/components/about/GoalsGrid';
import { FeatureList } from '@/components/about/FeatureList';
import { TraceabilityTable } from '@/components/about/TraceabilityTable';
import { NotList } from '@/components/about/NotList';
import {
  aboutIntro,
  productStory,
  goals,
  features,
  featuresNote,
  traceabilityRows,
  notList,
  assignmentContext,
} from '@/lib/content/about';

export const metadata: Metadata = {
  title: 'About',
  description:
    'What NUS Opportunity Radar is, the three goals and six features behind it, and what it deliberately leaves out of scope.',
};

export default function AboutPage() {
  return (
    <main id="main">
      <Section tone="canvas">
        <Container size="text">
          <div className="stack">
            <h1 className="type-h1">About Radar</h1>
            <p className="type-body-large">{aboutIntro.lead}</p>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="text">
          <SectionHeader overline={productStory.overline} title={productStory.title} />
          <ProductStory paragraphs={productStory.paragraphs} />
        </Container>
      </Section>

      <Section tone="canvas">
        <Container size="landing">
          <SectionHeader
            overline="Three goals"
            title="What Radar is trying to do"
            lead="Every feature below exists to serve one of these three goals — nothing in the MVP is built without one in mind."
          />
          <GoalsGrid goals={goals} />
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="landing">
          <SectionHeader
            overline="Six MVP features"
            title="How the goals become a product"
            lead="Six features carry the three goals. A seventh idea, the lock-screen widget, is deliberately held back as a stretch goal."
          />
          <FeatureList features={features} note={featuresNote} />
        </Container>
      </Section>

      <Section tone="canvas">
        <Container size="landing">
          <SectionHeader
            overline="Requirement traceability"
            title="Goal, feature, surface, evidence"
            lead="The table below is how we would check the product actually does what each goal claims — not just that a screen exists."
          />
          <TraceabilityTable rows={traceabilityRows} />
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="text">
          <SectionHeader overline="Scope" title="What Radar is not" />
          <NotList items={notList} />
        </Container>
      </Section>

      <Section tone="subdued">
        <Container size="text">
          <SectionHeader overline={assignmentContext.overline} title={assignmentContext.title} />
          <div className="stack">
            <ProductStory paragraphs={assignmentContext.paragraphs} />
            <Disclaimer />
          </div>
        </Container>
      </Section>
    </main>
  );
}
