import type { Explainer } from "../../types.js";

export const frequency: Explainer = {
  slug: "frequency",
  title: "Frequency / Utilization Edits",
  category: "Frequency",
  oneLiner: "Service billed more often than policy or clinical norms allow over a time window.",
  definition:
    "Frequency edits compare a claim against the patient's claim history to determine whether the service exceeds policy-defined limits across a rolling time window — e.g., a preventive colonoscopy once per 10 years, an annual wellness visit once per year, a set of PT sessions per calendar month. Unlike MUEs, which are same-DOS unit caps, frequency edits span time.",
  whenItFires: [
    "The new claim plus historical claims for the same beneficiary exceed a policy-defined limit for the period.",
    "A preventive service is billed earlier than the allowed re-screening interval.",
    "Therapy services exceed a visit cap without an approved exceptions process or treatment-plan modifier.",
  ],
  keyReferences: [
    "Medicare preventive-service schedules (annual wellness visit, screening colonoscopy, screening mammography, etc.)",
    "Commercial medical-policy frequency limits (plan-specific)",
    "Therapy caps and the KX modifier exception process",
  ],
  edgeCases: [
    "Frequency windows can be calendar-year, rolling 365 days, or lifetime — read the policy carefully.",
    "A change of diagnosis (e.g., screening → diagnostic) can exempt a service from a screening frequency limit.",
    "Post-payment frequency audits are common even when pre-pay editing doesn't catch the overage.",
  ],
  miniExample: {
    summary:
      "Patient received a screening colonoscopy (CPT 45378) in 2021 with average-risk diagnosis. In 2026, the same patient submits another screening colonoscopy under the same diagnosis. Medicare allows one screening every 10 years for average-risk patients.",
    resolution:
      "The 2026 claim denies on frequency. If the 2026 procedure was diagnostic (not screening) because of new symptoms, the provider should resubmit with the appropriate Dx code and a screening-to-diagnostic modifier (e.g., modifier PT on Medicare), which changes the edit outcome.",
  },
  sources: [
    {
      label: "CMS Preventive Services",
      url: "https://www.cms.gov/Medicare/Prevention/PrevntionGenInfo/medicare-preventive-services",
    },
    {
      label: "HMS: Role of Claim Edits in Medical Billing",
      url: "https://hmsgroupinc.com/what-are-claim-edits-in-medical-billing/",
    },
  ],
};
