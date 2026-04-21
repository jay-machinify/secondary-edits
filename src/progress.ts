const KEY = "secondary-edits/progress/v1";

interface ProgressState {
  walkthroughMaxStep: number;
  walkthroughCompleted: boolean;
  explainersRead: string[];
  tutorialsCompleted: string[];
  examplesViewed: string[];
}

const EMPTY: ProgressState = {
  walkthroughMaxStep: 0,
  walkthroughCompleted: false,
  explainersRead: [],
  tutorialsCompleted: [],
  examplesViewed: [],
};

function read(): ProgressState {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      walkthroughMaxStep: parsed.walkthroughMaxStep ?? 0,
      walkthroughCompleted: parsed.walkthroughCompleted ?? false,
      explainersRead: parsed.explainersRead ?? [],
      tutorialsCompleted: parsed.tutorialsCompleted ?? [],
      examplesViewed: parsed.examplesViewed ?? [],
    };
  } catch {
    return { ...EMPTY };
  }
}

function write(state: ProgressState): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore quota or privacy-mode errors */
  }
}

export function getProgress(): ProgressState {
  return read();
}

export function markWalkthroughStep(n: number, total: number): void {
  const state = read();
  if (n > state.walkthroughMaxStep) state.walkthroughMaxStep = n;
  if (n >= total) state.walkthroughCompleted = true;
  write(state);
}

export function resetWalkthrough(): void {
  const state = read();
  state.walkthroughMaxStep = 0;
  state.walkthroughCompleted = false;
  write(state);
}

export function markExplainerRead(slug: string): void {
  const state = read();
  if (!state.explainersRead.includes(slug)) {
    state.explainersRead.push(slug);
    write(state);
  }
}

export function markTutorialCompleted(slug: string): void {
  const state = read();
  if (!state.tutorialsCompleted.includes(slug)) {
    state.tutorialsCompleted.push(slug);
    write(state);
  }
}

export function markExampleViewed(slug: string): void {
  const state = read();
  if (!state.examplesViewed.includes(slug)) {
    state.examplesViewed.push(slug);
    write(state);
  }
}

export function resetAll(): void {
  write({ ...EMPTY });
}
