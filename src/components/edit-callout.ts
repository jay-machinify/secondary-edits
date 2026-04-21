import type { EditHit } from "../types.js";
import { escapeHtml, html } from "../render.js";

export function renderEditCallout(edit: EditHit): string {
  const codes = edit.involvedCodes
    .map((c) => `<span>${escapeHtml(c)}</span>`)
    .join("");
  return html`
    <div class="edit-callout" role="alert">
      <div class="title">
        <span class="tag">${escapeHtml(edit.category)}</span>
        ${escapeHtml(edit.ruleName)}
      </div>
      <div class="reason">${escapeHtml(edit.message)}</div>
      <div class="codes">
        <span>CARC ${escapeHtml(edit.carc)}</span>
        ${edit.rarc ? `<span>RARC ${escapeHtml(edit.rarc)}</span>` : ""}
        ${codes}
      </div>
    </div>
  `;
}

export function renderResolutionCallout(
  title: string,
  body: string,
): string {
  return html`
    <div class="resolution-callout">
      <div class="title">${escapeHtml(title)}</div>
      <div>${body}</div>
    </div>
  `;
}
