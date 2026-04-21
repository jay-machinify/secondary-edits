import type { Explainer } from "../../types.js";

export const mue: Explainer = {
  slug: "mue",
  title: "Medically Unlikely Edits (MUEs)",
  category: "MUE",
  oneLiner: "Unit-of-service ceilings per code per beneficiary per DOS.",
  definition:
    "An MUE is the maximum number of units of a particular HCPCS/CPT code that a provider would reasonably report for a single beneficiary on a single date of service under almost any clinical circumstance. CMS publishes MUE values and an MUE Adjudication Indicator (MAI) that describes how the edit behaves.",
  whenItFires: [
    "A single claim line's units exceed the MUE.",
    "Multiple lines of the same code sum to more than the MUE (depends on MAI).",
    "The MAI determines the response: deny the whole line (MAI 2), deny the excess units (MAI 1), or pend for medical review (MAI 3).",
  ],
  keyReferences: [
    "MAI 1 = line-edit; excess units deny but claim may be split-billed",
    "MAI 2 = date-of-service edit, absolute; deny any units beyond the limit",
    "MAI 3 = date-of-service edit, clinical; may be overridden with documentation",
    "MUE values are published on CMS.gov separately for practitioner, outpatient-hospital, and DME claim types",
  ],
  edgeCases: [
    "Anatomic vs non-anatomic codes: an MUE of 1 on a bilateral procedure may actually mean '1 per side' when split-billed on two lines with -LT/-RT.",
    "Some codes have very low MUE values because the typical case is one unit; bona fide higher volumes can still be billed but may require appeal documentation.",
    "MUEs are separate from frequency edits (which run across DOS over time); MUE is same-day only.",
  ],
  miniExample: {
    summary:
      "A lab submits CPT 82947 (glucose, quantitative) with 12 units on a single DOS for one patient. The MUE for 82947 is 3 (MAI 2).",
    resolution:
      "The entire line denies. Even split-billing won't recover it — MAI 2 is an absolute date-of-service cap. The provider must review whether 82947 was miscoded (perhaps point-of-care glucose monitors require a different code) before resubmitting.",
  },
  sources: [
    {
      label: "CMS NCCI Policy Manual (MUE section)",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual",
    },
    {
      label: "CMS NCCI FAQ Library",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-faq-library",
    },
  ],
};
