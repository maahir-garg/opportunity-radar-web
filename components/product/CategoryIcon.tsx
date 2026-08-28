import {
  BadgeDollarSign,
  BriefcaseBusiness,
  FlaskConical,
  Globe2,
  HeartHandshake,
  Presentation,
  Rocket,
  Trophy,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CategoryId } from '@/lib/types';

/** Canonical taxonomy icons — see design-system/01-PRODUCT-UX-SPEC.txt. */
const ICONS: Record<CategoryId, LucideIcon> = {
  career: BriefcaseBusiness,
  research: FlaskConical,
  venture: Rocket,
  competition: Trophy,
  global: Globe2,
  impact: HeartHandshake,
  event: Presentation,
  funding: BadgeDollarSign,
};

export type CategoryIconProps = {
  categoryId: CategoryId;
  size?: number;
  className?: string;
};

export function CategoryIcon({ categoryId, size = 16, className }: CategoryIconProps) {
  const Icon = ICONS[categoryId];
  return <Icon size={size} strokeWidth={1.75} aria-hidden="true" className={className} />;
}
