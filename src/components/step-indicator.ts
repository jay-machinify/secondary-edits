import { html } from "../render.js";

export interface StepIndicatorOptions {
  total: number;
  current: number;
  maxReached?: number;
  hrefFor: (n: number) => string;
  label?: string;
}

export function renderStepIndicator(opts: StepIndicatorOptions): string {
  const reached = opts.maxReached ?? opts.current;
  const dots: string[] = [];
  for (let i = 1; i <= opts.total; i++) {
    const classes: string[] = ["dot"];
    if (i === opts.current) classes.push("active");
    else if (i <= reached) classes.push("done");
    dots.push(
      `<a class="${classes.join(" ")}" href="#${opts.hrefFor(i)}" aria-label="Step ${i}">${i}</a>`,
    );
  }
  return html`
    <nav class="step-indicator" aria-label="Progress">
      ${dots.join("")}
      <span class="label"
        >${opts.label ?? `Step ${opts.current} of ${opts.total}`}</span
      >
    </nav>
  `;
}
