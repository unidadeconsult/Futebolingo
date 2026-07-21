const DAY_MS = 24 * 60 * 60 * 1000;

// Leitner system: box index -> days until next review.
const BOX_INTERVALS_DAYS = [0, 1, 3, 7, 16, 35];
const MAX_BOX = BOX_INTERVALS_DAYS.length - 1;

export function nextDueAt(box: number, now = Date.now()): number {
  const clamped = Math.min(Math.max(box, 0), MAX_BOX);
  return now + BOX_INTERVALS_DAYS[clamped] * DAY_MS;
}

export function nextBox(currentBox: number, correct: boolean): number {
  if (!correct) return 0;
  return Math.min(currentBox + 1, MAX_BOX);
}

export function isMastered(box: number): boolean {
  return box >= MAX_BOX;
}
