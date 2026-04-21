import { html, escapeHtml } from "../render.js";
import type { RouterContext } from "../router.js";
import { page } from "../layout.js";
import { glossary } from "../content/glossary.js";

const SEARCH_KEY = "secondary-edits/glossary-search/v1";

function readSearch(): string {
  try {
    return window.sessionStorage.getItem(SEARCH_KEY) ?? "";
  } catch {
    return "";
  }
}

export function writeSearch(value: string): void {
  try {
    window.sessionStorage.setItem(SEARCH_KEY, value);
  } catch {
    /* ignore */
  }
}

export function renderGlossary(): RouterContext {
  const q = readSearch().toLowerCase().trim();
  const sorted = [...glossary].sort((a, b) =>
    a.term.localeCompare(b.term),
  );
  const matches = q
    ? sorted.filter(
        (entry) =>
          entry.term.toLowerCase().includes(q) ||
          (entry.full ?? "").toLowerCase().includes(q) ||
          entry.definition.toLowerCase().includes(q),
      )
    : sorted;

  const entries = matches
    .map(
      (entry) => `
        <div class="glossary-entry">
          <div class="term-name">${escapeHtml(entry.term)}</div>
          ${entry.full ? `<div class="term-full">${escapeHtml(entry.full)}</div>` : ""}
          <div>${escapeHtml(entry.definition)}</div>
        </div>
      `,
    )
    .join("");

  const body = html`
    <input
      type="search"
      class="glossary-search"
      placeholder="Search — e.g., 'CARC', 'modifier 25', 'global period'"
      data-glossary-search
      value="${readSearch()}"
    />
    ${matches.length === 0
      ? `<p style="color:var(--ink-faint);">No matches for <code>${escapeHtml(q)}</code>.</p>`
      : `<div class="glossary-list">${entries}</div>`}
  `;

  return {
    path: "/glossary",
    markup: page(
      "Glossary",
      `${glossary.length} terms from the walkthrough, explainers, tutorials, and examples. Hover a term anywhere in the app to see a quick definition.`,
      body,
    ),
  };
}
