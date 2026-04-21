import type { Tutorial } from "../../types.js";

export const modifier25Decision: Tutorial = {
  slug: "modifier-25-decision",
  title: "Modifier 25 decision",
  category: "Modifiers",
  lede: "When is an E/M billed alongside a procedure truly 'significant and separately identifiable'?",
  steps: [
    {
      title: "Set the scene",
      body:
        "Modifier 25 is attached to an E/M (evaluation and management) service billed on the same DOS as a procedure. It's arguably the most contested modifier in the coding world. Abuse is common; appropriate use is common. In this tutorial we'll walk through three claims and decide whether 25 is justified on each.",
    },
    {
      title: "Claim A: the rash and the warts",
      body:
        "A 45-year-old presents for a scheduled wart destruction visit (CPT 17110, destruction of 1–14 benign lesions). During the visit the patient also complains of a new itchy rash on their back, unrelated to the warts. The provider evaluates the rash, documents a separate assessment, and prescribes a topical. The claim bills 17110 and 99213-25.",
      claim: {
        id: "TRN-MOD25-A",
        formType: "CMS-1500",
        patient: { id: "P-1001", age: 45, sex: "F" },
        provider: { id: "NPI-1", name: "North Ridge Family Care", specialty: "Family medicine" },
        dx: ["B07.9 (viral wart)", "L29.8 (pruritus)"],
        lines: [
          {
            lineNo: 1,
            code: "17110",
            description: "Destruction of benign lesions (1–14)",
            dos: "2026-03-11",
            pos: "11",
            units: 1,
          },
          {
            lineNo: 2,
            code: "99213",
            modifiers: ["25"],
            description: "Office E/M, established patient, low complexity",
            dos: "2026-03-11",
            pos: "11",
            units: 1,
          },
        ],
      },
      quiz: {
        prompt: "Is modifier 25 appropriate on the 99213?",
        options: [
          {
            id: "yes",
            text: "Yes — the E/M addressed a separate problem with its own Dx and assessment.",
            correct: true,
            rationale:
              "The rash is unrelated to the scheduled warts procedure, has its own documented assessment and plan, and its own Dx (L29.8). This is the textbook modifier 25 scenario.",
          },
          {
            id: "no",
            text: "No — any E/M on the same day as a procedure rolls into the procedure.",
            correct: false,
            rationale:
              "There's a pre-service E/M component already built into every procedure code. Modifier 25 exists precisely for the case where an E/M goes beyond that — a distinct problem with its own evaluation.",
          },
        ],
        wrapUp:
          "Appropriate 25 use: separate problem, separate documentation, Dx codes generally differ between the procedure and the E/M.",
      },
    },
    {
      title: "Claim B: the skin tag",
      body:
        "A patient is referred to a dermatologist specifically for removal of a skin tag. At the visit, the dermatologist examines the tag, confirms the diagnosis, and removes it (CPT 11200). The claim bills 11200 and 99212-25. The note says 'patient presents for skin tag removal as referred. Tag examined, confirmed benign, removed.'",
      claim: {
        id: "TRN-MOD25-B",
        formType: "CMS-1500",
        patient: { id: "P-1002", age: 61, sex: "M" },
        provider: { id: "NPI-2", name: "Meridian Dermatology", specialty: "Dermatology" },
        dx: ["L91.8 (skin tag)"],
        lines: [
          { lineNo: 1, code: "11200", description: "Removal of skin tags, up to 15", dos: "2026-03-12", pos: "11", units: 1 },
          { lineNo: 2, code: "99212", modifiers: ["25"], description: "Office E/M, established patient, straightforward", dos: "2026-03-12", pos: "11", units: 1 },
        ],
      },
      quiz: {
        prompt: "Is modifier 25 appropriate on the 99212?",
        options: [
          {
            id: "yes",
            text: "Yes — every visit includes some evaluation, so 25 applies.",
            correct: false,
            rationale:
              "The pre-service evaluation is already part of the procedure code's valuation. 25 requires a distinct E/M, not just 'some evaluation.'",
          },
          {
            id: "no",
            text: "No — the E/M was entirely the decision-to-remove-the-tag, which rolls into 11200.",
            correct: true,
            rationale:
              "There's one problem (the tag), one Dx (L91.8), and the E/M did not extend beyond evaluating that problem. Billing an E/M with 25 here would be modifier 25 misuse.",
          },
        ],
        wrapUp:
          "Red flag: single Dx on both lines, and the note describes a single-problem encounter. The E/M should not be separately reported.",
      },
    },
    {
      title: "Claim C: the URI and the EKG",
      body:
        "A patient presents to primary care for upper respiratory infection symptoms. During the exam the provider notices a new irregular pulse, documents the cardiac evaluation, and obtains an in-office EKG (CPT 93000). The claim bills 93000 and 99214-25.",
      claim: {
        id: "TRN-MOD25-C",
        formType: "CMS-1500",
        patient: { id: "P-1003", age: 58, sex: "F" },
        provider: { id: "NPI-3", name: "Valley Primary Associates", specialty: "Family medicine" },
        dx: ["J06.9 (acute upper respiratory infection)", "R00.0 (tachycardia, unspecified)"],
        lines: [
          { lineNo: 1, code: "93000", description: "EKG with interpretation and report", dos: "2026-03-13", pos: "11", units: 1 },
          { lineNo: 2, code: "99214", modifiers: ["25"], description: "Office E/M, established patient, moderate complexity", dos: "2026-03-13", pos: "11", units: 1 },
        ],
      },
      quiz: {
        prompt: "Is modifier 25 appropriate here?",
        options: [
          {
            id: "yes",
            text: "Yes — the E/M evaluated a problem (URI + cardiac finding) beyond the EKG itself.",
            correct: true,
            rationale:
              "The E/M is driven by the URI visit and the new cardiac finding; the EKG is a single diagnostic test ordered during that encounter. Two Dx codes, two tracks of thought, distinct work product.",
          },
          {
            id: "no",
            text: "No — any time an EKG is done the E/M is bundled.",
            correct: false,
            rationale:
              "93000 has a defined pre- and post-service work built in for interpretation, but the E/M that led to ordering it (and covered the URI) is separately billable when distinct.",
          },
        ],
      },
    },
    {
      title: "Takeaways",
      body:
        "The modifier 25 test in plain English: was there a 'real visit' that would have happened even if the procedure didn't? If yes, 25 is appropriate. Two patterns to watch for in secondary editing — blanket use of 25 across every E/M paired with a procedure (likely abuse, audit target), and absence of 25 where the documentation supports it (likely underbilling, provider education opportunity). Both are actionable.",
    },
  ],
  sources: [
    { label: "CMS NCCI Policy Manual", url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual" },
    { label: "AAPC Knowledge Center (modifier 25 guidance)", url: "https://www.aapc.com/blog/" },
  ],
};
