import type { Explainer } from "../../types.js";

export const medicalNecessity: Explainer = {
  slug: "medical-necessity",
  title: "Medical Necessity Edits",
  category: "Medical Necessity",
  oneLiner: "Does the diagnosis actually support the procedure?",
  definition:
    "Medical-necessity edits check whether the ICD-10 diagnosis codes on a claim justify the procedures billed, according to the payer's coverage policy. For Medicare, the test is typically an LCD or NCD that lists covered diagnoses for a given procedure. For commercial payers, it's the plan's medical-policy library.",
  whenItFires: [
    "The procedure has an LCD/NCD or commercial policy that restricts it to a list of covered diagnoses, and none of the claim's Dx codes are on the list.",
    "The procedure requires evidence of conservative treatment or a prerequisite diagnostic finding that isn't reflected in the claim history.",
    "A supporting service is billed without the qualifying primary diagnosis (e.g., vitamin D testing without a Dx indicating deficiency or risk).",
  ],
  keyReferences: [
    "LCD (Local Coverage Determination) — MAC-level policy",
    "NCD (National Coverage Determination) — CMS-wide policy",
    "ABN (Advance Beneficiary Notice) — patient signs acknowledging possible financial responsibility if Medicare denies for necessity",
    "Commercial medical-policy bulletins",
  ],
  edgeCases: [
    "Some services (e.g., preventive screening) are covered regardless of diagnosis if coded as screening; the presence/absence of screening codes flips the edit.",
    "Medical-necessity denials are frequently appealed with medical records — the edit is often a first-pass filter, not a final decision.",
    "'Not medically necessary' is different from 'not covered' — the former is a clinical-policy determination; the latter is a benefit-design question.",
  ],
  miniExample: {
    summary:
      "A Medicare provider bills CPT 83036 (HbA1c) for a patient with Dx Z00.00 (encounter for general adult medical exam without abnormal findings). The MAC's LCD for HbA1c lists diabetes, pre-diabetes, and suspected hyperglycemia as covered diagnoses.",
    resolution:
      "The edit fires — Z00.00 is a routine wellness encounter, not diabetes or pre-diabetes. If the patient has pre-diabetes, the correct Dx (e.g., R73.03) should be on the claim. If there's no supporting Dx, the service is non-covered and the patient should have signed an ABN.",
  },
  sources: [
    {
      label: "CMS Medicare Coverage Determination Process",
      url: "https://www.cms.gov/medicare/coverage/determination-process",
    },
    {
      label: "CMS LCD Database",
      url: "https://www.cms.gov/medicare/coverage/determination-process/local",
    },
  ],
};
