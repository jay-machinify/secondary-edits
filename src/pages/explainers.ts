import { html, escapeHtml } from "../render.js";
import type { RouterContext } from "../router.js";
import { page } from "../layout.js";
import { explainers, findExplainer } from "../content/explainers/index.js";
import { markExplainerRead } from "../progress.js";
import { renderClaimCard } from "../components/claim-card.js";
import { renderEditCallout, renderResolutionCallout } from "../components/edit-callout.js";

export function renderExplainersIndex(): RouterContext {
  const cards = explainers
    .map(
      (ex) => `
        <a class="card" href="#/explainers/${ex.slug}">
          <span class="tag">${ex.category}</span>
          <h3>${escapeHtml(ex.title)}</h3>
          <p>${escapeHtml(ex.oneLiner)}</p>
        </a>
      `,
    )
    .join("");

  return {
    path: "/explainers",
    markup: page(
      "Explainers",
      "Deep-dive one category at a time. Each page uses the same template: definition, when it fires, key references, edge cases, a mini-example, and sources.",
      html`<div class="card-grid">${cards}</div>`,
    ),
  };
}

export function renderExplainerDetail(slug: string): RouterContext {
  const ex = findExplainer(slug);
  if (!ex) {
    return {
      path: `/explainers/${slug}`,
      markup: page(
        "Not found",
        null,
        `<p>No explainer found for <code>${escapeHtml(slug)}</code>.</p><p><a href="#/explainers">Back to explainers</a></p>`,
      ),
    };
  }

  const sourcesList = ex.sources
    .map(
      (s) =>
        `<li>${s.url ? `<a href="${s.url}" target="_blank" rel="noreferrer">${escapeHtml(s.label)}</a>` : escapeHtml(s.label)}</li>`,
    )
    .join("");

  const markup = html`
    <main class="page">
      <article class="content-frame">
        <div
          style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;"
        >
          <span
            class="tag"
            style="font-size:0.72rem;background:var(--accent-soft);color:var(--accent-ink);padding:0.15rem 0.55rem;border-radius:4px;text-transform:uppercase;letter-spacing:0.04em;"
            >${ex.category}</span
          >
        </div>
        <h1>${ex.title}</h1>
        <p class="page-lede">${ex.oneLiner}</p>

        <h2>Definition</h2>
        <p>${ex.definition}</p>
        ${ex.conceptNote ?? ""}

        <h2>When it fires</h2>
        <ul>
          ${ex.whenItFires.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}
        </ul>

        <h2>Key references</h2>
        <ul>
          ${ex.keyReferences.map((k) => `<li>${escapeHtml(k)}</li>`).join("")}
        </ul>

        <h2>Common edge cases</h2>
        <ul>
          ${ex.edgeCases.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}
        </ul>

        <h2>Mini example</h2>
        <p>${ex.miniExample.summary}</p>
        ${ex.miniExample.claim ? renderClaimCard(ex.miniExample.claim) : ""}
        ${ex.miniExample.edit ? renderEditCallout(ex.miniExample.edit) : ""}
        ${renderResolutionCallout("Resolution", ex.miniExample.resolution)}

        <aside class="sources">
          <h3>Sources</h3>
          <ul>
            ${sourcesList}
          </ul>
        </aside>
      </article>
      <div class="nav-row">
        <a class="btn ghost" href="#/explainers">← All explainers</a>
        <a class="btn ghost" href="#/glossary">Glossary →</a>
      </div>
    </main>
  `;

  return {
    path: `/explainers/${slug}`,
    markup,
    after: () => markExplainerRead(slug),
  };
}
