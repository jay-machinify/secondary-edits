import type { Explainer } from "../../types.js";

export const duplicates: Explainer = {
  slug: "duplicates",
  title: "Duplicate Claim Detection",
  category: "Duplicate",
  oneLiner: "Same service, same patient, same DOS — already submitted.",
  definition:
    "Duplicate edits identify claims that match previously received or paid claims on the combination of beneficiary, rendering provider, CPT/HCPCS code, modifiers, units, and date of service. True duplicates are denied; legitimate repeats require a -76 or -77 modifier to signal they're genuinely distinct events.",
  whenItFires: [
    "Exact match on beneficiary + provider + code + modifiers + DOS against an already-adjudicated claim.",
    "Near-duplicate: same patient + code + DOS, differing only in provider tax ID within the same group (often still treated as duplicate depending on payer rules).",
    "Resubmission after a denial, without indicating corrections — often hits a duplicate edit if it's identical to the original.",
  ],
  keyReferences: [
    "Duplicate vs. repeat: duplicate = billed twice in error; repeat = same service genuinely performed again",
    "Modifier 76 = repeat procedure, same provider",
    "Modifier 77 = repeat procedure, different provider",
    "CARC 18 is the canonical 'exact duplicate claim/service' denial",
  ],
  edgeCases: [
    "Repeat labs and imaging on the same DOS are legitimately common — -76 needs to document clinical justification, not just be a checkbox.",
    "Crossover claims (Medicare primary, secondary payer) can look like duplicates if the secondary pays before the crossover syncs.",
    "Split-billing across multiple claims for the same encounter can false-positive duplicate edits without careful dedup logic.",
  ],
  miniExample: {
    summary:
      "A clinic bills CPT 93000 (EKG with interpretation) twice on the same DOS for the same patient, same provider, no modifier on either line.",
    resolution:
      "The second line denies as a duplicate (CARC 18). If the second EKG was clinically necessary (e.g., post-intervention comparison), the provider should resubmit the second line with modifier 76 and documentation supporting the repeat. If it was a billing mistake, no action beyond removing the duplicate.",
  },
  sources: [
    {
      label: "CMS Repeat or Duplicate Services Guidance",
      url: "https://www.cms.gov/medicare-coverage-database/view/article.aspx?articleId=53482",
    },
    {
      label: "PCG Software: CARC / RARC primer",
      url: "https://www.pcgsoftware.com/what-is-carc-and-rarc-in-claims-adjudication-and-medical-billing",
    },
  ],
};
