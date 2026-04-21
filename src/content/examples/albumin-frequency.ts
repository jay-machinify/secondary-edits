import type { Example } from "../../types.js";

export const albuminFrequency: Example = {
  slug: "albumin-frequency",
  title: "Albumin test frequency — too often in one month",
  category: "Frequency",
  lede: "Four serum albumin tests in the same month for a single patient in a routine outpatient setting — frequency edit fires.",
  claim: {
    id: "EX-0005",
    formType: "CMS-1500",
    patient: { id: "P-22145", age: 61, sex: "M" },
    provider: { id: "NPI-5005005005", name: "Lakeshore Internal Medicine", specialty: "Internal medicine" },
    dx: ["Z00.00 (encounter for general adult medical exam)"],
    lines: [
      { lineNo: 1, code: "82040", description: "Albumin; serum", dos: "2026-04-02", pos: "11", units: 1 },
      { lineNo: 2, code: "82040", description: "Albumin; serum", dos: "2026-04-09", pos: "11", units: 1 },
      { lineNo: 3, code: "82040", description: "Albumin; serum", dos: "2026-04-16", pos: "11", units: 1 },
      { lineNo: 4, code: "82040", description: "Albumin; serum", dos: "2026-04-23", pos: "11", units: 1 },
    ],
    note: "Four tests in 22 days with a routine Dx.",
  },
  edit: {
    ruleName: "Frequency / utilization: 82040 exceeds monthly threshold for Z00.00",
    category: "Frequency",
    carc: "151",
    message:
      "Payer frequency policy for 82040 with a routine Dx (Z00.00) allows 1–2 tests per month. Claims 3 and 4 exceed the threshold and pend for medical review or deny.",
    involvedCodes: ["82040 ×4"],
  },
  resolutionTitle: "Review clinical justification; update Dx if appropriate",
  resolution:
    "If the patient has a condition that warrants serial albumin monitoring (e.g., nephrotic syndrome, severe liver disease, protein-losing enteropathy), the claim Dx should reflect that condition, not Z00.00. Resubmit with correct Dx codes — the edit typically lifts once the Dx supports the clinical frequency.",
  sources: [
    { label: "HMS: Role of Claim Edits in Medical Billing", url: "https://hmsgroupinc.com/what-are-claim-edits-in-medical-billing/" },
  ],
};
