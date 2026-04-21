import type { Example } from "../../types.js";

export const kneeArthroscopyEm: Example = {
  slug: "knee-arthroscopy-em",
  title: "Knee arthroscopy + same-day E/M — missing modifier 25",
  category: "Modifiers",
  lede: "A procedure was performed, but the E/M billed with it has no modifier 25. The E/M denies as pre-service work.",
  claim: {
    id: "EX-0002",
    formType: "CMS-1500",
    patient: { id: "P-33128", age: 52, sex: "M" },
    provider: { id: "NPI-4455667788", name: "Canyon Orthopedic Group", specialty: "Orthopedic surgery" },
    dx: ["M23.203 (derangement of unspecified meniscus due to old tear)"],
    lines: [
      { lineNo: 1, code: "29881", description: "Arthroscopy, knee, with meniscectomy", dos: "2026-05-03", pos: "24", units: 1 },
      { lineNo: 2, code: "99203", description: "Office or other outpatient visit, new patient, low complexity", dos: "2026-05-03", pos: "11", units: 1 },
    ],
  },
  edit: {
    ruleName: "Modifier 25 required on same-day E/M with procedure",
    category: "Modifiers",
    carc: "97",
    rarc: "M144",
    message:
      "The 99203 is treated as pre-service work of the 29881 absent modifier 25 establishing a distinct E/M. Edit denies the 99203 line.",
    involvedCodes: ["29881", "99203"],
  },
  resolutionTitle: "If the E/M was truly distinct, resubmit with modifier 25",
  resolution:
    "If the E/M addressed a separate problem (e.g., new hip complaint at the same visit), resubmit as <code>99203-25</code> with documentation that supports a distinct evaluation. If the E/M was solely the pre-operative decision for the meniscectomy, drop the 99203 entirely — it isn't separately billable.",
  sources: [
    { label: "CMS NCCI Policy Manual (modifier chapter)", url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual" },
  ],
};
