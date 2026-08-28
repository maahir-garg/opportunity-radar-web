import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { SkipLink } from '@/components/site/SkipLink';
import { SiteHeader } from '@/components/site/SiteHeader';
import { SiteFooter } from '@/components/site/SiteFooter';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://opportunity-radar.vercel.app';

const title = 'NUS Opportunity Radar: Find your signal.';
const description =
  'Radar brings NUS internships, research, competitions, exchanges, grants and talks into one place, shows you a short list that fits your year and interests, explains why each one matched, and turns the ones you save into a deadline plan.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: '%s · NUS Opportunity Radar',
    default: title,
  },
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'NUS Opportunity Radar',
    locale: 'en_SG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-SG" className={manrope.variable}>
      <body>
        <SkipLink />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
