import type { Example } from "../../types.js";

export const globalPeriodCysto: Example = {
  slug: "global-period-cysto",
  title: "Cystoscopy during prostatectomy global period — missing -79",
  category: "Global Surgery",
  lede: "An unrelated cystoscopy performed during a 90-day global without modifier 79 — denies as bundled.",
  claim: {
    id: "EX-0004",
    formType: "CMS-1500",
    patient: { id: "P-40012", age: 66, sex: "M" },
    provider: { id: "NPI-4004004004", name: "Summit Urology", specialty: "Urology" },
    dx: ["C61 (malignant neoplasm of prostate)", "N32.81 (overactive bladder)"],
    lines: [
      { lineNo: 1, code: "52204", description: "Cystourethroscopy with biopsy", dos: "2026-03-22", pos: "22", units: 1 },
    ],
    note: "Prior procedure: CPT 55866 (laparoscopic prostatectomy) 2026-03-01 — 90-day global.",
  },
  edit: {
    ruleName: "Procedure inside global period, no 58/78/79",
    category: "Global Surgery",
    carc: "97",
    message:
      "Procedure 52204 falls within the 90-day global period of 55866 (same patient, same provider) and no global-period modifier establishes it as unrelated or unplanned. Denies as included.",
    involvedCodes: ["52204", "prior 55866"],
  },
  resolutionTitle: "If unrelated to the prostatectomy, resubmit with modifier 79",
  resolution:
    "The overactive bladder workup is unrelated to the prostate cancer surgery. Resubmit the cystoscopy as <code>52204-79</code> so the edit recognizes it as an unrelated procedure. The 52204 starts its own global period from its own DOS.",
  sources: [
    { label: "AAPC Global Surgery Coding Guide", url: "https://www.aapc.com/blog/46373-your-quick-guide-to-the-global-surgical-package/" },
  ],
};
