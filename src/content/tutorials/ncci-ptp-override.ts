import type { Tutorial } from "../../types.js";

export const ncciPtpOverride: Tutorial = {
  slug: "ncci-ptp-override",
  title: "NCCI PTP override — when 59 / X{EPSU} is (and isn't) justified",
  category: "NCCI PTP",
  lede: "PTP edits bundle two codes. Modifier 59 and the newer X{EPSU} modifiers can override the bundle — but only when the services really were distinct.",
  steps: [
    {
      title: "The rule",
      body:
        "NCCI PTP edits list pairs of CPT/HCPCS codes that shouldn't normally be paid together. Each pair carries a modifier indicator: 0 means no override is ever allowed, 1 means an appropriate modifier (59 or the more-specific X modifiers) can override. In this tutorial we'll decide when an override is justified.",
    },
    {
      title: "Claim A: two scope procedures, same session",
      body:
        "A GI procedure bills CPT 43235 (EGD with biopsy) and CPT 43249 (EGD with balloon dilation) on the same DOS. 43235 is Column Two to 43249 (the more complex procedure). The coder appends -59 to 43235 to force payment of both.",
      claim: {
        id: "TRN-PTP-A",
        formType: "CMS-1500",
        patient: { id: "P-2001", age: 67, sex: "M" },
        provider: { id: "NPI-10", name: "Cascade GI", specialty: "Gastroenterology" },
        dx: ["K22.2 (esophageal stricture)"],
        lines: [
          { lineNo: 1, code: "43249", description: "EGD with balloon dilation of esophagus", dos: "2026-04-02", pos: "24", units: 1 },
          { lineNo: 2, code: "43235", modifiers: ["59"], description: "EGD with biopsy", dos: "2026-04-02", pos: "24", units: 1 },
        ],
        note: "Scope introduced once; biopsy and dilation performed during the same pass.",
      },
      quiz: {
        prompt: "Is modifier 59 justified on 43235?",
        options: [
          {
            id: "no",
            text: "No — same scope, same session, same anatomy; the biopsy bundles into the dilation.",
            correct: true,
            rationale:
              "The services were done in a single scope pass on the same anatomic site; there's no 'separate encounter / separate structure' that would support 59. CMS has explicitly flagged this pattern as modifier 59 abuse.",
          },
          {
            id: "yes",
            text: "Yes — both procedures were performed and should both be paid.",
            correct: false,
            rationale:
              "Performing both procedures doesn't by itself justify 59. The NCCI manual explains that the more-inclusive scope procedure absorbs the less-inclusive one during the same session.",
          },
        ],
        wrapUp:
          "When in doubt: if X{EPSU} doesn't clearly apply (different encounter, structure, practitioner, or 'other unusual'), 59 probably shouldn't either.",
      },
    },
    {
      title: "Claim B: two sessions same day",
      body:
        "A patient has a colonoscopy (CPT 45378) in the morning for screening, then returns to the ER in the afternoon with a new GI bleed and receives a second colonoscopy with control of bleeding (CPT 45382). Same provider group. The coder appends -XE to the second procedure.",
      claim: {
        id: "TRN-PTP-B",
        formType: "CMS-1500",
        patient: { id: "P-2002", age: 71, sex: "F" },
        provider: { id: "NPI-11", name: "Cascade GI", specialty: "Gastroenterology" },
        dx: ["Z12.11 (screening for colon neoplasm)", "K92.2 (GI hemorrhage)"],
        lines: [
          { lineNo: 1, code: "45378", description: "Diagnostic colonoscopy", dos: "2026-04-05", pos: "22", units: 1 },
          { lineNo: 2, code: "45382", modifiers: ["XE"], description: "Colonoscopy with control of bleeding", dos: "2026-04-05", pos: "23", units: 1 },
        ],
        note: "Morning screening, afternoon ER return for unrelated GI bleed.",
      },
      quiz: {
        prompt: "Is modifier XE (separate encounter) appropriate here?",
        options: [
          {
            id: "yes",
            text: "Yes — morning screening and afternoon ER visit are separate encounters for distinct clinical reasons.",
            correct: true,
            rationale:
              "XE is specifically for separate-encounter situations on the same DOS. The clinical picture (morning screening, afternoon ER bleed) fits exactly.",
          },
          {
            id: "no",
            text: "No — only modifier 59 can override NCCI PTP edits.",
            correct: false,
            rationale:
              "The X{EPSU} modifiers are the preferred, more-specific replacements for 59. Using XE is actually better than 59 when it fits.",
          },
        ],
      },
    },
    {
      title: "Claim C: a '0' indicator pair",
      body:
        "A claim bills CPT 31231 (nasal endoscopy, diagnostic) and CPT 31237 (nasal endoscopy, surgical, with removal of polyps, etc.) on the same DOS. 31231 is Column Two to 31237 with PTP indicator 0 (no override allowed). The coder tries to append -59 to 31231.",
      quiz: {
        prompt: "What happens?",
        options: [
          {
            id: "denies",
            text: "The 31231 line still denies regardless of the modifier. A '0' indicator means no override is ever allowed.",
            correct: true,
            rationale:
              "PTP indicator 0 pairs cannot be overridden by any modifier. The diagnostic scope is always inclusive of the surgical scope on the same DOS. Forcing 59 here is both ineffective and potentially flagged as gaming.",
          },
          {
            id: "pays",
            text: "Modifier 59 pays any pair if the documentation supports distinctness.",
            correct: false,
            rationale:
              "That's true only for '1' indicator pairs. For '0' pairs, no documentation and no modifier creates payment. Always check the indicator before attempting an override.",
          },
        ],
      },
    },
    {
      title: "Takeaways",
      body:
        "Three rules of thumb: (1) Check the PTP indicator — 0 pairs are never overridable. (2) Prefer the most specific X{EPSU} modifier over 59 when one fits. (3) 'Both procedures were performed' is not by itself a reason to override — the edit is asking whether they were distinct, not whether they happened. Audit programs disproportionately target modifier-59 overrides, so downstream secondary-edit logic often treats 59 with more skepticism than the X modifiers.",
    },
  ],
  sources: [
    { label: "CMS NCCI PTP Edits", url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-procedure-procedure-ptp-edits" },
    { label: "AAPC / Clinicient NCCI Guide", url: "https://www.clinicient.com/guide/ncci-edits/" },
  ],
};
