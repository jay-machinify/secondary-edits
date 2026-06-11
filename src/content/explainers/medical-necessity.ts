import type { Explainer } from "../../types.js";

export const medicalNecessity: Explainer = {
  slug: "medical-necessity",
  title: "Medical Necessity (Procedure-to-Diagnosis) Edits",
  category: "Medical Necessity",
  oneLiner: "Does the diagnosis actually support the procedure?",
  definition:
    "Medical-necessity edits — often called Procedure-to-Diagnosis (PxDx) edits — check whether the ICD-10 diagnosis codes on a claim justify the procedures billed, according to the payer's coverage policy. For Medicare, the test is typically an LCD or NCD that lists the diagnoses for which a given procedure is covered. For commercial payers, it's the plan's medical-policy library. The edit is a list lookup: at least one diagnosis on the claim must appear in the procedure's covered-diagnosis list, or the line denies as not medically necessary.",
  conceptNote: `<div class="concept-box">
  <div class="concept-box-header">Coverage policies and covered-diagnosis lists — how a PxDx edit works</div>
  <p>A medical-necessity edit is only as good as the policy behind it. CMS publishes two tiers of coverage policy, and which one applies decides what the edit even checks:</p>
  <div class="indicator-grid">
    <div class="indicator-item">
      <span class="indicator-badge ind-0">N</span>
      <span><strong>NCD — National Coverage Determination.</strong> CMS-wide policy. Where an NCD exists for a service, it governs nationally and takes precedence over any local policy.</span>
    </div>
    <div class="indicator-item">
      <span class="indicator-badge ind-1">L</span>
      <span><strong>LCD — Local Coverage Determination.</strong> Set by the regional MAC (Medicare Administrative Contractor). Governs when no NCD covers the service, so the <em>same</em> procedure can carry different covered diagnoses in different regions.</span>
    </div>
    <div class="indicator-item">
      <span class="indicator-badge ind-9">∅</span>
      <span><strong>No applicable policy.</strong> If neither an NCD nor an LCD restricts the procedure, there is no covered-Dx list to fail — the service is generally payable on any reasonable diagnosis.</span>
    </div>
  </div>
  <div class="concept-sub-header">The covered-diagnosis list</div>
  <p>Each policy attaches one or more ICD-10 lists — CMS labels them <strong>Group 1 Codes</strong>, Group 2, and so on. The edit's entire job is one question: <em>does at least one diagnosis on the claim appear in the covered list for this procedure?</em> If yes, the necessity test passes; if no diagnosis matches, the line denies.</p>
  <div class="ncci-table-preview">
    <table>
      <thead>
        <tr>
          <th>Procedure</th>
          <th>Policy</th>
          <th>Group 1 — covered ICD-10</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>83036 (HbA1c)</td>
          <td>LCD L33822</td>
          <td>E08–E13, R73.0x</td>
        </tr>
        <tr>
          <td>82306 (Vitamin D)</td>
          <td>LCD L34658</td>
          <td>E55.x, M83.x, N25.81</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="concept-sub-header">Liability modifiers — who pays when necessity is expected to deny</div>
  <p>When a provider expects a service to be denied for necessity, modifiers on the line decide <strong>who absorbs the cost</strong> — they do not change whether the edit fires:</p>
  <div class="mod-chip-row">
    <span class="mod-chip">GA — ABN on file, denial → patient</span>
    <span class="mod-chip">GZ — expected denial, no ABN → provider write-off</span>
    <span class="mod-chip">GX — voluntary ABN, non-covered service</span>
    <span class="mod-chip">GY — statutorily excluded, never covered</span>
  </div>
  <p class="concept-footnote">Coding a service as <strong>screening</strong> versus <strong>diagnostic</strong> can flip the edit entirely — a screening Z-code may be non-covered under a policy that covers the same test for an established condition, or vice-versa for a dedicated screening benefit.</p>
</div>`,
  whenItFires: [
    "The procedure has an LCD/NCD or commercial policy that restricts it to a list of covered diagnoses, and none of the claim's Dx codes are on the list.",
    "The procedure requires evidence of conservative treatment or a prerequisite diagnostic finding that isn't reflected in the claim history.",
    "A supporting service is billed without the qualifying primary diagnosis (e.g., vitamin D testing without a Dx indicating deficiency or risk).",
  ],
  keyReferences: [
    "LCD (Local Coverage Determination) — MAC-level policy",
    "NCD (National Coverage Determination) — CMS-wide policy; takes precedence over an LCD",
    "Covered-diagnosis lists ('Group 1 Codes') — the ICD-10 codes that support medical necessity for a procedure",
    "ABN (Advance Beneficiary Notice) — patient signs acknowledging possible financial responsibility if Medicare denies for necessity",
    "Liability modifiers: GA (ABN on file), GZ (no ABN, write-off), GX (voluntary ABN), GY (statutorily excluded)",
    "CARC 50 — non-covered because not deemed a medical necessity; RARC N115 — decision based on an LCD",
  ],
  edgeCases: [
    "Some services (e.g., preventive screening) are covered regardless of diagnosis if coded as screening; the presence/absence of screening codes flips the edit.",
    "Medical-necessity denials are frequently appealed with medical records — the edit is often a first-pass filter, not a final decision.",
    "'Not medically necessary' is different from 'not covered' — the former is a clinical-policy determination; the latter is a benefit-design question.",
    "The edit checks the entire diagnosis set on the claim, not just the primary Dx — a single covered diagnosis anywhere on the claim clears it.",
  ],
  ruleData: {
    intro:
      "CMS publishes coverage policy as NCDs (national) and LCDs (local, by MAC). Each policy names the procedure code(s) it governs and lists the ICD-10 diagnoses that support medical necessity for those procedures — the covered-diagnosis ('Group 1') list. To adjudicate, the engine takes each procedure on the claim, finds the applicable policy, and checks whether any diagnosis billed on the claim appears in that policy's covered list. If at least one does, the necessity test passes; if none does, the line denies as not medically necessary (CARC 50). The engine is not making a clinical judgment — it is matching the claim's Dx codes against a CMS-published list.",
    tableHtml: `<div class="ncci-table-preview">
    <table>
      <thead>
        <tr>
          <th>Procedure</th>
          <th>Policy (LCD/NCD)</th>
          <th>Covered ICD-10 (Group 1)</th>
          <th>Effective Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>83036</td>
          <td>LCD L33822</td>
          <td>E08–E13, R73.0x</td>
          <td>20211007</td>
        </tr>
        <tr>
          <td>82306</td>
          <td>LCD L34658</td>
          <td>E55.x, M83.x, N25.81</td>
          <td>20191003</td>
        </tr>
        <tr>
          <td>84153</td>
          <td>NCD 190.31</td>
          <td>C61, R97.20, N40.x</td>
          <td>20030101</td>
        </tr>
      </tbody>
    </table>
  </div>`,
    traceHtml: `<div class="rule-trace">
    <div class="trace-step">
      <div class="trace-label">Claim — procedure + every diagnosis billed</div>
      <div class="trace-box">83036 &nbsp;·&nbsp; Dx: Z00.00 &nbsp;<span class="trace-muted">(routine wellness exam)</span></div>
    </div>
    <div class="trace-arrow">find the policy for 83036, then check its covered list ▼</div>
    <div class="trace-step">
      <div class="trace-label">Matched CMS policy</div>
      <div class="trace-box trace-mono">83036 · LCD L33822 · Group 1 = E08–E13, R73.0x</div>
    </div>
    <div class="trace-arrow">Z00.00 is not in the covered list ▼</div>
    <div class="trace-verdict verdict-deny">
      <span class="verdict-tag">Denies</span> Not medically necessary (CARC 50) — no diagnosis on the claim appears in the procedure's covered-Dx list.
    </div>
  </div>`,
    note:
      "Change one input — a different diagnosis, a screening code, or whether a policy even exists for the procedure — and the verdict flips. The edit is driven entirely by CMS's covered-code lists, not by the engine's own clinical reasoning.",
  },
  workedExamples: [
    {
      title:
        "1 · Diagnosis not on the covered list → denies (the classic PxDx hit)",
      claim: {
        id: "EX-MN-1",
        formType: "CMS-1500",
        patient: { id: "P-80512", age: 52, sex: "F" },
        provider: {
          id: "NPI-6161616161",
          name: "Maple Street Family Medicine",
          specialty: "Family Medicine",
        },
        dx: ["Z00.00 (encounter for general adult medical exam, no abnormal findings)"],
        lines: [
          {
            lineNo: 1,
            code: "83036",
            description: "Hemoglobin A1c",
            dos: "2026-05-04",
            pos: "11",
            units: 1,
            charge: "$28.00",
          },
        ],
        note: "HbA1c drawn at a routine annual wellness visit. No diabetes or pre-diabetes diagnosis on the claim.",
      },
      edit: {
        ruleName: "Medical Necessity: no covered diagnosis (LCD)",
        category: "Medical Necessity",
        carc: "50",
        rarc: "N115",
        message:
          "CPT 83036 is governed by LCD L33822, whose Group 1 list covers E08–E13 and R73.0x. The only Dx on the claim is Z00.00, which is not in the covered list. Line 1 denies as not medically necessary.",
        involvedCodes: ["83036", "Z00.00"],
      },
      whyCaught:
        "The engine looked up <code>83036</code>, found <strong>LCD L33822</strong>, and checked the claim's diagnoses against the policy's Group 1 list (diabetes <code>E08–E13</code> and abnormal-glucose <code>R73.0x</code>). The only diagnosis on the claim is <code>Z00.00</code> — a routine wellness encounter — which is <em>not</em> on the covered list, so the necessity test fails and the line denies under <strong>CARC 50</strong>. The engine made no clinical call; it matched codes against a CMS-published list.",
      resolution:
        "If the patient actually has a covered condition, bill the correct supporting Dx (e.g., <code>R73.03</code> pre-diabetes or an <code>E11.x</code> type-2 diabetes code) — assuming it's documented. If there is no covered diagnosis, the test is non-covered for this encounter, and the patient should have signed an ABN before the draw so liability can be shifted appropriately.",
    },
    {
      title:
        "2 · A covered diagnosis is present elsewhere on the claim → pays",
      claim: {
        id: "EX-MN-2",
        formType: "CMS-1500",
        patient: { id: "P-77340", age: 64, sex: "F" },
        provider: {
          id: "NPI-7272727272",
          name: "Riverbend Internal Medicine",
          specialty: "Internal Medicine",
        },
        dx: [
          "Z13.89 (encounter for screening for other disorder)",
          "E55.9 (vitamin D deficiency, unspecified)",
        ],
        lines: [
          {
            lineNo: 1,
            code: "82306",
            description: "Vitamin D; 25 hydroxy",
            dos: "2026-05-19",
            pos: "11",
            units: 1,
            charge: "$48.00",
          },
        ],
        note: "Ordered with a screening Z-code listed first, but the patient also carries a documented vitamin D deficiency.",
      },
      edit: {
        ruleName: "Medical Necessity: covered diagnosis satisfied",
        category: "Medical Necessity",
        carc: "—",
        message:
          "CPT 82306 is governed by LCD L34658 (Group 1 includes E55.x). The claim carries E55.9 in addition to the screening Z13.89. A covered diagnosis is present, so the necessity test passes and the line pays.",
        involvedCodes: ["82306", "E55.9"],
      },
      whyCaught:
        "The edit still <em>runs</em> — it just doesn't deny. The engine checks the <strong>entire diagnosis set</strong> on the claim, not only the first-listed Dx. The screening code <code>Z13.89</code> is not on LCD L34658's covered list, but <code>E55.9</code> (vitamin D deficiency) <em>is</em> in Group 1 (<code>E55.x</code>). A single covered diagnosis anywhere on the claim satisfies the necessity test, so the line pays regardless of Dx ordering.",
      resolution:
        "Nothing to fix. This is the correct way to bill a covered condition — the supporting diagnosis is on the claim and documented. Best practice is to sequence the diagnosis that supports the service appropriately, but the edit clears as long as a covered Dx is present.",
    },
    {
      title:
        "3 · No covered diagnosis, but an ABN shifts liability (the GA/GZ mechanism)",
      claim: {
        id: "EX-MN-3",
        formType: "CMS-1500",
        patient: { id: "P-69218", age: 58, sex: "M" },
        provider: {
          id: "NPI-8383838383",
          name: "Cedar Hollow Primary Care",
          specialty: "Family Medicine",
        },
        dx: ["Z13.89 (encounter for screening for other disorder)"],
        lines: [
          {
            lineNo: 1,
            code: "82306",
            description: "Vitamin D; 25 hydroxy",
            modifiers: ["GA"],
            dos: "2026-06-01",
            pos: "11",
            units: 1,
            charge: "$48.00",
          },
        ],
        note: "Patient requested a vitamin D screen with no qualifying condition. Provider expected a necessity denial and obtained a signed ABN before the draw, appending GA.",
      },
      edit: {
        ruleName: "Medical Necessity: denial routed to patient liability (GA)",
        category: "Medical Necessity",
        carc: "50",
        rarc: "N115",
        message:
          "CPT 82306 under LCD L34658 has no covered diagnosis on the claim (only Z13.89). The line denies for necessity. Modifier GA signals a signed ABN is on file, so the denied amount is the patient's responsibility rather than a provider write-off.",
        involvedCodes: ["82306", "Z13.89", "GA"],
      },
      whyCaught:
        "The necessity edit fires exactly as in Example 1 — the screening code <code>Z13.89</code> is not in LCD L34658's covered list, so there is no medically-necessary diagnosis and the line denies under <strong>CARC 50</strong>. What the <code>GA</code> modifier changes is <em>who pays the denied amount</em>, not whether it denies: <code>GA</code> tells Medicare a valid ABN was signed, so the balance becomes patient responsibility. Had the provider appended <code>GZ</code> (no ABN obtained), the same denial would be a mandatory provider write-off.",
      resolution:
        "This is handled correctly. Obtain and document the ABN <em>before</em> rendering a service you expect to be non-covered, then append <code>GA</code> so liability transfers to the patient. Never append <code>GZ</code> expecting payment — <code>GZ</code> guarantees a write-off because it certifies no ABN was obtained.",
    },
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
    {
      label: "Medicare Coverage Database (NCD/LCD lookup)",
      url: "https://www.cms.gov/medicare-coverage-database/search.aspx",
    },
  ],
};
