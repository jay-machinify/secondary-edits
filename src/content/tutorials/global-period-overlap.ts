import type { Tutorial } from "../../types.js";

export const globalPeriodOverlap: Tutorial = {
  slug: "global-period-overlap",
  title: "Global period overlap — modifier 58 vs 78 vs 79",
  category: "Global Surgery",
  lede: "Picking between 58, 78, and 79 when a procedure lands inside another surgery's post-op window.",
  steps: [
    {
      title: "Quick reference",
      body:
        "Inside a global period, procedures by the same provider need a modifier to explain why they're separately billable. The three workhorse choices: 58 = staged / planned / more extensive (resets global clock). 78 = unplanned return to the OR for a related complication (does NOT reset global). 79 = unrelated procedure by the same provider (starts a fresh global).",
    },
    {
      title: "Case A: planned staged reconstruction",
      body:
        "A patient had a skin cancer excision with temporary closure on Mar 1 (90-day global). Three weeks later, as planned at the index surgery, the same surgeon performs a skin flap for definitive closure.",
      claim: {
        id: "TRN-GBL-A",
        formType: "CMS-1500",
        patient: { id: "P-3001", age: 68, sex: "M" },
        provider: { id: "NPI-20", name: "Beacon Plastic Surgery", specialty: "Plastic surgery" },
        dx: ["C44.319 (basal cell carcinoma of face)"],
        lines: [
          {
            lineNo: 1,
            code: "14041",
            description: "Adjacent tissue transfer/rearrangement, face, 10.1–30.0 sq cm",
            dos: "2026-03-22",
            pos: "22",
            units: 1,
          },
        ],
      },
      quiz: {
        prompt: "Which modifier is correct?",
        options: [
          {
            id: "58",
            text: "58 — staged and planned at the time of the original procedure.",
            correct: true,
            rationale:
              "The definitive closure was planned at the time of the index surgery. Modifier 58 covers staged/planned/more-extensive follow-up during the global period and resets the global clock for the new procedure.",
          },
          {
            id: "78",
            text: "78 — unplanned return to the OR related to the original procedure.",
            correct: false,
            rationale:
              "78 is for unplanned returns (e.g., a bleeding complication that requires going back to the OR). This reconstruction was planned in advance.",
          },
          {
            id: "79",
            text: "79 — unrelated procedure during the global period.",
            correct: false,
            rationale:
              "79 is for genuinely unrelated procedures (different diagnosis, different body part). The flap is the continuation of the same treatment arc.",
          },
        ],
      },
    },
    {
      title: "Case B: an unplanned return",
      body:
        "Same patient, same surgery arc. Two days after the index excision the patient develops significant bleeding at the wound site and the same surgeon takes them back to the OR for wound exploration and hemostasis.",
      quiz: {
        prompt: "Which modifier now?",
        options: [
          {
            id: "58",
            text: "58 — because it's during the global period of the original procedure.",
            correct: false,
            rationale:
              "58 is planned/staged. This return was unplanned.",
          },
          {
            id: "78",
            text: "78 — unplanned return to the OR for a related complication.",
            correct: true,
            rationale:
              "Exactly 78's purpose. Related to the original procedure, unplanned, requires OR. Does not reset the global period — the original 90-day clock keeps ticking from the index surgery.",
          },
          {
            id: "79",
            text: "79 — unrelated procedure.",
            correct: false,
            rationale:
              "The bleed is directly related to the index surgery — 78 applies, not 79.",
          },
        ],
      },
    },
    {
      title: "Case C: a second, unrelated problem",
      body:
        "Same patient, now 6 weeks after the index excision (still within the 90-day global). He develops an acute appendicitis and the same general/plastic surgeon performs a laparoscopic appendectomy (CPT 44970).",
      quiz: {
        prompt: "Which modifier?",
        options: [
          {
            id: "58",
            text: "58 — staged or planned.",
            correct: false,
            rationale:
              "58 requires the procedure to be part of the original treatment plan. Appendicitis is unrelated to the excision.",
          },
          {
            id: "78",
            text: "78 — unplanned return for a related problem.",
            correct: false,
            rationale:
              "78 requires the procedure to be related to the original surgery. Appendicitis isn't related.",
          },
          {
            id: "79",
            text: "79 — unrelated procedure during the global period.",
            correct: true,
            rationale:
              "79 is for procedures that are genuinely unrelated to the original. The appendectomy starts its own 90-day global period — both globals run in parallel now.",
          },
        ],
      },
    },
    {
      title: "Takeaways",
      body:
        "The decision tree: was it planned as part of the original treatment? → 58. Unplanned, related complication? → 78. Unrelated entirely? → 79. And remember that 58 and 79 reset (or start) a new global clock, while 78 does not. Getting this wrong is expensive — the edit fires either as a duplicate/bundled denial (wrong global modifier) or as an improper reset of a global period that triggers downstream claim cascades.",
    },
  ],
  sources: [
    { label: "AAPC Global Surgery Coding Guide", url: "https://www.aapc.com/blog/46373-your-quick-guide-to-the-global-surgical-package/" },
    { label: "Outsource Strategies: Modifiers 58 / 78 / 79", url: "https://www.outsourcestrategies.com/resources/correct-use-modifiers-58-78-79/" },
  ],
};
