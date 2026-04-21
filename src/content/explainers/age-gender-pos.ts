import type { Explainer } from "../../types.js";

export const ageGenderPos: Explainer = {
  slug: "age-gender-pos",
  title: "Age / Gender / Place-of-Service Appropriateness",
  category: "Age / Gender / POS",
  oneLiner: "Procedure doesn't match the patient's demographics or the setting.",
  definition:
    "This family of edits denies or pends claims whose procedure, diagnosis, or setting is inconsistent with the beneficiary's age or sex, or with the Place-of-Service (POS) code on the claim. CMS publishes gender-specific and age-specific code lists; payers layer their own clinical policy on top.",
  whenItFires: [
    "A gender-specific procedure is billed for a patient of the incompatible sex (e.g., CPT 55700 prostate biopsy for a patient coded female).",
    "An age-specific procedure is billed outside the allowed age range (e.g., pediatric vaccine administration code for an adult).",
    "POS is inappropriate for the service (e.g., an inpatient-only procedure billed with POS 11 office).",
  ],
  keyReferences: [
    "CMS OPPS Addendum B and inpatient-only code lists",
    "Procedure age limits (e.g., newborn care codes, pediatric-only vaccinations)",
    "POS code set (02/10 for telehealth, 11 office, 21 inpatient, 22 outpatient hospital, 23 ER, 31 SNF, 32 nursing facility)",
  ],
  edgeCases: [
    "Gender discrepancies are sometimes legitimate for transgender patients; payers are increasingly accommodating via special modifiers or policy carve-outs (e.g., modifier KX, condition code 45).",
    "Errors are often upstream — wrong patient demographic on file, not wrong procedure.",
    "Telehealth POS rules changed repeatedly during and after COVID; policy has to match the DOS rules in force at the time of service.",
  ],
  miniExample: {
    summary:
      "A claim for CPT 99463 (newborn care, discharge same day as admission) is submitted for a patient with age 54 on file. The code is restricted to neonates.",
    resolution:
      "The edit fires because the patient age is out of range. If the age on file is wrong (data-entry error), the coverage/eligibility file must be corrected and the claim resubmitted. If the age is correct, the wrong code was billed and the correct E/M should be substituted.",
  },
  sources: [
    {
      label: "CMS POS Code Set",
      url: "https://www.cms.gov/Medicare/Coding/place-of-service-codes/Place_of_Service_Code_Set",
    },
    {
      label: "CMS OPPS inpatient-only list",
      url: "https://www.cms.gov/Medicare/Medicare-Fee-for-Service-Payment/HospitalOutpatientPPS",
    },
  ],
};
