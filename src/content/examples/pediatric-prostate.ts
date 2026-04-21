import type { Example } from "../../types.js";

export const pediatricProstate: Example = {
  slug: "pediatric-prostate",
  title: "Prostate biopsy for a patient coded female — gender mismatch",
  category: "Age / Gender / POS",
  lede: "A gender-specific procedure on a patient whose sex field is incompatible — classic demographic edit.",
  claim: {
    id: "EX-0006",
    formType: "CMS-1500",
    patient: { id: "P-99002", age: 58, sex: "F" },
    provider: { id: "NPI-6006006006", name: "Riverside Urology", specialty: "Urology" },
    dx: ["C61 (malignant neoplasm of prostate)"],
    lines: [
      { lineNo: 1, code: "55700", description: "Biopsy of prostate; needle or punch, single or multiple", dos: "2026-05-18", pos: "22", units: 1 },
    ],
  },
  edit: {
    ruleName: "Gender-specific procedure / sex mismatch",
    category: "Age / Gender / POS",
    carc: "7",
    message:
      "CPT 55700 is gender-specific (male anatomy). The patient's sex on file is F, so the procedure is flagged as inconsistent with patient demographics.",
    involvedCodes: ["55700", "patient sex F"],
  },
  resolutionTitle: "Verify patient demographics; use demographic-override mechanism if applicable",
  resolution:
    "Most often this is an eligibility-file error — a wrong sex code on the patient record. Correct it in eligibility and resubmit. For transgender patients where the anatomy does not match the coverage sex code, Medicare supports condition code 45 on institutional claims and the KX modifier on professional claims (with policy requirements); commercial payers vary.",
  sources: [
    { label: "CMS: Sex-Specific Services Policy", url: "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/HospitalOutpatientPPS" },
  ],
};
