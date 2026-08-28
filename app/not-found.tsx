import { Section } from '@/components/primitives/Section';
import { Container } from '@/components/primitives/Container';
import { Button } from '@/components/primitives/Button';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main id="main">
      <Section tone="canvas">
        <Container size="text">
          <div className="stack">
            <p className="type-caption">404</p>
            <h1 className="type-h1">We could not find that page.</h1>
            <p className="type-body">
              The page may have moved, or the link might be out of date. Check the address, or head
              back to the landing page.
            </p>
            <Button href="/">Back to the landing page</Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
