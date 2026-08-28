import { Hero } from '@/components/landing/Hero';
import { InterviewQuotes } from '@/components/landing/InterviewQuotes';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { PreviewSection } from '@/components/landing/PreviewSection';
import { Outcomes } from '@/components/landing/Outcomes';
import { TrustSection } from '@/components/landing/TrustSection';
import { Faq } from '@/components/landing/Faq';
import { WaitlistSection } from '@/components/landing/WaitlistSection';

export default function LandingPage() {
  return (
    <main id="main">
      <Hero />
      <InterviewQuotes />
      <HowItWorks />
      <PreviewSection />
      <Outcomes />
      <TrustSection />
      <Faq />
      <WaitlistSection />
    </main>
  );
}
