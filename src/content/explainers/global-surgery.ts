import type { Explainer } from "../../types.js";

export const globalSurgery: Explainer = {
  slug: "global-surgery",
  title: "Global Surgery Package Edits",
  category: "Global Surgery",
  oneLiner: "Visits and services bundled into a prior procedure's post-op window.",
  definition:
    "Medicare and most commercial payers treat surgical payment as a bundled package: pre-operative services (day before / day of), the procedure itself, and a defined number of days of routine post-operative care (0, 10, or 90 days depending on the code). Separate billing of visits or procedures that fall inside that window is denied unless a modifier establishes that the service was unrelated or unplanned.",
  whenItFires: [
    "An E/M or procedure is billed during the global period of an earlier surgical claim for the same patient + same provider.",
    "No global-period modifier (24, 25, 57, 58, 78, 79) establishes the service as exempt.",
    "The prior procedure's global indicator (000 / 010 / 090) defines the window length.",
  ],
  keyReferences: [
    "Global indicator 000 = 0-day (endoscopies, minor procedures, same-day only)",
    "Global indicator 010 = 10-day minor procedure window",
    "Global indicator 090 = 90-day major procedure window",
    "Pre-op visit the day of surgery is included (use modifier 57 for 'decision for surgery' E/M on major procedures)",
    "Modifier 58 = staged/related, planned; 78 = unplanned return to OR, related; 79 = unrelated procedure",
  ],
  edgeCases: [
    "Different specialty / different provider within the same group: CMS generally treats same-group-same-specialty as one entity for global purposes. Split-specialty groups have to be careful here.",
    "A 58/78/79 on a post-op procedure resets (58/79) or does NOT reset (78) the global clock for the new procedure.",
    "E/M in the global period for reasons unrelated to the surgery requires modifier 24.",
    "Assistant-at-surgery add-ons and staged procedures interact with global periods in specialty-specific ways.",
  ],
  miniExample: {
    summary:
      "Patient had a CABG (CPT 33533, 90-day global) on Jan 10. On Feb 2 the same surgeon bills 99213 for an office visit. No modifier.",
    resolution:
      "The 99213 line denies as included in the global package. If the visit was truly for an unrelated problem (say, a rash), the surgeon should resubmit with modifier 24 plus a different primary diagnosis. If it was for a surgical complication handled in-office (not requiring a trip to the OR), it is not separately billable.",
  },
  sources: [
    {
      label: "AAPC Global Surgery Coding Guide",
      url: "https://www.aapc.com/blog/46373-your-quick-guide-to-the-global-surgical-package/",
    },
    {
      label: "Outsource Strategies: Modifiers 58 / 78 / 79",
      url: "https://www.outsourcestrategies.com/resources/correct-use-modifiers-58-78-79/",
    },
  ],
};
