import type { Claim } from "../types.js";
import { escapeHtml, html } from "../render.js";

export function renderClaimCard(claim: Claim): string {
  const lines = claim.lines
    .map(
      (line) => `
        <tr>
          <td>${line.lineNo}</td>
          <td class="code">${escapeHtml(line.code)}${line.modifiers && line.modifiers.length ? "-" + line.modifiers.map(escapeHtml).join("-") : ""}</td>
          <td>${escapeHtml(line.description)}</td>
          <td>${escapeHtml(line.dos)}</td>
          <td>${line.pos ? escapeHtml(line.pos) : "—"}</td>
          <td>${line.units ?? 1}</td>
          <td>${line.charge ? escapeHtml(line.charge) : "—"}</td>
        </tr>
      `,
    )
    .join("");
  const patient = claim.patient;
  const patientBits: string[] = [`ID ${escapeHtml(patient.id)}`];
  if (patient.age != null) patientBits.push(`age ${patient.age}`);
  if (patient.sex) patientBits.push(patient.sex === "F" ? "female" : "male");
  return html`
    <div class="claim" role="group" aria-label="Fictional claim">
      <div class="claim-header">
        <span class="form-type">${claim.formType}</span>
        <span>Claim ${escapeHtml(claim.id)}</span>
      </div>
      <div class="claim-body">
        <div class="field">
          <span class="k">Patient</span>
          <span class="v">${patientBits.join(" · ")}</span>
        </div>
        <div class="field">
          <span class="k">Provider</span
          ><span class="v"
            >${escapeHtml(claim.provider.name)}${claim.provider.specialty
              ? ` · ${escapeHtml(claim.provider.specialty)}`
              : ""}</span
          >
        </div>
        <div class="field">
          <span class="k">Diagnoses (ICD-10)</span
          ><span class="v">${claim.dx.map(escapeHtml).join(", ")}</span>
        </div>
        ${claim.note
          ? `<div class="field"><span class="k">Note</span><span class="v">${escapeHtml(claim.note)}</span></div>`
          : ""}
      </div>
      <table class="lines">
        <thead>
          <tr>
            <th>#</th>
            <th>Code</th>
            <th>Description</th>
            <th>DOS</th>
            <th>POS</th>
            <th>Units</th>
            <th>Charge</th>
          </tr>
        </thead>
        <tbody>
          ${lines}
        </tbody>
      </table>
      <div class="disclaimer">Fictional claim — for training only</div>
    </div>
  `;
}
