import type { Example } from "../../types.js";

export const unbundledPanel: Example = {
  slug: "unbundled-panel",
  title: "Unbundled basic metabolic panel",
  category: "Unbundling",
  lede: "Billing each component of a BMP separately instead of the panel code pays less — and gets denied.",
  claim: {
    id: "EX-0007",
    formType: "CMS-1500",
    patient: { id: "P-48831", age: 49, sex: "F" },
    provider: { id: "NPI-7007007007", name: "Rose Valley Labs", specialty: "Clinical laboratory" },
    dx: ["E11.9 (type 2 diabetes mellitus without complications)"],
    lines: [
      { lineNo: 1, code: "82310", description: "Calcium; total", dos: "2026-04-15", pos: "81", units: 1 },
      { lineNo: 2, code: "82435", description: "Chloride; blood", dos: "2026-04-15", pos: "81", units: 1 },
      { lineNo: 3, code: "82565", description: "Creatinine; blood", dos: "2026-04-15", pos: "81", units: 1 },
      { lineNo: 4, code: "82947", description: "Glucose; quantitative, blood", dos: "2026-04-15", pos: "81", units: 1 },
      { lineNo: 5, code: "84132", description: "Potassium; serum, plasma, or whole blood", dos: "2026-04-15", pos: "81", units: 1 },
      { lineNo: 6, code: "84295", description: "Sodium; serum, plasma, or whole blood", dos: "2026-04-15", pos: "81", units: 1 },
      { lineNo: 7, code: "82374", description: "CO2; bicarbonate", dos: "2026-04-15", pos: "81", units: 1 },
      { lineNo: 8, code: "84520", description: "Urea nitrogen; quantitative", dos: "2026-04-15", pos: "81", units: 1 },
    ],
  },
  edit: {
    ruleName: "Panel unbundling: components reportable as 80048",
    category: "Unbundling",
    carc: "236",
    message:
      "All 8 components of a basic metabolic panel (CPT 80048) were billed separately on the same DOS for the same patient. Edit re-bundles to the panel code and denies the component lines.",
    involvedCodes: ["82310", "82435", "82565", "82947", "84132", "84295", "82374", "84520", "→ 80048"],
  },
  resolutionTitle: "Rebill as the panel code",
  resolution:
    "Replace the eight component lines with a single line for <code>80048</code> (Basic Metabolic Panel). If the clinician only ordered a subset of components, bill only those components — but once all 8 are present, the panel code is required.",
  sources: [
    { label: "Outsource Strategies: Understanding Unbundling", url: "https://www.outsourcestrategies.com/blog/understanding-unbundling-or-fragmenting-medical-billing-codes/" },
  ],
};
