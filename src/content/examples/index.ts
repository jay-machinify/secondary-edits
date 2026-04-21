import type { Example } from "../../types.js";
import { bilateralCataract } from "./bilateral-cataract.js";
import { kneeArthroscopyEm } from "./knee-arthroscopy-em.js";
import { duplicateXray } from "./duplicate-xray.js";
import { globalPeriodCysto } from "./global-period-cysto.js";
import { albuminFrequency } from "./albumin-frequency.js";
import { pediatricProstate } from "./pediatric-prostate.js";
import { unbundledPanel } from "./unbundled-panel.js";
import { addonWithoutPrimary } from "./addon-without-primary.js";

export const examples: Example[] = [
  bilateralCataract,
  kneeArthroscopyEm,
  duplicateXray,
  globalPeriodCysto,
  albuminFrequency,
  pediatricProstate,
  unbundledPanel,
  addonWithoutPrimary,
];

export function findExample(slug: string): Example | undefined {
  return examples.find((e) => e.slug === slug);
}
