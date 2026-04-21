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
