import type { Example } from "../../types.js";

export const addonWithoutPrimary: Example = {
  slug: "addon-without-primary",
  title: "Add-on code billed without its primary",
  category: "NCCI PTP",
  lede: "+11101 is an add-on to 11100. Billing it alone trips the add-on edit.",
  claim: {
    id: "EX-0008",
    formType: "CMS-1500",
    patient: { id: "P-61120", age: 39, sex: "M" },
    provider: { id: "NPI-8008008008", name: "Cedar Creek Dermatology", specialty: "Dermatology" },
    dx: ["D22.5 (melanocytic nevi of trunk)"],
    lines: [
      { lineNo: 1, code: "11101", description: "Biopsy of skin/subcutaneous tissue, each separate/additional lesion", dos: "2026-06-07", pos: "11", units: 2 },
    ],
    note: "Primary biopsy code (11100) not billed.",
  },
  edit: {
    ruleName: "NCCI add-on: primary procedure missing",
    category: "NCCI PTP",
    carc: "107",
    message:
      "CPT 11101 is an add-on code that may only be billed with its primary (11100). No 11100 appears on this claim or in the day's claim history. 11101 denies.",
    involvedCodes: ["11101 (add-on)", "missing: 11100"],
  },
  resolutionTitle: "Add the primary code 11100",
  resolution:
    "Resubmit with <code>11100</code> (first lesion) and <code>11101 × 2</code> (second and third additional lesions). Add-on codes by rule cannot stand alone — the NCCI add-on edit file governs this and runs in the secondary pass.",
  sources: [
    { label: "CMS NCCI PTP Edits (add-on file)", url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-procedure-procedure-ptp-edits" },
  ],
};
