import type { Tutorial } from "../../types.js";

export const duplicateVsRepeat: Tutorial = {
  slug: "duplicate-vs-repeat",
  title: "Duplicate vs. repeat — is modifier 76/77 warranted?",
  category: "Duplicate",
  lede: "Telling a billing mistake from a legitimately repeated service.",
  steps: [
    {
      title: "The question",
      body:
        "When the same CPT code shows up twice for the same patient on the same DOS, it's either a duplicate (billing error — deny one) or a repeat (both legitimate — the second line needs modifier 76 for same-provider, 77 for different-provider). This tutorial walks three scenarios where you have to decide.",
    },
    {
      title: "Case A: two EKGs, no modifier",
      body:
        "A cardiology clinic bills CPT 93000 twice on the same DOS for the same patient, same provider, no modifiers. The note mentions only one EKG was performed.",
      claim: {
        id: "TRN-DUP-A",
        formType: "CMS-1500",
        patient: { id: "P-4001", age: 72, sex: "M" },
        provider: { id: "NPI-30", name: "Harborview Cardiology", specialty: "Cardiology" },
        dx: ["I48.91 (atrial fibrillation, unspecified)"],
        lines: [
          { lineNo: 1, code: "93000", description: "EKG with interpretation and report", dos: "2026-03-18", pos: "11", units: 1 },
          { lineNo: 2, code: "93000", description: "EKG with interpretation and report", dos: "2026-03-18", pos: "11", units: 1 },
        ],
      },
      quiz: {
        prompt: "What should happen?",
        options: [
          {
            id: "deny",
            text: "Deny line 2 as a duplicate (CARC 18).",
            correct: true,
            rationale:
              "Same everything, no modifier, documentation supports only one EKG. This is a clean duplicate — line 2 denies and the provider should correct their billing.",
          },
          {
            id: "76",
            text: "Pay both; assume a repeat was performed.",
            correct: false,
            rationale:
              "Without modifier 76 and without documentation of a repeat, the system has no reason to treat this as anything other than a duplicate billing error.",
          },
        ],
      },
    },
    {
      title: "Case B: two X-rays, with modifier 76",
      body:
        "A patient presents to the ED with chest pain. Initial CXR (CPT 71046) is performed. Two hours later, after a procedure, a repeat CXR is performed to confirm placement. The second line is billed with modifier 76. Notes support both studies.",
      claim: {
        id: "TRN-DUP-B",
        formType: "CMS-1500",
        patient: { id: "P-4002", age: 55, sex: "F" },
        provider: { id: "NPI-31", name: "Mercy Emergency Radiology", specialty: "Radiology" },
        dx: ["R07.9 (chest pain, unspecified)"],
        lines: [
          { lineNo: 1, code: "71046", description: "Chest X-ray, 2 views", dos: "2026-03-19", pos: "23", units: 1 },
          {
            lineNo: 2,
            code: "71046",
            modifiers: ["76"],
            description: "Chest X-ray, 2 views — repeat",
            dos: "2026-03-19",
            pos: "23",
            units: 1,
          },
        ],
      },
      quiz: {
        prompt: "What should happen?",
        options: [
          {
            id: "pay",
            text: "Pay both — modifier 76 signals a legitimate repeat by the same provider.",
            correct: true,
            rationale:
              "Modifier 76 plus documentation of a clinically-justified repeat is exactly what the modifier is for. The secondary edit lets both lines through.",
          },
          {
            id: "deny",
            text: "Deny line 2 — two X-rays on the same DOS are always a duplicate.",
            correct: false,
            rationale:
              "Two X-rays on the same DOS are often appropriate (serial imaging to confirm changes). Modifier 76 is the mechanism for communicating that.",
          },
        ],
      },
    },
    {
      title: "Case C: same code, different provider",
      body:
        "A primary-care physician performs an EKG at 9am. The patient is then seen by a consulting cardiologist in the same clinic at 2pm who performs a repeat EKG to compare. Both providers bill 93000. The cardiologist appends modifier 76.",
      quiz: {
        prompt: "Is modifier 76 correct on the cardiologist's line?",
        options: [
          {
            id: "76",
            text: "Yes — 76 because it's a repeat.",
            correct: false,
            rationale:
              "76 is for repeat by the SAME provider. Two different providers performing the same service use modifier 77.",
          },
          {
            id: "77",
            text: "No — modifier 77 applies because the repeat is by a different provider.",
            correct: true,
            rationale:
              "77 = repeat procedure by a different physician. With 77, both EKGs pay. Billing 76 in this situation would actually cause the edit to deny because the system sees one provider's claim and can't reconcile a 76.",
          },
        ],
      },
    },
    {
      title: "Takeaways",
      body:
        "Two quick tests. First: the modifier must match who's repeating (76 = same provider, 77 = different). Second: documentation must actually support the repeat — two lines with a modifier and no narrative justification will still attract post-payment audit. A lot of post-payment recovery dollars come from unmoderated duplicates and from modifier 76/77 used as a blanket workaround for resubmitting rejected claims.",
    },
  ],
  sources: [
    { label: "CMS Repeat or Duplicate Services", url: "https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleId=53482" },
    { label: "PCG Software: CARC / RARC primer", url: "https://www.pcgsoftware.com/what-is-carc-and-rarc-in-claims-adjudication-and-medical-billing" },
  ],
};
