import type { Metadata } from 'next';
import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { ProseSection } from '@/components/about/ProseSection';
import proseStyles from '@/components/about/ProseSection.module.css';
import { privacyIntro, privacySections, privacyContact, lastReviewed } from '@/lib/content/privacy';

export const metadata: Metadata = {
  title: 'Privacy and data',
  description:
    'What the Radar sign-up form asks for, why nothing is stored by this site, and what we would never do with the details a student gives us.',
};

export default function PrivacyPage() {
  return (
    <main id="main">
      <Section tone="canvas">
        <Container size="text">
          <div className="stack">
            <h1 className="type-h1">Privacy and data</h1>
            <p className="type-body-large">{privacyIntro.lead}</p>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="text">
          {privacySections.map((section) => (
            <ProseSection
              key={section.heading}
              heading={section.heading}
              paragraphs={section.paragraphs}
              list={section.list}
            />
          ))}
          <ProseSection heading={privacyContact.heading} paragraphs={[privacyContact.paragraph]} />
          <div className={proseStyles.prose}>
            <p className="type-small">{lastReviewed}</p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
