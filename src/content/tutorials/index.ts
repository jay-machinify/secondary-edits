import type { Tutorial } from "../../types.js";
import { modifier25Decision } from "./modifier-25-decision.js";
import { ncciPtpOverride } from "./ncci-ptp-override.js";
import { globalPeriodOverlap } from "./global-period-overlap.js";
import { duplicateVsRepeat } from "./duplicate-vs-repeat.js";

export const tutorials: Tutorial[] = [
  modifier25Decision,
  ncciPtpOverride,
  globalPeriodOverlap,
  duplicateVsRepeat,
];

export function findTutorial(slug: string): Tutorial | undefined {
  return tutorials.find((t) => t.slug === slug);
}
