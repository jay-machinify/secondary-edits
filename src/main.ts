import { init, RouterContext, navigate, rerender } from "./router.js";
import { shell } from "./layout.js";
import { renderHome } from "./pages/home.js";
import { renderWalkthrough } from "./pages/walkthrough.js";
import {
  renderExplainersIndex,
  renderExplainerDetail,
} from "./pages/explainers.js";
import {
  renderTutorialsIndex,
  renderTutorialDetail,
  readQuizState,
  writeQuizState,
} from "./pages/tutorials.js";
import {
  renderExamplesIndex,
  renderExampleDetail,
  writeFilter,
} from "./pages/examples.js";
import { renderGlossary, writeSearch } from "./pages/glossary.js";
import { markTutorialCompleted } from "./progress.js";

type Match = RegExpMatchArray;

interface Route {
  pattern: RegExp;
  handler: (match: Match) => RouterContext;
}

const ROUTES: Route[] = [
  { pattern: /^\/$/, handler: () => wrap(renderHome()) },
  {
    pattern: /^\/walkthrough(?:\/(\d+))?$/,
    handler: (m) => wrap(renderWalkthrough(m[1] ? parseInt(m[1], 10) : 1)),
  },
  { pattern: /^\/explainers$/, handler: () => wrap(renderExplainersIndex()) },
  {
    pattern: /^\/explainers\/([a-z0-9-]+)$/,
    handler: (m) => wrap(renderExplainerDetail(m[1])),
  },
  { pattern: /^\/tutorials$/, handler: () => wrap(renderTutorialsIndex()) },
  {
    pattern: /^\/tutorials\/([a-z0-9-]+)(?:\/(\d+))?$/,
    handler: (m) =>
      wrap(renderTutorialDetail(m[1], m[2] ? parseInt(m[2], 10) : 1)),
  },
  { pattern: /^\/examples$/, handler: () => wrap(renderExamplesIndex()) },
  {
    pattern: /^\/examples\/([a-z0-9-]+)$/,
    handler: (m) => wrap(renderExampleDetail(m[1])),
  },
  { pattern: /^\/glossary$/, handler: () => wrap(renderGlossary()) },
];

function wrap(ctx: RouterContext): RouterContext {
  return {
    path: ctx.path,
    markup: shell(ctx.markup),
    after: ctx.after,
  };
}

function matchRoute(path: string): RouterContext | null {
  for (const route of ROUTES) {
    const match = path.match(route.pattern);
    if (match) {
      const ctx = route.handler(match);
      ctx.path = path;
      return ctx;
    }
  }
  return null;
}

function installGlobalHandlers(root: HTMLElement): void {
  root.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    const target = event.target;

    const quizBtn = target.closest(".quiz .option");
    if (quizBtn instanceof HTMLElement) {
      const quizIdAttr = quizBtn.getAttribute("data-quiz-id");
      const optionIdAttr = quizBtn.getAttribute("data-option-id");
      if (quizIdAttr && optionIdAttr) {
        const state = readQuizState();
        if (!state[quizIdAttr]) {
          state[quizIdAttr] = optionIdAttr;
          writeQuizState(state);
          rerender();
        }
        event.preventDefault();
        return;
      }
    }

    const finishBtn = target.closest("[data-tutorial-finish]");
    if (finishBtn instanceof HTMLElement) {
      const slug = finishBtn.getAttribute("data-tutorial-finish");
      if (slug) {
        markTutorialCompleted(slug);
        navigate("/tutorials");
      }
      event.preventDefault();
      return;
    }

    const filterChip = target.closest("[data-filter-chip]");
    if (filterChip instanceof HTMLElement) {
      const value = filterChip.getAttribute("data-filter-chip");
      if (value) {
        writeFilter(value);
        rerender();
      }
      event.preventDefault();
      return;
    }
  });

  root.addEventListener("input", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    const target = event.target;
    if (target.matches("[data-glossary-search]")) {
      const input = target as HTMLInputElement;
      writeSearch(input.value);
      const q = input.value.toLowerCase().trim();
      const entries = root.querySelectorAll<HTMLElement>(".glossary-entry");
      let visible = 0;
      entries.forEach((el) => {
        const text = (el.textContent ?? "").toLowerCase();
        const show = !q || text.includes(q);
        el.style.display = show ? "" : "none";
        if (show) visible++;
      });
      const empty = root.querySelector<HTMLElement>(
        ".glossary-search + p",
      );
      if (empty) {
        empty.style.display = visible === 0 ? "" : "none";
      }
    }
  });
}

function main(): void {
  const root = document.getElementById("app");
  if (!root) throw new Error("#app element not found");
  installGlobalHandlers(root);
  init(root, matchRoute);
}

main();
