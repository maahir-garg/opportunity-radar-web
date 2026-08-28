export type MatchLabel = 'Strong match' | 'Good match' | 'Possible match';

/** Strong match (85–100) / Good match (70–84) / Possible match (< 70). */
export function matchLabel(score: number): MatchLabel {
  if (score >= 85) return 'Strong match';
  if (score >= 70) return 'Good match';
  return 'Possible match';
}

export type MatchTone = 'match' | 'eligibility';

/**
 * 'eligibility' whenever blockers are present (renders "Eligibility issue"
 * instead of a high label); 'match' otherwise.
 */
export function matchTone(score: number, blockers: string[]): MatchTone {
  void score;
  return blockers.length > 0 ? 'eligibility' : 'match';
}
