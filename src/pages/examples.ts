import { html, escapeHtml } from "../render.js";
import type { RouterContext } from "../router.js";
import { page } from "../layout.js";
import { examples, findExample } from "../content/examples/index.js";
import { renderClaimCard } from "../components/claim-card.js";
import { renderEditCallout, renderResolutionCallout } from "../components/edit-callout.js";
import { markExampleViewed, getProgress } from "../progress.js";

const FILTER_KEY = "secondary-edits/examples-filter/v1";

function readFilter(): string {
  try {
    return window.sessionStorage.getItem(FILTER_KEY) ?? "all";
  } catch {
    return "all";
  }
}

export function writeFilter(value: string): void {
  try {
    window.sessionStorage.setItem(FILTER_KEY, value);
  } catch {
    /* ignore */
  }
}

export function renderExamplesIndex(): RouterContext {
  const activeFilter = readFilter();
  const categories = Array.from(new Set(examples.map((e) => e.category)));
  const progress = getProgress();

  const chips = [
    `<button class="chip ${activeFilter === "all" ? "active" : ""}" data-filter-chip="all">All</button>`,
    ...categories.map(
      (c) =>
        `<button class="chip ${activeFilter === c ? "active" : ""}" data-filter-chip="${escapeHtml(c)}">${escapeHtml(c)}</button>`,
    ),
  ].join("");

  const visible =
    activeFilter === "all"
      ? examples
      : examples.filter((e) => e.category === activeFilter);

  const cards = visible
    .map(
      (ex) => `
        <a class="card" href="#/examples/${ex.slug}">
          <span class="tag">${ex.category}</span>
          <h3>${escapeHtml(ex.title)}</h3>
          <p>${escapeHtml(ex.lede)}</p>
          ${progress.examplesViewed.includes(ex.slug) ? '<span class="done-check">✓ Viewed</span>' : ""}
        </a>
      `,
    )
    .join("");

  return {
    path: "/examples",
    markup: page(
      "Examples",
      "Eight worked claim scenarios showing an edit firing and the resolution. Good for pattern-matching.",
      html`<div class="chips">${chips}</div>
        <div class="card-grid">${cards}</div>`,
    ),
  };
}

export function renderExampleDetail(slug: string): RouterContext {
  const ex = findExample(slug);
  if (!ex) {
    return {
      path: `/examples/${slug}`,
      markup: page(
        "Not found",
        null,
        `<p>No example found for <code>${escapeHtml(slug)}</code>.</p><p><a href="#/examples">Back to examples</a></p>`,
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
      <div style="margin-bottom:0.75rem">
        <a href="#/examples" style="font-size:0.85rem;color:var(--ink-faint);"
          >← All examples</a
        >
        <span
          class="tag"
          style="margin-left:0.6rem;font-size:0.72rem;background:var(--accent-soft);color:var(--accent-ink);padding:0.15rem 0.55rem;border-radius:4px;text-transform:uppercase;letter-spacing:0.04em;"
          >${ex.category}</span
        >
      </div>
      <h1 class="page-title">${ex.title}</h1>
      <p class="page-lede">${ex.lede}</p>

      <article class="content-frame">
        <h2 style="margin-top:0">1 · The submitted claim</h2>
        ${renderClaimCard(ex.claim)}

        <h2>2 · Edit fired</h2>
        ${renderEditCallout(ex.edit)}

        <h2>3 · Resolution</h2>
        ${renderResolutionCallout(ex.resolutionTitle, ex.resolution)}

        <aside class="sources">
          <h3>Sources</h3>
          <ul>
            ${sourcesList}
          </ul>
        </aside>
      </article>
      <div class="nav-row">
        <a class="btn ghost" href="#/examples">← All examples</a>
        <a class="btn ghost" href="#/glossary">Glossary →</a>
      </div>
    </main>
  `;

  return {
    path: `/examples/${slug}`,
    markup,
    after: () => markExampleViewed(slug),
  };
}
