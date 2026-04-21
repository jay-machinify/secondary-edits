import { escapeHtml, html } from "../render.js";
import { glossary } from "../content/glossary.js";

export function term(lookup: string, displayText?: string): string {
  const entry = glossary.find(
    (g) => g.term.toLowerCase() === lookup.toLowerCase(),
  );
  const shown = displayText ?? lookup;
  if (!entry) return escapeHtml(shown);
  return html`<span class="term" tabindex="0"
    >${escapeHtml(shown)}<span class="term-pop" role="tooltip"
      ><strong>${escapeHtml(entry.term)}</strong
      >${entry.full ? ` — ${escapeHtml(entry.full)}` : ""}<br />${escapeHtml(
      entry.definition,
    )}</span
    ></span
  >`;
}
