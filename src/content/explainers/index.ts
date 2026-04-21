import type { Explainer } from "../../types.js";
import { ncciPtp } from "./ncci-ptp.js";
import { mue } from "./mue.js";
import { globalSurgery } from "./global-surgery.js";
import { modifiers } from "./modifiers.js";
import { duplicates } from "./duplicates.js";
import { frequency } from "./frequency.js";
import { ageGenderPos } from "./age-gender-pos.js";
import { medicalNecessity } from "./medical-necessity.js";
import { unbundling } from "./unbundling.js";

export const explainers: Explainer[] = [
  ncciPtp,
  mue,
  globalSurgery,
  modifiers,
  duplicates,
  frequency,
  ageGenderPos,
  medicalNecessity,
  unbundling,
];

export function findExplainer(slug: string): Explainer | undefined {
  return explainers.find((e) => e.slug === slug);
}
