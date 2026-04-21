import type { Example } from "../../types.js";

export const bilateralCataract: Example = {
  slug: "bilateral-cataract",
  title: "Bilateral cataract surgery — missing laterality modifier",
  category: "NCCI PTP",
  lede: "Two lines of 66984, same DOS, same provider, no -RT/-LT or -50. The canonical NCCI PTP denial.",
  claim: {
    id: "EX-0001",
    formType: "CMS-1500",
    patient: { id: "P-77421", age: 74, sex: "F" },
    provider: { id: "NPI-1234567890", name: "Sierra Vista Eye Associates", specialty: "Ophthalmology" },
    dx: ["H25.13 (age-related nuclear cataract, bilateral)"],
    lines: [
      { lineNo: 1, code: "66984", description: "Cataract extraction with IOL insertion", dos: "2026-02-14", pos: "22", units: 1, charge: "$2,450.00" },
      { lineNo: 2, code: "66984", description: "Cataract extraction with IOL insertion", dos: "2026-02-14", pos: "22", units: 1, charge: "$2,450.00" },
    ],
    note: "Both eyes operated on the same session.",
  },
  edit: {
    ruleName: "NCCI PTP: same code, no override modifier",
    category: "NCCI PTP",
    carc: "236",
    rarc: "M80",
    message:
      "CPT 66984 appears on two lines for the same DOS/provider/patient without a laterality (-LT/-RT) or bilateral (-50) modifier. Second line denies.",
    involvedCodes: ["66984 ×2"],
  },
  resolutionTitle: "Resubmit with laterality modifiers",
  resolution:
    "Rebill line 1 as <code>66984-RT</code> and line 2 as <code>66984-LT</code>, or (depending on payer rules) consolidate to a single line <code>66984-50</code> at 150% payment. Check the payer's bilateral policy before choosing between the two forms.",
  sources: [
    { label: "CMS NCCI Policy Manual", url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual" },
  ],
};
