import type { Explainer } from "../../types.js";

export const unbundling: Explainer = {
  slug: "unbundling",
  title: "Unbundling / Fragmentation Edits",
  category: "Unbundling",
  oneLiner: "Separate billing of component codes that should roll up into a single bundled code.",
  definition:
    "Unbundling (also called fragmenting) is billing the individual components of a service on separate claim lines to collect more in total than the correct bundled code would pay. Related NCCI PTP edits and proprietary bundling rules look for patterns of component codes appearing without the comprehensive code, and enforce the bundle.",
  whenItFires: [
    "Component codes of a panel or bundled procedure are billed on separate lines when a single comprehensive code exists (e.g., billing the separate lab tests that make up a CMP rather than 80053).",
    "Incidental or integral services of a larger procedure are billed separately.",
    "A set of codes that represents a surgical approach is billed alongside the completed procedure.",
  ],
  keyReferences: [
    "CPT panel codes (e.g., 80048 BMP, 80053 CMP, 80061 lipid panel, 80076 hepatic function panel)",
    "NCCI PTP 'Column One contains Column Two' comprehensive/component pairs",
    "AMA CPT guidelines on inclusive services (pre-op prep, closure, routine dressings)",
  ],
  edgeCases: [
    "Not every co-billed pair is unbundling — some procedures are legitimately performed at the same session on different structures. Modifier 59 / X{EPSU} exists exactly for that.",
    "Unbundling is a frequent focus of post-payment recoveries, because patterns are clearer over time than on a single claim.",
    "Some commercial payers have proprietary bundling rules that go beyond NCCI, sometimes controversially.",
  ],
  miniExample: {
    summary:
      "A lab bills CPT 82310 (calcium), 82435 (chloride), 82565 (creatinine), 82947 (glucose), 84295 (sodium), 84132 (potassium), 82374 (CO2), and 84520 (urea nitrogen) individually. Together these components comprise a Basic Metabolic Panel (CPT 80048).",
    resolution:
      "The edit fires recognizing the panel. The individual component lines deny or re-adjudicate under the single 80048 code. Providers should bill the panel code when the full set is ordered.",
  },
  sources: [
    {
      label: "Outsource Strategies: Understanding Unbundling",
      url: "https://www.outsourcestrategies.com/blog/understanding-unbundling-or-fragmenting-medical-billing-codes/",
    },
    {
      label: "CMS NCCI Policy Manual",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual",
    },
  ],
};
