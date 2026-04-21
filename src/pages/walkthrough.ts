import { html } from "../render.js";
import type { RouterContext } from "../router.js";
import { walkthrough, walkthroughSources } from "../content/walkthrough.js";
import { renderStepIndicator } from "../components/step-indicator.js";
import { markWalkthroughStep, getProgress } from "../progress.js";

export function renderWalkthrough(n: number): RouterContext {
  const total = walkthrough.length;
  const step = Math.max(1, Math.min(n, total));
  const current = walkthrough[step - 1];
  const maxReached = getProgress().walkthroughMaxStep;

  const indicator = renderStepIndicator({
    total,
    current: step,
    maxReached,
    hrefFor: (i) => `/walkthrough/${i}`,
  });

  const prev = step > 1 ? step - 1 : null;
  const next = step < total ? step + 1 : null;

  const sources =
    step === total
      ? html`
          <aside class="sources">
            <h3>Authoritative references used in this walkthrough</h3>
            <ul>
              ${walkthroughSources
                .map(
                  (s) =>
                    `<li>${s.url ? `<a href="${s.url}" target="_blank" rel="noreferrer">${s.label}</a>` : s.label}</li>`,
                )
                .join("")}
            </ul>
          </aside>
        `
      : "";

  const nav = html`
    <div class="nav-row">
      ${prev
        ? `<a class="btn ghost" href="#/walkthrough/${prev}">← Back</a>`
        : `<span></span>`}
      ${next
        ? `<a class="btn primary" href="#/walkthrough/${next}">Next →</a>`
        : `<a class="btn primary" href="#/">Finish & return home</a>`}
    </div>
  `;

  const body = html`
    <main class="page">
      ${indicator}
      <article class="content-frame">
        <h1>${current.title}</h1>
        ${current.subtitle ? `<p class="page-lede">${current.subtitle}</p>` : ""}
        ${current.render()} ${sources}
      </article>
      ${nav}
    </main>
  `;

  return {
    path: `/walkthrough/${step}`,
    markup: body,
    after: () => markWalkthroughStep(step, total),
  };
}
