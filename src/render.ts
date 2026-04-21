export function escapeHtml(value: unknown): string {
  const s = value == null ? "" : String(value);
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function html(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  let out = "";
  strings.forEach((chunk, i) => {
    out += chunk;
    if (i < values.length) {
      const v = values[i];
      if (v == null || v === false) {
        out += "";
      } else if (Array.isArray(v)) {
        out += v.join("");
      } else if (
        typeof v === "string" &&
        (v.startsWith("<") || v.includes("</"))
      ) {
        out += v;
      } else if (typeof v === "number" || typeof v === "boolean") {
        out += String(v);
      } else {
        out += escapeHtml(v);
      }
    }
  });
  return out;
}

export function raw(markup: string): string {
  return markup;
}

export function mount(target: HTMLElement, markup: string): void {
  target.innerHTML = markup;
}

export interface ClickHandler {
  selector: string;
  handler: (event: MouseEvent, target: HTMLElement) => void;
}

export function delegateClicks(
  root: HTMLElement,
  handlers: ClickHandler[],
): () => void {
  const listener = (event: Event) => {
    if (!(event instanceof MouseEvent)) return;
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    for (const { selector, handler } of handlers) {
      const match = target.closest(selector);
      if (match && match instanceof HTMLElement && root.contains(match)) {
        handler(event, match);
        return;
      }
    }
  };
  root.addEventListener("click", listener);
  return () => root.removeEventListener("click", listener);
}
