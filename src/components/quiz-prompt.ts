import type { QuizOption } from "../types.js";
import { escapeHtml, html } from "../render.js";

export interface QuizRenderOptions {
  quizId: string;
  prompt: string;
  options: QuizOption[];
  selectedId?: string;
  wrapUp?: string;
}

export function renderQuiz(opts: QuizRenderOptions): string {
  const selected = opts.options.find((o) => o.id === opts.selectedId);
  const disabled = selected != null;
  const optionsMarkup = opts.options
    .map((opt, i) => {
      const letter = String.fromCharCode(65 + i);
      const classes = ["option"];
      if (disabled) {
        if (opt.id === opts.selectedId) {
          classes.push(opt.correct ? "correct" : "incorrect");
        }
      }
      return `<button
        class="${classes.join(" ")}"
        data-quiz-id="${escapeHtml(opts.quizId)}"
        data-option-id="${escapeHtml(opt.id)}"
        ${disabled ? "disabled" : ""}
      >
        <span class="marker">${letter}.</span>
        <span>${escapeHtml(opt.text)}</span>
      </button>`;
    })
    .join("");
  const rationale = selected
    ? `<div class="rationale"><strong>${selected.correct ? "Correct." : "Not quite."}</strong> ${escapeHtml(selected.rationale)}${
        opts.wrapUp ? `<br/><br/>${escapeHtml(opts.wrapUp)}` : ""
      }</div>`
    : "";
  return html`
    <div class="quiz" data-quiz-root="${opts.quizId}">
      <div class="prompt">${opts.prompt}</div>
      <div class="options">${optionsMarkup}</div>
      ${rationale}
    </div>
  `;
}
