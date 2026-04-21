import type { Example } from "../../types.js";

export const duplicateXray: Example = {
  slug: "duplicate-xray",
  title: "Duplicate chest X-ray — same DOS, no repeat modifier",
  category: "Duplicate",
  lede: "Two 71020s, same patient/provider/DOS. No modifier. Exact duplicate.",
  claim: {
    id: "EX-0003",
    formType: "CMS-1500",
    patient: { id: "P-58210", age: 68, sex: "F" },
    provider: { id: "NPI-9988776655", name: "Pine Ridge Imaging", specialty: "Radiology" },
    dx: ["R05 (cough)"],
    lines: [
      { lineNo: 1, code: "71020", modifiers: ["26"], description: "Chest X-ray, 2 views — professional component", dos: "2026-05-10", pos: "22", units: 1 },
      { lineNo: 2, code: "71020", modifiers: ["26"], description: "Chest X-ray, 2 views — professional component", dos: "2026-05-10", pos: "22", units: 1 },
    ],
  },
  edit: {
    ruleName: "Exact duplicate service",
    category: "Duplicate",
    carc: "18",
    message:
      "Line 2 matches line 1 on beneficiary + provider + code + modifiers + DOS. Denies as exact duplicate.",
    involvedCodes: ["71020-26 ×2"],
  },
  resolutionTitle: "Investigate duplicate billing; use -76 only if truly repeated",
  resolution:
    "If both lines represent the same interpretation (billing error), drop line 2. If the second read was a genuine repeat (e.g., different radiologist reviewed after clinical change), use modifier <code>-76</code> (same provider) or <code>-77</code> (different provider) and attach clinical justification.",
  sources: [
    { label: "CMS Repeat or Duplicate Services", url: "https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleId=53482" },
  ],
};
