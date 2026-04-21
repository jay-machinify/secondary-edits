export interface Route {
  pattern: RegExp;
  handler: (match: RegExpMatchArray) => string;
}

export interface RouterContext {
  path: string;
  markup: string;
  after?: () => void;
}

export type RouteMatcher = (path: string) => RouterContext | null;

let matcher: RouteMatcher | null = null;
let root: HTMLElement | null = null;
let afterHook: (() => void) | null = null;

export function init(
  rootEl: HTMLElement,
  match: RouteMatcher,
  onAfterRender?: () => void,
): void {
  root = rootEl;
  matcher = match;
  afterHook = onAfterRender ?? null;
  window.addEventListener("hashchange", render);
  render();
}

export function currentPath(): string {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return "/";
  return raw.startsWith("/") ? raw : `/${raw}`;
}

export function navigate(path: string): void {
  const target = path.startsWith("/") ? path : `/${path}`;
  if (window.location.hash === `#${target}`) {
    render();
  } else {
    window.location.hash = `#${target}`;
  }
}

function render(): void {
  if (!root || !matcher) return;
  const path = currentPath();
  const ctx = matcher(path);
  if (!ctx) {
    root.innerHTML = `<main class="page"><h1 class="page-title">Not found</h1><p>No route matches <code>${path}</code>.</p><p><a href="#/">Back home</a></p></main>`;
    return;
  }
  root.innerHTML = ctx.markup;
  if (ctx.after) ctx.after();
  if (afterHook) afterHook();
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

export function rerender(): void {
  render();
}
