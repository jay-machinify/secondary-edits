import { html, escapeHtml } from "../render.js";
import type { RouterContext } from "../router.js";
import { page } from "../layout.js";
import { tutorials, findTutorial } from "../content/tutorials/index.js";
import { renderClaimCard } from "../components/claim-card.js";
import { renderQuiz } from "../components/quiz-prompt.js";
import { renderStepIndicator } from "../components/step-indicator.js";
import { getProgress } from "../progress.js";

const QUIZ_KEY = "secondary-edits/quiz/v1";

interface QuizStore {
  [quizId: string]: string;
}

export function readQuizState(): QuizStore {
  try {
    const raw = window.sessionStorage.getItem(QUIZ_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as QuizStore;
  } catch {
    return {};
  }
}

export function writeQuizState(state: QuizStore): void {
  try {
    window.sessionStorage.setItem(QUIZ_KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

export function quizId(tutorialSlug: string, step: number): string {
  return `${tutorialSlug}:${step}`;
}

export function renderTutorialsIndex(): RouterContext {
  const progress = getProgress();
  const cards = tutorials
    .map(
      (t) => `
        <a class="card" href="#/tutorials/${t.slug}">
          <span class="tag">${t.category}</span>
          <h3>${escapeHtml(t.title)}</h3>
          <p>${escapeHtml(t.lede)}</p>
          ${progress.tutorialsCompleted.includes(t.slug) ? '<span class="done-check">✓ Completed</span>' : ""}
        </a>
      `,
    )
    .join("");
  return {
    path: "/tutorials",
    markup: page(
      "Tutorials",
      "Interactive lessons with decision checkpoints. Pick a claim-line decision, get the reasoning, move on. ~5 minutes each.",
      html`<div class="card-grid">${cards}</div>`,
    ),
  };
}

export function renderTutorialDetail(
  slug: string,
  stepNo: number,
): RouterContext {
  const tutorial = findTutorial(slug);
  if (!tutorial) {
    return {
      path: `/tutorials/${slug}`,
      markup: page(
        "Not found",
        null,
        `<p>No tutorial found for <code>${escapeHtml(slug)}</code>.</p><p><a href="#/tutorials">Back to tutorials</a></p>`,
      ),
    };
  }

  const total = tutorial.steps.length;
  const step = Math.max(1, Math.min(stepNo, total));
  const current = tutorial.steps[step - 1];
  const quizState = readQuizState();
  const thisQuizId = quizId(slug, step);
  const selectedId = quizState[thisQuizId];

  const indicator = renderStepIndicator({
    total,
    current: step,
    hrefFor: (i) => `/tutorials/${slug}/${i}`,
  });

  const quizMarkup = current.quiz
    ? renderQuiz({
        quizId: thisQuizId,
        prompt: current.quiz.prompt,
        options: current.quiz.options,
        selectedId,
        wrapUp: current.quiz.wrapUp,
      })
    : "";

  const prev = step > 1 ? step - 1 : null;
  const next = step < total ? step + 1 : null;

  const nextDisabled = current.quiz && !selectedId;
  const nextBtn = next
    ? nextDisabled
      ? `<button class="btn primary" disabled title="Answer the question first">Next →</button>`
      : `<a class="btn primary" href="#/tutorials/${slug}/${next}">Next →</a>`
    : `<button class="btn primary" data-tutorial-finish="${escapeHtml(slug)}">Finish →</button>`;

  const nav = html`
    <div class="nav-row">
      ${prev
        ? `<a class="btn ghost" href="#/tutorials/${slug}/${prev}">← Back</a>`
        : `<a class="btn ghost" href="#/tutorials">← All tutorials</a>`}
      ${nextBtn}
    </div>
  `;

  const isLast = step === total;
  const sourcesMarkup = isLast
    ? html`<aside class="sources">
        <h3>Sources</h3>
        <ul>
          ${tutorial.sources
            .map(
              (s) =>
                `<li>${s.url ? `<a href="${s.url}" target="_blank" rel="noreferrer">${escapeHtml(s.label)}</a>` : escapeHtml(s.label)}</li>`,
            )
            .join("")}
        </ul>
      </aside>`
    : "";

  const markup = html`
    <main class="page">
      <div style="margin-bottom:0.75rem">
        <a href="#/tutorials" style="font-size:0.85rem;color:var(--ink-faint);"
          >← All tutorials</a
        >
        <span
          class="tag"
          style="margin-left:0.6rem;font-size:0.72rem;background:var(--accent-soft);color:var(--accent-ink);padding:0.15rem 0.55rem;border-radius:4px;text-transform:uppercase;letter-spacing:0.04em;"
          >${tutorial.category}</span
        >
      </div>
      <h1 class="page-title">${tutorial.title}</h1>
      <p class="page-lede">${tutorial.lede}</p>
      ${indicator}
      <article class="content-frame">
        <h2 style="margin-top:0">${current.title}</h2>
        <p>${current.body}</p>
        ${current.claim ? renderClaimCard(current.claim) : ""} ${quizMarkup}
        ${sourcesMarkup}
      </article>
      ${nav}
    </main>
  `;

  return {
    path: `/tutorials/${slug}/${step}`,
    markup,
  };
}
