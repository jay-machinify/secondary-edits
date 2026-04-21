import type { WalkthroughStep } from "../types.js";
import { term } from "../components/term.js";
import { renderClaimCard } from "../components/claim-card.js";
import { renderEditCallout, renderResolutionCallout } from "../components/edit-callout.js";
import { html } from "../render.js";

const bilateralCataractClaim = {
  id: "TRN-0001",
  formType: "CMS-1500" as const,
  patient: { id: "P-77421", age: 74, sex: "F" as const },
  provider: {
    id: "NPI-1234567890",
    name: "Sierra Vista Eye Associates",
    specialty: "Ophthalmology",
  },
  dx: ["H25.13 (age-related nuclear cataract, bilateral)"],
  lines: [
    {
      lineNo: 1,
      code: "66984",
      description: "Cataract extraction with IOL insertion, one stage",
      dos: "2026-02-14",
      pos: "22",
      units: 1,
      charge: "$2,450.00",
    },
    {
      lineNo: 2,
      code: "66984",
      description: "Cataract extraction with IOL insertion, one stage",
      dos: "2026-02-14",
      pos: "22",
      units: 1,
      charge: "$2,450.00",
    },
  ],
  note: "Bilateral procedure — both eyes, same session.",
};

export const walkthrough: WalkthroughStep[] = [
  {
    n: 1,
    title: "Welcome",
    subtitle: "Why this training exists",
    render: () => html`
      <p>
        This is a ~15-minute ramp on <strong>secondary code edits</strong> — the second-pass
        quality check that payers run on medical claims before (or sometimes after) paying
        them. If you work in healthcare payment integrity, this is the layer that most of the
        interesting decisions live in.
      </p>
      <p>By the end of the walkthrough you should be able to:</p>
      <ul>
        <li>Explain what a secondary edit is and how it differs from a primary edit</li>
        <li>Name the major categories (NCCI PTP, MUEs, global surgery, modifiers, duplicates, frequency, age/gender/POS, medical necessity, unbundling)</li>
        <li>Read a real claim and say whether an edit would likely fire</li>
        <li>Know where to look next when you want to go deeper</li>
      </ul>
      <blockquote>
        <p>
          <strong>Context:</strong> Machinify is building in this space. This training doubles as
          your ramp-up and as an onboarding artifact for the rest of the team. All claim examples
          are fictional — no PHI.
        </p>
      </blockquote>
    `,
  },

  {
    n: 2,
    title: "Anatomy of a claim",
    subtitle: "The handful of fields that edits actually care about",
    render: () => html`
      <p>
        Before we talk about editing, know what's being edited. A healthcare claim is mostly
        structured data. The two dominant forms are:
      </p>
      <ul>
        <li>
          ${term("CMS-1500")} — the professional claim form (physicians, therapists, standalone
          services). Uses ${term("CPT")} and ${term("HCPCS")} procedure codes; no revenue codes.
        </li>
        <li>
          ${term("UB-04")} — the institutional claim form (hospitals, SNFs, rehab). Uses
          ${term("Revenue code", "revenue codes")} plus CPT/HCPCS plus ${term("ICD-10")}.
        </li>
      </ul>
      <p>
        Most secondary edits in the outpatient / professional space run against CMS-1500-style
        data. The fields secondary edits care about most are:
      </p>
      <ul>
        <li><strong>CPT / HCPCS code</strong> — the "what was done"</li>
        <li><strong>${term("Modifier", "Modifiers")}</strong> — the "with what qualification" (laterality, distinct service, repeat, etc.)</li>
        <li><strong>ICD-10 diagnosis codes</strong> — the "why"</li>
        <li><strong>${term("DOS")}</strong> — the "when"</li>
        <li><strong>${term("POS")}</strong> — the "where"</li>
        <li><strong>Units</strong> — the "how many"</li>
        <li><strong>Provider NPI</strong> — the "who"</li>
        <li><strong>Patient demographics</strong> — age, sex, sometimes coverage (who it was for)</li>
      </ul>
      <p>Here's a worked example, styled the way the rest of this UI will render claims:</p>
      ${renderClaimCard(bilateralCataractClaim)}
      <p>
        Keep this shape of data in mind — when an edit fires, it's comparing these fields across
        lines, or across claims.
      </p>
    `,
  },

  {
    n: 3,
    title: "What is code editing?",
    subtitle: "Claims don't get paid as submitted",
    render: () => html`
      <p>
        When a claim arrives at a payer, it isn't paid on faith. It runs through a series of
        automated checks called <strong>edits</strong>. Each edit has a rule; when a claim violates
        it, the edit <em>fires</em> and the claim is denied, reduced, pended for review, or
        flagged for audit.
      </p>
      <p>The rules come from several places:</p>
      <ul>
        <li>CMS / ${term("NCCI")} (the national-scope rules every Medicare claim runs through)</li>
        <li>${term("LCD", "LCDs")} and ${term("NCD", "NCDs")} (Medicare coverage policy)</li>
        <li>The AMA CPT manual (coding conventions and inherent bundling)</li>
        <li>Commercial payer medical policy (each plan writes its own rules on top of the above)</li>
        <li>Proprietary rules bought from vendors (Cotiviti, Lyric, Optum CES, etc.)</li>
      </ul>
      <p>
        Individual edits can be simple ("CPT 00100 doesn't exist") or very contextual ("this CPT
        is appropriate only for patients ≥18"). The more contextual they get, the more likely
        they're in the <strong>secondary</strong> pass.
      </p>
    `,
  },

  {
    n: 4,
    title: "Primary vs secondary — the two-pass model",
    subtitle: "Is this code valid? vs. Should these codes be paid together?",
    render: () => html`
      <p>Think of claim editing as two passes that ask different questions.</p>
      <h3>Primary (first-pass) edits</h3>
      <p>Ask: <em>"Is this claim line structurally valid in isolation?"</em> Examples:</p>
      <ul>
        <li>Is the CPT / HCPCS code real and active on the DOS?</li>
        <li>Is the required modifier present where the code mandates one (e.g., -RT/-LT on a laterality-required code)?</li>
        <li>Are provider and patient IDs formatted correctly?</li>
        <li>Does the diagnosis point to a valid ICD-10 code?</li>
      </ul>
      <h3>Secondary (second-pass) edits</h3>
      <p>
        Ask: <em>"Given everything else on this claim and the patient's history, should this still
        be paid as submitted?"</em> Examples:
      </p>
      <ul>
        <li>Are these two CPT codes improperly billed together? (${term("PTP")})</li>
        <li>Are there too many units for what's clinically plausible? (${term("MUE")})</li>
        <li>Does the claim fall inside another surgery's ${term("Global period", "global period")}?</li>
        <li>Is this a duplicate of a claim we already paid?</li>
        <li>Is modifier 25 being stacked on every E/M as a reflex? (abuse pattern)</li>
      </ul>
      <blockquote>
        <p>
          The mental model: primary asks <strong>valid?</strong>, secondary asks
          <strong>valid together?</strong>.
        </p>
      </blockquote>
    `,
  },

  {
    n: 5,
    title: "Where secondary edits live in the lifecycle",
    subtitle: "The pipeline from submission to payment",
    render: () => html`
      <p>
        Secondary edits sit in the middle of the claim lifecycle. A typical pre-payment pipeline
        looks like this:
      </p>
      <div class="pipeline">
        <div class="node">Submission<br /><span class="mono">837P / 837I</span></div>
        <div class="node">Primary edits<br /><span class="mono">syntax / validity</span></div>
        <div class="node highlight">Secondary edits<br /><span class="mono">code-pair, history, context</span></div>
        <div class="node">Clinical review<br /><span class="mono">optional / manual</span></div>
        <div class="node">Adjudication<br /><span class="mono">benefits / COB / SIU</span></div>
        <div class="node">Pay or deny</div>
      </div>
      <p>
        Secondary edits can also run <strong>post-payment</strong>, driving audits and recoveries.
        Same rules, later timing. The industry sometimes splits these as
        <strong>pre-pay</strong> (prevent the improper payment) vs <strong>post-pay</strong>
        (recover it afterwards).
      </p>
      <p>
        Why both? Pre-pay is cheaper per dollar saved but has to be fast and low-friction; post-pay
        catches what pre-pay missed but requires recoupment negotiation. Most payers run layered
        programs that use both.
      </p>
    `,
  },

  {
    n: 6,
    title: "Category tour",
    subtitle: "The nine families of secondary edit",
    render: () => html`
      <p>
        Almost every secondary edit in production falls into one of these buckets. We have a
        dedicated explainer for each; here's the one-line version so you have a map.
      </p>
      <div class="card-grid">
        <a class="card" href="#/explainers/ncci-ptp">
          <span class="tag">NCCI PTP</span>
          <h3>Procedure-to-procedure pairs</h3>
          <p>Two codes that shouldn't be paid together on the same DOS.</p>
        </a>
        <a class="card" href="#/explainers/mue">
          <span class="tag">MUE</span>
          <h3>Unit ceilings</h3>
          <p>Max plausible units per code per beneficiary per day.</p>
        </a>
        <a class="card" href="#/explainers/global-surgery">
          <span class="tag">Global Surgery</span>
          <h3>Post-op period bundling</h3>
          <p>Visits inside 0/10/90-day windows that belong to the surgery.</p>
        </a>
        <a class="card" href="#/explainers/modifiers">
          <span class="tag">Modifiers</span>
          <h3>Modifier misuse</h3>
          <p>25, 59, X{EPSU}, 76/77, 58/78/79 and friends — applied incorrectly.</p>
        </a>
        <a class="card" href="#/explainers/duplicates">
          <span class="tag">Duplicates</span>
          <h3>Duplicate claims</h3>
          <p>Same service, same DOS, same patient, billed twice.</p>
        </a>
        <a class="card" href="#/explainers/frequency">
          <span class="tag">Frequency</span>
          <h3>Frequency / utilization</h3>
          <p>Service billed more often than policy allows.</p>
        </a>
        <a class="card" href="#/explainers/age-gender-pos">
          <span class="tag">Age / Gender / POS</span>
          <h3>Appropriateness</h3>
          <p>Procedure doesn't match patient demographics or setting.</p>
        </a>
        <a class="card" href="#/explainers/medical-necessity">
          <span class="tag">Medical Necessity</span>
          <h3>Diagnosis-to-procedure fit</h3>
          <p>Does the Dx actually support the procedure? (LCD/NCD driven.)</p>
        </a>
        <a class="card" href="#/explainers/unbundling">
          <span class="tag">Unbundling</span>
          <h3>Unbundling / fragmenting</h3>
          <p>Separate billing of components that should roll up.</p>
        </a>
      </div>
    `,
  },

  {
    n: 7,
    title: "A worked example end-to-end",
    subtitle: "Bilateral cataract surgery hits an NCCI PTP edit",
    render: () => html`
      <p>
        Let's walk one all the way through. This is the bilateral cataract claim from step 2.
        The patient had cataracts removed on both eyes in the same session.
      </p>
      ${renderClaimCard(bilateralCataractClaim)}
      <p>
        The coder entered ${term("CPT")} 66984 twice because two eyes were operated on. But the
        claim has no laterality modifiers. So when it hits the secondary edit engine:
      </p>
      ${renderEditCallout({
        ruleName: "NCCI PTP: same code, no override modifier",
        category: "NCCI PTP",
        carc: "236",
        rarc: "M80",
        message:
          "CPT 66984 appears on two lines for the same DOS/provider/patient without a laterality (-LT/-RT) or bilateral (-50) modifier. Second line denies as duplicate/improper payment.",
        involvedCodes: ["66984 × 2", "Missing: -RT / -LT or -50"],
      })}
      <p>
        The first line pays, the second line denies. Reading the remittance advice, the provider
        sees a ${term("CARC")} 236 and ${term("RARC")} M80 telling them the code combination
        isn't allowed without the right modifier.
      </p>
      ${renderResolutionCallout(
        "Resolution",
        html`Resubmit line 1 as <code>66984-RT</code> and line 2 as <code>66984-LT</code> (or,
          depending on the payer's rules, a single line with <code>66984-50</code>).
          <br /><br />
          Lesson: the edit didn't fire because the procedure was wrong — it fired because the
          <em>information needed to pay the procedure</em> was missing. That's the texture of
          most secondary edits.`,
      )}
    `,
  },

  {
    n: 8,
    title: "Who does this work",
    subtitle: "Users, workflows, and payer types",
    render: () => html`
      <p>Different people interact with the secondary edit layer at different points.</p>
      <ul>
        <li>
          <strong>Claim examiners</strong> — the day-in-day-out reviewers who work pended claims,
          decide whether an edit's fire is correct, and apply overrides when it isn't.
        </li>
        <li>
          <strong>Configuration analysts</strong> — the folks who tune the rule engine: write new
          rules, decide which edits to run pre-pay vs post-pay, manage false-positive rates.
        </li>
        <li>
          <strong>Medical coders (provider side)</strong> — validate claims before submission so
          they don't hit editor denials in the first place.
        </li>
        <li>
          <strong>Clinical reviewers</strong> — RN / MD reviewers who look at the subset of claims
          edits can't decide automatically (medical necessity, complex modifiers).
        </li>
        <li>
          <strong>${term("SIU")} / FWA analysts</strong> — use patterns from edits to investigate
          suspected fraud or abuse.
        </li>
      </ul>
      <h3>Payer-type context matters</h3>
      <p>
        Medicare follows CMS rules directly — NCCI edits are non-negotiable. Commercial payers
        adopt NCCI as a baseline but layer their own medical policy on top, so the same claim can
        edit differently at two payers. Medicaid varies by state. Whenever you're reading an
        edit, you need to know whose rule book it came from.
      </p>
    `,
  },

  {
    n: 9,
    title: "The vendor landscape",
    subtitle: "Where Machinify fits",
    render: () => html`
      <p>
        Secondary / post-primary editing is a crowded market. You'll hear these names
        constantly:
      </p>
      <ul>
        <li><strong>Cotiviti</strong> — long-time leader in second-pass / post-primary editing and retrospective payment integrity.</li>
        <li><strong>Optum (CES)</strong> — Claims Edit System, paired with Optum's broader PI suite.</li>
        <li><strong>Lyric (formerly ClaimsXten)</strong> — first-pass editing at scale, increasingly pushing into secondary.</li>
        <li><strong>EXL</strong> — analytics-forward PI services with a growing tech stack.</li>
        <li><strong>HealthEdge Source</strong> — content-heavy second-pass editor popular as a complement to another first-pass engine.</li>
        <li><strong>Rialtic, Ceris, ClaimLogiq, Zelis, MultiPlan/Claritev, HMS</strong> — niche or integrated players across the lifecycle.</li>
      </ul>
      <p>
        Buyers are consistently frustrated by: opaque rule logic, slow time-to-update when CMS
        publishes new NCCI tables, high false-positive rates that burden examiners, and
        difficulty customizing rules to plan-specific policy.
      </p>
      <blockquote>
        <p>
          <strong>Where Machinify fits:</strong> (placeholder — confirm positioning with the
          product team before using this slide in external contexts). The premise of our
          secondary-edits product is to be faster to update, more transparent in its
          reasoning, and easier for configuration analysts to customize than the incumbents.
        </p>
      </blockquote>
    `,
  },

  {
    n: 10,
    title: "Next steps",
    subtitle: "Where to go from here",
    render: () => html`
      <p>You've got the map. Pick a path to go deeper:</p>
      <div class="card-grid">
        <a class="card" href="#/explainers">
          <span class="tag">Reference</span>
          <h3>Explainers</h3>
          <p>Deep-dive one category at a time. Use as a lookup while you're working.</p>
        </a>
        <a class="card" href="#/tutorials">
          <span class="tag">Practice</span>
          <h3>Tutorials</h3>
          <p>Work through a claim, answer a decision, see the reasoning. Start with Modifier 25.</p>
        </a>
        <a class="card" href="#/examples">
          <span class="tag">Gallery</span>
          <h3>Examples</h3>
          <p>Eight worked scenarios showing edits firing and resolving. Good for pattern-matching.</p>
        </a>
        <a class="card" href="#/glossary">
          <span class="tag">Reference</span>
          <h3>Glossary</h3>
          <p>Every term from this walkthrough, plus more. Searchable.</p>
        </a>
      </div>
      <p style="margin-top:1.5rem">
        Recommendation: do one tutorial next (it's only ~5 minutes) to cement the two-pass
        mental model on a concrete decision. Modifier 25 is the highest-leverage one to start
        with.
      </p>
    `,
  },
];

export const walkthroughSources = [
  {
    label: "CMS NCCI Policy Manual",
    url: "https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits/medicare-ncci-policy-manual",
  },
  {
    label: "CMS Medicare Claims Processing Manual, Ch. 23",
    url: "https://www.cms.gov/Regulations-and-Guidance/Guidance/Manuals/downloads/clm104c23.pdf",
  },
  {
    label: "AAPC: Correct Coding & Payment Integrity",
    url: "https://www.aapc.com/blog/44372-correct-coding-concepts-and-payment-integrity/",
  },
];
