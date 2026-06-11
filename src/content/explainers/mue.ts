import type { Explainer } from "../../types.js";

export const mue: Explainer = {
  slug: "mue",
  title: "Medically Unlikely Edits (MUEs)",
  category: "MUE",
  oneLiner: "Unit-of-service ceilings per code per beneficiary per DOS.",
  definition:
    "An MUE is the maximum number of units of a particular HCPCS/CPT code that a provider would reasonably report for a single beneficiary on a single date of service under almost any clinical circumstance. CMS publishes MUE values and an MUE Adjudication Indicator (MAI) that describes how the edit behaves.",
  conceptNote: `<div class="concept-box">
  <div class="concept-box-header">The MUE Adjudication Indicator (MAI) — how a unit ceiling behaves</div>
  <p>An MUE is two numbers, not one: the <strong>value</strong> (the unit ceiling) and the <strong>MAI</strong>, which tells the engine <em>how</em> to enforce that ceiling when a claim exceeds it. The same value of "3" behaves very differently depending on its MAI:</p>
  <div class="indicator-grid">
    <div class="indicator-item">
      <span class="indicator-badge mai-1">1</span>
      <span><strong>Line edit.</strong> Excess units on a line deny, but the rest of the line pays. Medically distinct units may be split-billed across separate lines (e.g., with anatomic modifiers).</span>
    </div>
    <div class="indicator-item">
      <span class="indicator-badge mai-2">2</span>
      <span><strong>Date-of-service edit, absolute.</strong> A hard cap for the whole DOS. Any units beyond the ceiling deny and <em>cannot</em> be recovered by split-billing or appeal.</span>
    </div>
    <div class="indicator-item">
      <span class="indicator-badge mai-3">3</span>
      <span><strong>Date-of-service edit, clinical.</strong> Units above the ceiling are clinically unlikely but possible. The line pends for medical review and may be paid with supporting documentation.</span>
    </div>
  </div>
  <p class="concept-footnote">CMS publishes separate MUE tables for <strong>practitioner</strong>, <strong>outpatient-hospital</strong>, and <strong>DME</strong> claim types — the same code can carry a different value in each.</p>
</div>`,
  whenItFires: [
    "A single claim line's units exceed the MUE.",
    "Multiple lines of the same code sum to more than the MUE (depends on MAI).",
    "The MAI determines the response: deny the whole line (MAI 2), deny the excess units (MAI 1), or pend for medical review (MAI 3).",
  ],
  keyReferences: [
    "MAI 1 = line-edit; excess units deny but claim may be split-billed",
    "MAI 2 = date-of-service edit, absolute; deny any units beyond the limit",
    "MAI 3 = date-of-service edit, clinical; may be overridden with documentation",
    "MUE values are published on CMS.gov separately for practitioner, outpatient-hospital, and DME claim types",
  ],
  edgeCases: [
    "Anatomic vs non-anatomic codes: an MUE of 1 on a bilateral procedure may actually mean '1 per side' when split-billed on two lines with -LT/-RT.",
    "Some codes have very low MUE values because the typical case is one unit; bona fide higher volumes can still be billed but may require appeal documentation.",
    "MUEs are separate from frequency edits (which run across DOS over time); MUE is same-day only.",
  ],
  ruleData: {
    intro:
      "CMS publishes the MUE tables on CMS.gov — one table per claim type (practitioner, outpatient-hospital, DME). Each row is just three things: the HCPCS/CPT code, the MUE value (the maximum units for one beneficiary on one DOS), and the MAI. To adjudicate, the engine sums the units billed for a code across all of that code's lines on the same date of service, then compares the total to the row's value. When the total exceeds the value, the MAI alone decides the response — deny the excess, deny the whole DOS, or pend for review.",
    tableHtml: `<div class="ncci-table-preview">
    <table>
      <thead>
        <tr>
          <th>HCPCS/CPT</th>
          <th>MUE Value</th>
          <th>MAI</th>
          <th>Claim Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>17000</td>
          <td>1</td>
          <td>1</td>
          <td>Practitioner</td>
        </tr>
        <tr>
          <td>82947</td>
          <td>3</td>
          <td>2</td>
          <td>Practitioner</td>
        </tr>
        <tr>
          <td>J1745</td>
          <td>80</td>
          <td>3</td>
          <td>Practitioner</td>
        </tr>
      </tbody>
    </table>
  </div>`,
    traceHtml: `<div class="rule-trace">
    <div class="trace-step">
      <div class="trace-label">Units billed for the code on this DOS (summed across lines)</div>
      <div class="trace-box">82947 &nbsp;×&nbsp; <b>12 units</b></div>
    </div>
    <div class="trace-arrow">compare to the MUE row ▼</div>
    <div class="trace-step">
      <div class="trace-label">Matched CMS row</div>
      <div class="trace-box trace-mono">code <b>82947</b> · value <b>3</b> · MAI <b>2</b></div>
    </div>
    <div class="trace-arrow">12 > 3, and MAI 2 = absolute DOS cap ▼</div>
    <div class="trace-verdict verdict-deny">
      <span class="verdict-tag">Denies</span> The entire line denies — MAI 2 is a hard date-of-service cap, so the excess cannot be split-billed or appealed.
    </div>
  </div>`,
    note:
      "Notice the engine compares against the value, but the value never decides the outcome on its own — the MAI does. A value of 1 under MAI 1 is recoverable by split-billing; a value of 3 under MAI 2 is not.",
  },
  workedExamples: [
    {
      title: "1 · MAI 1 — excess units deny, but the line can be split (line edit)",
      claim: {
        id: "EX-MUE-1",
        formType: "CMS-1500",
        patient: { id: "P-60411", age: 71, sex: "M" },
        provider: {
          id: "NPI-3030303030",
          name: "Summit Dermatology",
          specialty: "Dermatology",
        },
        dx: [
          "L57.0 (actinic keratosis), face",
          "L57.0 (actinic keratosis), left forearm",
        ],
        lines: [
          {
            lineNo: 1,
            code: "17000",
            description: "Destruction of premalignant lesion (e.g., actinic keratosis), first lesion",
            dos: "2026-02-03",
            pos: "11",
            units: 2,
            charge: "$180.00",
          },
        ],
        note: "17000 reports only the FIRST lesion; additional lesions use 17003. Two units of 17000 were billed on one line.",
      },
      edit: {
        ruleName: "MUE: units exceed ceiling (MAI 1, line edit)",
        category: "MUE",
        carc: "151",
        rarc: "N362",
        message:
          "CPT 17000 billed with 2 units on one line; the practitioner MUE is 1 (MAI 1). The excess 1 unit denies as a line edit.",
        involvedCodes: ["17000 ×2"],
      },
      whyCaught:
        "The engine summed 17000 to 2 units and matched the MUE row <code>value 1 / MAI 1</code>. By definition 17000 is the <em>first</em> lesion, so its ceiling is 1. Because the MAI is <strong>1</strong> (a line edit), only the excess unit denies — the first unit still pays — and the denial is recoverable if the coding is corrected.",
      resolution:
        "This is a coding error, not a true volume problem. Rebill <code>17000 ×1</code> for the first lesion and report the additional lesion with <code>17003</code> (each additional). MAI 1 lets legitimately distinct units be split onto the correct codes/lines.",
    },
    {
      title: "2 · MAI 2 — the whole line denies, no recovery (absolute DOS cap)",
      claim: {
        id: "EX-MUE-2",
        formType: "CMS-1500",
        patient: { id: "P-22815", age: 49, sex: "F" },
        provider: {
          id: "NPI-4040404040",
          name: "Harbor Point Laboratory",
          specialty: "Clinical Laboratory",
        },
        dx: ["E11.65 (type 2 diabetes with hyperglycemia)"],
        lines: [
          {
            lineNo: 1,
            code: "82947",
            description: "Glucose; quantitative, blood",
            dos: "2026-02-14",
            pos: "81",
            units: 12,
            charge: "$66.00",
          },
        ],
        note: "12 units of quantitative glucose billed for one patient on one DOS.",
      },
      edit: {
        ruleName: "MUE: units exceed ceiling (MAI 2, absolute DOS edit)",
        category: "MUE",
        carc: "151",
        rarc: "N362",
        message:
          "CPT 82947 billed with 12 units; the practitioner MUE is 3 (MAI 2). MAI 2 is an absolute DOS cap, so the entire line denies — not just the excess.",
        involvedCodes: ["82947 ×12"],
      },
      whyCaught:
        "The engine summed 82947 to 12 units against the MUE row <code>value 3 / MAI 2</code>. Twelve quantitative glucose draws on a single date is medically implausible, and the <strong>MAI of 2</strong> makes the cap absolute: when the total exceeds the value, the <em>entire line</em> denies and split-billing cannot recover it.",
      resolution:
        "Stop and investigate before resubmitting — a count this far over the ceiling usually signals miscoding (e.g., point-of-care monitoring or a panel reported under the wrong code) rather than 12 true quantitative tests. Correct the code; you cannot appeal a MAI 2 overage with documentation.",
    },
    {
      title: "3 · MAI 3 — the line pends for medical review (clinical DOS edit)",
      claim: {
        id: "EX-MUE-3",
        formType: "CMS-1500",
        patient: { id: "P-71930", age: 63, sex: "M" },
        provider: {
          id: "NPI-5050505050",
          name: "Northgate Infusion Center",
          specialty: "Hematology/Oncology",
        },
        dx: ["D69.3 (immune thrombocytopenic purpura)"],
        lines: [
          {
            lineNo: 1,
            code: "J1745",
            description: "Injection, infliximab, 10 mg",
            dos: "2026-03-18",
            pos: "11",
            units: 95,
            charge: "$4,560.00",
          },
        ],
        note: "Weight-based dose of 950 mg billed as 95 units of 10 mg. Practitioner MUE is 80 (MAI 3).",
      },
      edit: {
        ruleName: "MUE: units exceed ceiling (MAI 3, clinical DOS edit)",
        category: "MUE",
        carc: "151",
        rarc: "N362",
        message:
          "HCPCS J1745 billed with 95 units; the practitioner MUE is 80 (MAI 3). MAI 3 pends the line for medical review rather than hard-denying.",
        involvedCodes: ["J1745 ×95"],
      },
      whyCaught:
        "The engine summed J1745 to 95 units against the MUE row <code>value 80 / MAI 3</code>. The total exceeds the ceiling, but the <strong>MAI of 3</strong> means CMS considers higher volumes clinically unlikely yet legitimately possible — a high-weight patient on a weight-based biologic dose is a real scenario. So the line is not denied outright; it <em>pends for medical review</em>.",
      resolution:
        "Submit the supporting documentation — patient weight and the mg/kg dosing calculation that yields 950 mg — with the claim or in response to the review request. Unlike MAI 2, an MAI 3 overage that is clinically justified can be paid.",
    },
  ],
  miniExample: {
    summary:
      "A lab submits CPT 82947 (glucose, quantitative) with 12 units on a single DOS for one patient. The MUE for 82947 is 3 (MAI 2).",
    resolution:
      "The entire line denies. Even split-billing won't recover it — MAI 2 is an absolute date-of-service cap. The provider must review whether 82947 was miscoded (perhaps point-of-care glucose monitors require a different code) before resubmitting.",
  },
  sources: [
    {
      label: "CMS NCCI Policy Manual (MUE section)",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual",
    },
    {
      label: "CMS NCCI FAQ Library",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-faq-library",
    },
  ],
};
