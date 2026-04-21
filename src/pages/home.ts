import { html } from "../render.js";
import type { RouterContext } from "../router.js";
import { getProgress } from "../progress.js";
import { explainers } from "../content/explainers/index.js";
import { tutorials } from "../content/tutorials/index.js";
import { examples } from "../content/examples/index.js";
import { glossary } from "../content/glossary.js";

export function renderHome(): RouterContext {
  const progress = getProgress();
  const started = progress.walkthroughMaxStep > 0;
  const done = progress.walkthroughCompleted;

  const cta = done
    ? html`<a class="btn primary" href="#/tutorials">Continue with a tutorial →</a>
        <a class="btn ghost" href="#/walkthrough/1">Revisit walkthrough</a>`
    : started
      ? html`<a
            class="btn primary"
            href="#/walkthrough/${Math.min(progress.walkthroughMaxStep + 1, 10)}"
            >Resume walkthrough (step ${progress.walkthroughMaxStep}/10) →</a
          >`
      : html`<a class="btn primary" href="#/walkthrough/1"
          >Start the walkthrough →</a
        >`;

  const hero = html`
    <section class="home-hero">
      <h1>Secondary code edits — a ~15 minute ramp</h1>
      <p>
        This training teaches the second-pass claim-editing layer that lives at the heart of
        healthcare payment integrity. Start with the walkthrough. Come back for the explainers,
        tutorials, and examples whenever you need to sharpen a specific concept.
      </p>
      <div class="cta-row">${cta}</div>
    </section>
  `;

  const sections = html`
    <div class="section-header">
      <h2>Walkthrough</h2>
      <span class="hint">Recommended first step — 10 screens</span>
    </div>
    <div class="card-grid">
      <a class="card" href="#/walkthrough/1">
        <span class="tag">Guided tour</span>
        <h3>Everything in one pass</h3>
        <p>
          Claim anatomy → primary vs secondary → the nine edit categories → a worked example →
          where this work happens and who does it.
        </p>
        ${done ? `<span class="done-check">✓ Completed</span>` : ""}
      </a>
    </div>

    <div class="section-header">
      <h2>Explainers</h2>
      <span class="hint">${explainers.length} deep-dives, one per edit family</span>
    </div>
    <div class="card-grid">
      ${explainers
        .map(
          (ex) => `
          <a class="card" href="#/explainers/${ex.slug}">
            <span class="tag">${ex.category}</span>
            <h3>${ex.title}</h3>
            <p>${ex.oneLiner}</p>
            ${progress.explainersRead.includes(ex.slug) ? '<span class="done-check">✓ Read</span>' : ""}
          </a>
        `,
        )
        .join("")}
    </div>

    <div class="section-header">
      <h2>Tutorials</h2>
      <span class="hint">${tutorials.length} interactive lessons with decision checkpoints</span>
    </div>
    <div class="card-grid">
      ${tutorials
        .map(
          (t) => `
          <a class="card" href="#/tutorials/${t.slug}">
            <span class="tag">${t.category}</span>
            <h3>${t.title}</h3>
            <p>${t.lede}</p>
            ${progress.tutorialsCompleted.includes(t.slug) ? '<span class="done-check">✓ Completed</span>' : ""}
          </a>
        `,
        )
        .join("")}
    </div>

    <div class="section-header">
      <h2>Examples</h2>
      <span class="hint">${examples.length} worked claim scenarios</span>
    </div>
    <div class="card-grid">
      ${examples
        .map(
          (ex) => `
          <a class="card" href="#/examples/${ex.slug}">
            <span class="tag">${ex.category}</span>
            <h3>${ex.title}</h3>
            <p>${ex.lede}</p>
            ${progress.examplesViewed.includes(ex.slug) ? '<span class="done-check">✓ Viewed</span>' : ""}
          </a>
        `,
        )
        .join("")}
    </div>

    <div class="section-header">
      <h2>Glossary</h2>
      <span class="hint">${glossary.length} terms, searchable</span>
    </div>
    <div class="card-grid">
      <a class="card" href="#/glossary">
        <span class="tag">Reference</span>
        <h3>Every term in this app</h3>
        <p>CPT, HCPCS, ICD-10, CARC/RARC, LCD/NCD, modifiers 25 / 59 / 76 / 58 / 78 / 79, and more.</p>
      </a>
    </div>
  `;

  return {
    path: "/",
    markup: `<main class="page">${hero}${sections}</main>`,
  };
}
