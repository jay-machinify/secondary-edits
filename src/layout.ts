import { html } from "./render.js";
import { getProgress } from "./progress.js";
import { currentPath } from "./router.js";

const NAV = [
  { path: "/", label: "Home" },
  { path: "/walkthrough", label: "Walkthrough" },
  { path: "/explainers", label: "Explainers" },
  { path: "/tutorials", label: "Tutorials" },
  { path: "/examples", label: "Examples" },
  { path: "/glossary", label: "Glossary" },
];

function isActive(path: string, current: string): boolean {
  if (path === "/") return current === "/";
  return current === path || current.startsWith(path + "/");
}

function progressPill(): string {
  const p = getProgress();
  if (p.walkthroughCompleted) {
    const tutorials = p.tutorialsCompleted.length;
    const explainers = p.explainersRead.length;
    return `Walkthrough done · ${explainers} explainers · ${tutorials} tutorials`;
  }
  if (p.walkthroughMaxStep > 0) {
    return `Walkthrough step ${p.walkthroughMaxStep} / 10`;
  }
  return "Start with the walkthrough →";
}

export function shell(innerMarkup: string): string {
  const current = currentPath();
  const navLinks = NAV.map(
    (item) =>
      `<a href="#${item.path}" class="${isActive(item.path, current) ? "active" : ""}">${item.label}</a>`,
  ).join("");
  return html`
    <div class="app-shell">
      <header class="top-nav">
        <a href="#/" class="brand"
          >Secondary Edits<span class="sub">Training</span></a
        >
        <nav>${navLinks}</nav>
        <span class="progress-pill" title="Your progress is stored locally"
          >${progressPill()}</span
        >
      </header>
      ${innerMarkup}
    </div>
  `;
}

export function page(
  title: string,
  lede: string | null,
  body: string,
): string {
  return html`
    <main class="page">
      <h1 class="page-title">${title}</h1>
      ${lede ? `<p class="page-lede">${lede}</p>` : ""}
      ${body}
    </main>
  `;
}
