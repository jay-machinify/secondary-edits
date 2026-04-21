import type { GlossaryEntry } from "../types.js";

export const glossary: GlossaryEntry[] = [
  {
    term: "CPT",
    full: "Current Procedural Terminology",
    definition:
      "A 5-digit numeric code set maintained by the AMA that describes medical, surgical, and diagnostic services. Used on professional claims to tell the payer what was done.",
    seeAlso: ["HCPCS", "Modifier"],
  },
  {
    term: "HCPCS",
    full: "Healthcare Common Procedure Coding System",
    definition:
      "Procedure-code system that extends CPT. Level I is CPT itself; Level II (A-V prefix codes) covers drugs, DME, supplies, and non-physician services (e.g., J1234 for drugs, A0428 for ambulance).",
  },
  {
    term: "ICD-10",
    full: "International Classification of Diseases, 10th revision",
    definition:
      "Diagnosis-code system (ICD-10-CM in the US) used to describe a patient's condition. Alphanumeric and hierarchical — e.g., E11.9 for type 2 diabetes without complications.",
  },
  {
    term: "Modifier",
    definition:
      "A 2-character suffix appended to a CPT/HCPCS code that refines meaning — e.g., -RT/-LT for laterality, -25 for a distinct E/M service, -59/-X{EPSU} to indicate a distinct procedural service.",
  },
  {
    term: "CMS-1500",
    definition:
      "The standard professional (physician / non-institutional) paper claim form, and the 837P electronic equivalent. Uses CPT/HCPCS codes and no revenue codes.",
  },
  {
    term: "UB-04",
    full: "CMS-1450",
    definition:
      "The standard institutional claim form used by hospitals, SNFs, home health, hospice, and similar facilities. Uses revenue codes plus CPT/HCPCS/ICD.",
  },
  {
    term: "Revenue code",
    definition:
      "A 3–4 digit code used only on institutional (UB-04) claims that identifies the hospital department where a service was provided — e.g., 0481 operating room, 0450 ER.",
  },
  {
    term: "DRG",
    full: "Diagnosis-Related Group",
    definition:
      "A case-mix grouper used to pay hospital inpatient claims. Bundles the principal diagnosis, secondary diagnoses, procedures, and patient attributes into a single fixed reimbursement amount.",
  },
  {
    term: "DOS",
    full: "Date of Service",
    definition:
      "The calendar date on which the service on a claim line was rendered. Many secondary edits (NCCI PTP, duplicates, global period) use DOS as a key comparison field.",
  },
  {
    term: "POS",
    full: "Place of Service",
    definition:
      "A 2-digit code identifying where a service was performed — e.g., 11 office, 21 inpatient hospital, 22 outpatient hospital, 23 emergency room. Some edits fire based on POS appropriateness.",
  },
  {
    term: "E/M",
    full: "Evaluation and Management",
    definition:
      "A class of CPT codes (99202–99499 range) covering office visits, hospital visits, consultations, and similar cognitive services. Often the center of modifier 25 debates.",
  },
  {
    term: "NCCI",
    full: "National Correct Coding Initiative",
    definition:
      "A CMS program that publishes edits preventing improper Medicare Part B payment. Includes PTP edits (code-pair denials), MUEs (unit-of-service ceilings), and an add-on code edit file.",
    seeAlso: ["PTP", "MUE"],
  },
  {
    term: "PTP",
    full: "Procedure-to-Procedure edit",
    definition:
      "NCCI edit that identifies code pairs that should not normally be billed together. The Column One code pays; the Column Two code denies unless an appropriate modifier overrides.",
  },
  {
    term: "MUE",
    full: "Medically Unlikely Edit",
    definition:
      "An NCCI unit-of-service ceiling — the maximum number of units of a given HCPCS/CPT code that a single provider would report for a single beneficiary on a single date of service under almost any circumstance.",
  },
  {
    term: "Add-on code",
    definition:
      "A CPT code that may only be billed in addition to a specified primary procedure (listed in the CPT manual with a + symbol). NCCI add-on edits deny it when the primary isn't present.",
  },
  {
    term: "Global surgical package",
    definition:
      "The services bundled into the payment for a surgical procedure: pre-op the day before/day of, the surgery itself, and typical post-op care for 0, 10, or 90 days depending on the procedure.",
  },
  {
    term: "Global period",
    definition:
      "The post-operative window during which routine follow-up care is included in the original surgical payment (0, 10, or 90 days for Medicare major/minor procedures).",
  },
  {
    term: "Modifier 25",
    definition:
      "Indicates a significant, separately identifiable E/M service by the same provider on the same DOS as a procedure. Used when an E/M addresses something beyond the decision-to-perform-procedure.",
  },
  {
    term: "Modifier 59",
    definition:
      "Distinct procedural service — signals that two services that would normally bundle were actually separate (different session, site, encounter). CMS prefers the more specific X{EPSU} modifiers where they apply.",
  },
  {
    term: "Modifier XE",
    definition:
      "Separate encounter — a more specific replacement for modifier 59 when the two services occurred during separate patient encounters.",
  },
  {
    term: "Modifier XS",
    definition:
      "Separate structure — a more specific replacement for modifier 59 when the services were performed on separate organs or anatomical structures.",
  },
  {
    term: "Modifier XP",
    definition:
      "Separate practitioner — more specific replacement for modifier 59 indicating the two services were performed by different practitioners.",
  },
  {
    term: "Modifier XU",
    definition:
      "Unusual non-overlapping service — more specific replacement for modifier 59 used when no other X modifier fits.",
  },
  {
    term: "Modifier 50",
    definition:
      "Bilateral procedure — indicates a procedure performed on both sides of the body at the same session. Alternative to -RT/-LT depending on payer rules.",
  },
  {
    term: "Modifier 76",
    definition:
      "Repeat procedure by the same physician — same service, same DOS, same provider, genuinely repeated (not a duplicate billing).",
  },
  {
    term: "Modifier 77",
    definition:
      "Repeat procedure by a different physician — same as 76 but when a different provider repeats the service.",
  },
  {
    term: "Modifier 58",
    definition:
      "Staged or related procedure during a post-op period — planned, more extensive, or for therapy. Resets the global period.",
  },
  {
    term: "Modifier 78",
    definition:
      "Unplanned return to the OR for a related procedure during the post-op period. Does NOT reset the global period.",
  },
  {
    term: "Modifier 79",
    definition:
      "Unrelated procedure by the same physician during the post-op period. Starts a new global period for the unrelated procedure.",
  },
  {
    term: "Modifier 26",
    definition:
      "Professional component only — signals the physician's interpretation of a diagnostic test, separated from the technical (equipment) component billed with TC.",
  },
  {
    term: "CARC",
    full: "Claim Adjustment Reason Code",
    definition:
      "Standard code on a remittance advice explaining why a payer adjusted a claim (denied, reduced, or otherwise altered). Maintained by the X12 Claim Adjustment Reason Code Committee.",
  },
  {
    term: "RARC",
    full: "Remittance Advice Remark Code",
    definition:
      "Supplementary code on a remittance advice that explains or qualifies a CARC. RARCs add detail; CARCs give the primary reason.",
  },
  {
    term: "EOB",
    full: "Explanation of Benefits",
    definition:
      "The statement sent to the member (and, in provider-facing form, to the provider via the remittance advice) explaining which services were covered, denied, and the patient's responsibility.",
  },
  {
    term: "LCD",
    full: "Local Coverage Determination",
    definition:
      "Coverage decision issued by a Medicare Administrative Contractor (MAC) for its region. Specifies what services are reasonable and necessary. May not contradict an NCD.",
  },
  {
    term: "NCD",
    full: "National Coverage Determination",
    definition:
      "CMS-wide coverage policy binding nationally. Takes precedence over LCDs.",
  },
  {
    term: "MAC",
    full: "Medicare Administrative Contractor",
    definition:
      "A private insurer contracted by CMS to process Medicare Part A/B claims for a specific geographic jurisdiction. Issues LCDs and handles claim appeals.",
  },
  {
    term: "COB",
    full: "Coordination of Benefits",
    definition:
      "The process of determining which payer pays first when a patient has multiple insurance coverages. Secondary edits may run after COB resolves payer order.",
  },
  {
    term: "FWA",
    full: "Fraud, Waste, and Abuse",
    definition:
      "An umbrella term for improper claims behavior. Fraud is intentional deception for gain; waste is overuse; abuse is practices inconsistent with accepted medical, business, or fiscal norms.",
  },
  {
    term: "SIU",
    full: "Special Investigations Unit",
    definition:
      "The team at a payer responsible for investigating potential FWA, often triggered by patterns that secondary and tertiary edits surface.",
  },
  {
    term: "Pre-payment edit",
    definition:
      "An edit applied before the claim is paid, either holding it for review or denying it outright. Goal: prevent improper payment.",
  },
  {
    term: "Post-payment edit",
    definition:
      "An edit applied after payment, typically as part of audit or recovery programs. Goal: recoup improperly paid amounts.",
  },
  {
    term: "Unbundling",
    definition:
      "Reporting the components of a bundled procedure separately to receive higher total reimbursement than the bundled code would yield. A common target of secondary edits.",
  },
  {
    term: "Duplicate claim",
    definition:
      "A claim for the same beneficiary, provider, service, and DOS that matches a previously submitted claim. Legitimate repeats use modifier 76/77; true duplicates are denied.",
  },
  {
    term: "Payment integrity",
    definition:
      "The set of payer activities aimed at paying claims accurately — right service, right code, right amount, right patient. Spans eligibility, COB, code editing, clinical review, fraud detection.",
  },
];
