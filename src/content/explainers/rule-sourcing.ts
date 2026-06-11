import type { Explainer } from "../../types.js";

export const ruleSourcing: Explainer = {
  slug: "rule-sourcing",
  title: "How These Rules Are Sourced",
  category: "Rule Sourcing",
  oneLiner:
    "Where every edit comes from — statute, CMS, coverage determinations, the code sets, and who owns each piece.",
  definition:
    "Every edit you enforce is someone else's published rule. None of them originate inside the editing engine — they trace back through a chain of authority that starts with federal statute, runs through CMS regulation and sub-regulatory guidance, splits into national and local coverage determinations, and is expressed in code sets owned by different organizations on different update calendars. Knowing the source of a rule tells you three things you can't get from the edit itself: how much authority it carries, whether it can be overridden, and how you would defend the outcome on appeal.",
  conceptNote: `<div class="concept-box">
  <div class="concept-box-header">The chain of authority — top to bottom</div>
  <p>Each layer derives its power from the one above it. The engine only ever touches the bottom rungs, but the authority flows down from the top:</p>
  <div class="rule-trace">
    <div class="trace-step">
      <div class="trace-label">Statute — passed by Congress</div>
      <div class="trace-box">Social Security Act §1862(a)(1)(A) — Medicare pays only for items and services that are <b>"reasonable and necessary."</b> This single clause is the legal root of medical-necessity editing.</div>
    </div>
    <div class="trace-arrow">delegates rulemaking to ▼</div>
    <div class="trace-step">
      <div class="trace-label">Regulation — CMS (notice-and-comment, published in the CFR)</div>
      <div class="trace-box">CMS turns statute into binding regulation and payment rules (e.g. the annual Physician Fee Schedule final rule).</div>
    </div>
    <div class="trace-arrow">interpreted through ▼</div>
    <div class="trace-step">
      <div class="trace-label">Sub-regulatory guidance — CMS manuals & determinations</div>
      <div class="trace-box">Claims Processing Manual, NCCI Policy Manual, and <b>National Coverage Determinations (NCDs)</b> — binding nationwide.</div>
    </div>
    <div class="trace-arrow">operationalized as ▼</div>
    <div class="trace-step">
      <div class="trace-label">Contractor edits & local coverage</div>
      <div class="trace-box">The quarterly <b>NCCI</b> edit files (PTP, MUE, add-on) built by a CMS contractor, plus <b>Local Coverage Determinations (LCDs)</b> authored by the regional MACs.</div>
    </div>
    <div class="trace-arrow">expressed in ▼</div>
    <div class="trace-step">
      <div class="trace-label">Code sets — the vocabulary every rule is written in</div>
      <div class="trace-box">CPT (AMA), HCPCS Level II (CMS), ICD-10-CM (CDC/NCHS + CMS). Edits are just relationships between these codes.</div>
    </div>
    <div class="trace-arrow">adopted &amp; tuned by ▼</div>
    <div class="trace-step">
      <div class="trace-label">Commercial payers</div>
      <div class="trace-box">Most adopt NCCI and CMS coverage wholesale, then layer their own medical policies on top — so the same claim can edit differently across payers.</div>
    </div>
  </div>
  <p class="concept-footnote">Medicare is the source of record for most of this content; commercial and Medicaid programs largely mirror it, which is why CMS publications are the canonical reference even for non-Medicare claims.</p>
</div>`,
  sections: [
    {
      heading: "Who owns each rule set",
      bodyHtml: `<p>No single body owns "the rules." Each rule set has a distinct steward, a distinct level of authority, and — critically for adjudication — a distinct update calendar. Editing against the wrong version is one of the most common avoidable errors.</p>
  <div class="ncci-table-preview">
    <table>
      <thead>
        <tr>
          <th>Rule set</th>
          <th>Maintained by</th>
          <th>Authority level</th>
          <th>Update cadence</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>CPT codes</td>
          <td>American Medical Association (AMA)</td>
          <td>HIPAA-adopted code standard</td>
          <td>Annual — effective Jan 1</td>
        </tr>
        <tr>
          <td>HCPCS Level II</td>
          <td>CMS</td>
          <td>HIPAA-adopted code standard</td>
          <td>Quarterly</td>
        </tr>
        <tr>
          <td>ICD-10-CM (diagnoses)</td>
          <td>CDC / NCHS + CMS</td>
          <td>HIPAA-adopted code standard</td>
          <td>Annual — Oct 1 (mid-year Apr 1)</td>
        </tr>
        <tr>
          <td>NCCI PTP · MUE · Add-on edits</td>
          <td>CMS, via contractor (currently Capitol Bridge LLC)</td>
          <td>Sub-regulatory edit</td>
          <td>Quarterly</td>
        </tr>
        <tr>
          <td>National Coverage Determinations (NCD)</td>
          <td>CMS (national)</td>
          <td>Binding coverage, nationwide</td>
          <td>As evidence warrants</td>
        </tr>
        <tr>
          <td>Local Coverage Determinations (LCD)</td>
          <td>Medicare Administrative Contractors (MACs)</td>
          <td>Coverage within the MAC's region</td>
          <td>As evidence warrants (notice + comment)</td>
        </tr>
        <tr>
          <td>Fee schedules (e.g. MPFS)</td>
          <td>CMS</td>
          <td>Payment / pricing</td>
          <td>Annual + quarterly corrections</td>
        </tr>
        <tr>
          <td>CARC / RARC denial codes</td>
          <td>X12 &amp; CAQH CORE committees</td>
          <td>Remittance messaging standard</td>
          <td>~3× per year</td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="concept-footnote">NCD vs LCD is the distinction that trips people up most: an NCD applies everywhere, while an LCD only applies in the jurisdiction of the MAC that wrote it — so the same service can be covered in one state and denied in another.</p>`,
    },
    {
      heading: "From statute to a denial on the remittance",
      bodyHtml: `<p>A denial that lands on an 835 remittance is the last link in a long chain. Tracing it backwards is exactly how you defend or overturn it — every step points at a citable source:</p>
  <div class="rule-trace">
    <div class="trace-step">
      <div class="trace-label">Statute</div>
      <div class="trace-box trace-mono">SSA §1862(a)(1)(A) — "reasonable and necessary"</div>
    </div>
    <div class="trace-arrow">CMS turns it into policy ▼</div>
    <div class="trace-step">
      <div class="trace-label">Regulation / national coverage</div>
      <div class="trace-box trace-mono">CFR rule · CMS manual · NCD</div>
    </div>
    <div class="trace-arrow">operationalized as a published file or local policy ▼</div>
    <div class="trace-step">
      <div class="trace-label">Edit source</div>
      <div class="trace-box trace-mono">Quarterly NCCI edit file &nbsp;—or—&nbsp; the MAC's LCD</div>
    </div>
    <div class="trace-arrow">loaded into the systems that touch the claim ▼</div>
    <div class="trace-step">
      <div class="trace-label">Adjudication</div>
      <div class="trace-box trace-mono">Payer &amp; clearinghouse edit engines → the secondary edit layer</div>
    </div>
    <div class="trace-arrow">verdict written back to the provider ▼</div>
    <div class="trace-verdict verdict-deny">
      <span class="verdict-tag">Denies</span> A <b>CARC/RARC</b> pair posts on the 835 remittance — a coded pointer back up the chain to the rule that fired.
    </div>
  </div>
  <p class="concept-footnote">The CARC/RARC on the remit is the breadcrumb: it names the rule, which names the source, which names the authority. That trail is what makes a denial appealable rather than arbitrary.</p>`,
    },
    {
      heading: "Downstream impacts",
      bodyHtml: `<p>Because the rules live outside the engine and change on their own calendars, sourcing has direct, practical consequences for how claims must be adjudicated:</p>
  <ul>
    <li><b>Version-by-date-of-service.</b> The NCCI files are quarterly snapshots. A claim must be edited against the version <em>in effect on its DOS</em> — not today's file. Editing a January service against the April file produces wrong results.</li>
    <li><b>Retroactive effective and deletion dates.</b> CMS routinely publishes edits with effective dates in the past and retires others. A pair that was valid last quarter may have been deleted, which can reopen previously denied lines.</li>
    <li><b>Payer adoption lag.</b> Commercial and Medicaid payers adopt CMS content on their own schedule. The same quarter's NCCI update can be live at one payer and weeks away at another.</li>
    <li><b>Adopt-and-tune.</b> Payers start from NCCI/CMS coverage and then modify specific pairs or add their own medical policies. Always check the payer's own policy library, not just the CMS source.</li>
    <li><b>Provenance equals defensibility.</b> To uphold or appeal a denial you must cite the source that produced it — the specific NCCI pair, NCD, or LCD. An edit with no traceable source is not defensible.</li>
  </ul>`,
    },
    {
      heading: "A short history",
      bodyHtml: `<p>The current system is the accumulation of decades of incremental policy, each layer added to close a gap the previous one left open:</p>
  <ol>
    <li><b>1965–66 — Medicare is created</b>, and with it §1862(a)(1)(A): the "reasonable and necessary" standard that still anchors all medical-necessity editing.</li>
    <li><b>1996 — NCCI launches.</b> CMS introduces the National Correct Coding Initiative to promote correct coding methodologies and curb improper payments from unbundling and mutually exclusive codes — the origin of the PTP edits.</li>
    <li><b>2007 — MUEs are added.</b> Medically Unlikely Edits cap the units of a code billable per patient per day, closing the "quantity" gap that PTP pairs didn't address.</li>
    <li><b>2016 — the 21st Century Cures Act (§4009)</b> reforms the LCD process: MACs must give reasonable public notice, hold open meetings, and publish the evidence behind a determination — making local coverage far more transparent and contestable.</li>
    <li><b>Ongoing — the audit feedback loop.</b> OIG reports, the CERT improper-payment program, and RAC audits surface patterns of overpayment, which CMS converts into new or tightened edits. The rule set grows because enforcement findings feed back into it.</li>
  </ol>`,
    },
    {
      heading: "Why this matters for a secondary editor",
      bodyHtml: `<p>The secondary edit layer doesn't invent rules — it faithfully encodes rules that someone else published, against the version that was in force on the date of service. Knowing a rule's source is not trivia: it tells you whether the rule is <b>binding</b> (statute/NCD) or <b>regional</b> (LCD), whether it is <b>overridable</b> (an NCCI indicator of 1) or <b>absolute</b> (indicator 0), and exactly which document you would cite to defend the outcome. When an edit is challenged, "the engine flagged it" is never the answer — "NCCI Q2 2026, pair X, indicator 0" is.</p>`,
    },
  ],
  sources: [
    {
      label: "Social Security Act §1862 (Exclusions from coverage)",
      url: "https://www.ssa.gov/OP_Home/ssact/title18/1862.htm",
    },
    {
      label: "CMS NCCI Policy Manual",
      url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual",
    },
    {
      label: "CMS Medicare Coverage Determination Process (NCD / LCD)",
      url: "https://www.cms.gov/medicare/coverage/determination-process",
    },
    {
      label: "AMA CPT (Current Procedural Terminology)",
      url: "https://www.ama-assn.org/practice-management/cpt",
    },
    {
      label: "CDC / NCHS ICD-10-CM",
      url: "https://www.cdc.gov/nchs/icd/icd-10-cm/index.html",
    },
    {
      label: "Washington Publishing Company — CARC / RARC code lists (X12)",
      url: "https://x12.org/codes",
    },
    {
      label: "21st Century Cures Act (Pub. L. 114-255)",
      url: "https://www.congress.gov/bill/114th-congress/house-bill/34",
    },
  ],
};
