import type { Explainer } from "../../types.js";

export const ncciPtp: Explainer = {
  slug: "ncci-ptp",
  title: "NCCI Procedure-to-Procedure (PTP) Edits",
  category: "NCCI PTP",
  oneLiner: "Code pairs that shouldn't be paid together on the same DOS.",
  definition:
    "NCCI PTP edits identify CPT/HCPCS code pairs that Medicare (and most commercial payers) should not pay together for the same beneficiary, provider, and date of service. The CMS NCCI edit file organizes each pair as a Column One / Column Two pair — when both appear, Column One is eligible for payment and Column Two denies unless an allowed override modifier is appended.",
  conceptNote: `<div class="concept-box">
  <div class="concept-box-header">Column One / Column Two — how it works</div>
  <p>The names are literal — CMS publishes the NCCI PTP edits as a flat file (spreadsheet) where each row is one bundling rule. The code that pays is always in the first column; the code that bundles and denies is always in the second column:</p>
  <div class="ncci-table-preview">
    <table>
      <thead>
        <tr>
          <th class="col-one-th">Column One</th>
          <th class="col-two-th">Column Two</th>
          <th>Modifier Indicator</th>
          <th>Effective Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-one-td">52204</td>
          <td class="col-two-td">52000</td>
          <td>1</td>
          <td>20100101</td>
        </tr>
        <tr>
          <td class="col-one-td">99213</td>
          <td class="col-two-td">36415</td>
          <td>0</td>
          <td>20050401</td>
        </tr>
        <tr>
          <td class="col-one-td">27447</td>
          <td class="col-two-td">27310</td>
          <td>1</td>
          <td>20030101</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="concept-footnote" style="margin-bottom:0.85rem;">A code can be Column One in one row and Column Two in a different row — the designation is relationship-specific, not a fixed property of the code itself.</p>
  <p>When both codes of a pair appear on the same claim, Column One is eligible for payment and Column Two denies — unless an override modifier documents a clinically distinct service.</p>
  <div class="col-diagram">
    <div class="col-block col-one-block">
      <div class="col-block-label">Column One</div>
      <div class="col-block-body">Comprehensive code — pays. Typically the more complex or inclusive procedure.</div>
    </div>
    <div class="col-diagram-arrow">bundles ›</div>
    <div class="col-block col-two-block">
      <div class="col-block-label">Column Two</div>
      <div class="col-block-body">Component code — denies when Column One is present (unless overridden by a modifier).</div>
    </div>
  </div>
  <div class="concept-sub-header">PTP Modifier Indicator</div>
  <p>Each pair carries a <strong>modifier indicator</strong> that controls whether a denial can be overridden:</p>
  <div class="indicator-grid">
    <div class="indicator-item">
      <span class="indicator-badge ind-0">0</span>
      <span>Override <strong>never</strong> allowed — Column Two always denies. Appending modifier 59 is considered abusive.</span>
    </div>
    <div class="indicator-item">
      <span class="indicator-badge ind-1">1</span>
      <span>Override <strong>allowed</strong> when a valid modifier documents a distinct service.</span>
    </div>
    <div class="indicator-item">
      <span class="indicator-badge ind-9">9</span>
      <span>Edit <strong>no longer active</strong> — does not apply.</span>
    </div>
  </div>
  <div class="concept-sub-header">Override modifiers (indicator = 1 pairs only)</div>
  <div class="mod-chip-row">
    <span class="mod-chip">59 — Distinct procedural service</span>
    <span class="mod-chip">XE — Separate encounter</span>
    <span class="mod-chip">XS — Separate structure</span>
    <span class="mod-chip">XP — Separate practitioner</span>
    <span class="mod-chip">XU — Unusual non-overlapping service</span>
  </div>
  <p class="concept-footnote">CMS prefers the more specific X{EPSU} modifiers over 59 when one applies. Use 59 only when no X modifier fits.</p>
</div>`,
  whenItFires: [
    "Both codes of a published pair appear on the same claim (same DOS, provider, beneficiary).",
    "The Column Two code has no override modifier (e.g., 59, XE, XS, XP, XU, or a CMS-designated PTP modifier indicator of 1).",
    "The PTP modifier indicator for the pair is 1 (override allowed) or 0 (no override allowed, always deny).",
  ],
  keyReferences: [
    "Column One / Column Two relationship",
    "PTP modifier indicator: 0 = never overridable, 1 = overridable with appropriate modifier, 9 = no longer active",
    "Override modifiers: 59, XE (separate encounter), XS (separate structure), XP (separate practitioner), XU (unusual non-overlapping)",
    "CMS updates NCCI tables quarterly",
  ],
  edgeCases: [
    "Some pairs have a 0 indicator — no modifier can override them. Forcing one is abuse.",
    "CMS prefers the X{EPSU} modifiers over 59 when one of them is more specific. OIG has flagged payers that allow blanket modifier-59 overrides.",
    "Commercial payers may adopt NCCI but tune specific pairs differently — always check the payer's policy library, not just the CMS tables.",
    "Bilateral procedures: if both codes share the same code but different sides, the correct fix is -LT/-RT or -50, not 59.",
  ],
  ruleData: {
    intro:
      "CMS publishes the PTP edits as a flat file (a spreadsheet) that it updates quarterly. Each row is one bundling rule and carries exactly the fields the edit engine needs: the Column One code, the Column Two code, the PTP modifier indicator (0, 1, or 9), an effective date, a deletion date (blank while active), and a PTP-edit rationale. To adjudicate a claim, the engine takes every pair of codes billed for the same beneficiary / provider / date of service and looks the pair up in this file. If the pair matches an active row, Column Two is the line at risk and the modifier indicator decides whether an override is even possible.",
    tableHtml: `<div class="ncci-table-preview">
    <table>
      <thead>
        <tr>
          <th class="col-one-th">Column One</th>
          <th class="col-two-th">Column Two</th>
          <th>Modifier Indicator</th>
          <th>Effective Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-one-td">29881</td>
          <td class="col-two-td">29870</td>
          <td>1</td>
          <td>20030101</td>
        </tr>
        <tr>
          <td class="col-one-td">11042</td>
          <td class="col-two-td">11043</td>
          <td>1</td>
          <td>20110101</td>
        </tr>
        <tr>
          <td class="col-one-td">99213</td>
          <td class="col-two-td">36415</td>
          <td>0</td>
          <td>20050401</td>
        </tr>
      </tbody>
    </table>
  </div>`,
    traceHtml: `<div class="rule-trace">
    <div class="trace-step">
      <div class="trace-label">Claim lines (same DOS / provider / patient)</div>
      <div class="trace-box">29881 &nbsp;+&nbsp; 29870 &nbsp;<span class="trace-muted">(no modifier)</span></div>
    </div>
    <div class="trace-arrow">look up the pair in the PTP file ▼</div>
    <div class="trace-step">
      <div class="trace-label">Matched CMS row</div>
      <div class="trace-box trace-mono">Col One <b>29881</b> · Col Two <b>29870</b> · indicator <b>1</b> · active</div>
    </div>
    <div class="trace-arrow">indicator 1 = override allowed, but none present ▼</div>
    <div class="trace-verdict verdict-deny">
      <span class="verdict-tag">Denies</span> Column Two <b>29870</b> denies — it is the component of 29881 and no override modifier documents a distinct service.
    </div>
  </div>`,
    note:
      "Change any one input — the modifier indicator, whether an override modifier is present, or whether the pair even appears in the file — and the verdict changes. That is the whole edit: it is a lookup against CMS-published data, not a judgment call.",
  },
  workedExamples: [
    {
      title: "1 · Component bundled into the comprehensive code (indicator 1, no modifier → denies)",
      claim: {
        id: "EX-PTP-1",
        formType: "CMS-1500",
        patient: { id: "P-30188", age: 58, sex: "M" },
        provider: {
          id: "NPI-2233445566",
          name: "Lakeside Orthopedics",
          specialty: "Orthopedic Surgery",
        },
        dx: ["M23.221 (derangement of medial meniscus, right knee)"],
        lines: [
          {
            lineNo: 1,
            code: "29881",
            description: "Knee arthroscopy with meniscectomy (medial OR lateral)",
            dos: "2026-03-09",
            pos: "24",
            units: 1,
            charge: "$1,980.00",
          },
          {
            lineNo: 2,
            code: "29870",
            description: "Knee arthroscopy, diagnostic",
            dos: "2026-03-09",
            pos: "24",
            units: 1,
            charge: "$640.00",
          },
        ],
        note: "Same knee, same operative session.",
      },
      edit: {
        ruleName: "NCCI PTP: Column Two bundled, no override modifier",
        category: "NCCI PTP",
        carc: "236",
        rarc: "N20",
        message:
          "CPT pair 29881 / 29870 matches an active PTP row (indicator 1). 29870 is the Column Two code and carries no override modifier. Line 2 denies.",
        involvedCodes: ["29881", "29870"],
      },
      whyCaught:
        "The diagnostic scope (<code>29870</code>) is a routine component of the meniscectomy (<code>29881</code>) — you cannot do the resection without first looking. The matched CMS row lists <code>29881</code> in Column One and <code>29870</code> in Column Two with a <strong>modifier indicator of 1</strong>. An indicator of 1 means an override <em>could</em> apply, but only with a modifier that documents a clinically distinct service. No such modifier is on line 2, so the engine denies the Column Two code.",
      resolution:
        "Drop <code>29870</code> from the claim — the diagnostic look is included in the meniscectomy payment. Do not append <code>59</code> to force it through: the two services were the same knee in the same session, so no distinct-service modifier is supportable.",
    },
    {
      title: "2 · Genuinely distinct sites — override is justified (indicator 1 + XS → pays)",
      claim: {
        id: "EX-PTP-2",
        formType: "CMS-1500",
        patient: { id: "P-44902", age: 67, sex: "F" },
        provider: {
          id: "NPI-7788990011",
          name: "Cedar Creek Wound Care",
          specialty: "Wound Care",
        },
        dx: [
          "L97.521 (non-pressure ulcer, left foot, fat layer exposed)",
          "L97.421 (non-pressure ulcer, left heel, fat layer exposed)",
        ],
        lines: [
          {
            lineNo: 1,
            code: "11042",
            description: "Debridement, subcutaneous tissue; first 20 sq cm or less",
            dos: "2026-04-21",
            pos: "11",
            units: 1,
            charge: "$210.00",
          },
          {
            lineNo: 2,
            code: "11043",
            description: "Debridement, muscle/fascia; first 20 sq cm or less",
            modifiers: ["XS"],
            dos: "2026-04-21",
            pos: "11",
            units: 1,
            charge: "$340.00",
          },
        ],
        note: "Two separate ulcers — dorsal foot (subcutaneous) and heel (down to fascia). Op note documents distinct anatomic sites.",
      },
      edit: {
        ruleName: "NCCI PTP: override modifier accepted",
        category: "NCCI PTP",
        carc: "—",
        message:
          "CPT pair 11042 / 11043 matches an active PTP row (indicator 1). Line 2 carries modifier XS (separate structure) supported by documentation of a distinct anatomic site. Both lines pay.",
        involvedCodes: ["11042", "11043", "XS"],
      },
      whyCaught:
        "The same pair (indicator 1) is on the claim, so the edit <em>fires</em> — but firing is not the same as denying. Because the indicator is 1, the override path is open, and line 2 carries <code>XS</code> (separate structure): the heel ulcer debrided to fascia is anatomically distinct from the dorsal-foot subcutaneous debridement. The documentation backs the separate site, so the engine clears the edit and both lines pay.",
      resolution:
        "Nothing to fix — this is the correct way to bill distinct sites. Note CMS prefers the specific X{EPSU} modifiers over a blanket <code>59</code>; <code>XS</code> is the right choice here because the distinction is anatomic. Keep the op note on file in case the override is audited.",
    },
    {
      title: "3 · A '0' indicator pair — no modifier can rescue it (indicator 0 → denies anyway)",
      claim: {
        id: "EX-PTP-3",
        formType: "CMS-1500",
        patient: { id: "P-51277", age: 45, sex: "M" },
        provider: {
          id: "NPI-1212121212",
          name: "Riverside Family Medicine",
          specialty: "Family Medicine",
        },
        dx: ["E11.9 (type 2 diabetes mellitus without complications)"],
        lines: [
          {
            lineNo: 1,
            code: "99213",
            description: "Office/outpatient visit, established patient",
            dos: "2026-05-12",
            pos: "11",
            units: 1,
            charge: "$135.00",
          },
          {
            lineNo: 2,
            code: "36415",
            description: "Collection of venous blood by venipuncture",
            modifiers: ["59"],
            dos: "2026-05-12",
            pos: "11",
            units: 1,
            charge: "$18.00",
          },
        ],
        note: "Routine venipuncture drawn at the visit. Modifier 59 appended in an attempt to bill it separately.",
      },
      edit: {
        ruleName: "NCCI PTP: non-overridable pair (indicator 0)",
        category: "NCCI PTP",
        carc: "236",
        rarc: "M80",
        message:
          "CPT pair 99213 / 36415 matches an active PTP row with modifier indicator 0. Override modifiers are not recognized for this pair. Line 2 (36415) denies despite the appended 59.",
        involvedCodes: ["99213", "36415", "59"],
      },
      whyCaught:
        "Here the matched CMS row carries a <strong>modifier indicator of 0</strong> — the venipuncture (<code>36415</code>) is always bundled into the E/M visit and the override path is closed. The biller appended <code>59</code> anyway, but the engine never even evaluates it: indicator 0 means no modifier is accepted for this pair. Line 2 denies. Appending a distinct-service modifier to force a 0-indicator pair through is exactly the pattern OIG flags as abusive.",
      resolution:
        "Remove <code>36415</code> from the claim and strip the <code>59</code> — the draw is included in the office-visit payment. There is no compliant way to bill them separately on the same DOS for this pair.",
    },
  ],
  miniExample: {
    summary:
      "A urology claim bills CPT 52000 (cystourethroscopy) and CPT 52204 (cystourethroscopy with biopsy) for the same DOS. 52000 is bundled into 52204.",
    resolution:
      "The 52000 line denies because the diagnostic scope is included in the scope-with-biopsy. Remove 52000 from the claim. Modifier 59 would not be appropriate here because the two services occurred during the same session on the same anatomy.",
  },
  sources: [
    {
      label: "CMS NCCI Policy Manual",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual",
    },
    {
      label: "CMS NCCI PTP Edits",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-procedure-procedure-ptp-edits",
    },
    {
      label: "AAPC: NCCI Edits",
      url: "https://www.clinicient.com/guide/ncci-edits/",
    },
  ],
};
