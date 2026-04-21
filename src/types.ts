export type FormType = "CMS-1500" | "UB-04";

export interface ClaimLine {
  lineNo: number;
  code: string;
  description: string;
  modifiers?: string[];
  units?: number;
  dos: string;
  pos?: string;
  charge?: string;
}

export interface Claim {
  id: string;
  formType: FormType;
  patient: {
    id: string;
    age?: number;
    sex?: "M" | "F";
  };
  provider: {
    id: string;
    name: string;
    specialty?: string;
  };
  dx: string[];
  lines: ClaimLine[];
  note?: string;
}

export interface EditHit {
  ruleName: string;
  category: EditCategory;
  carc: string;
  rarc?: string;
  message: string;
  involvedCodes: string[];
}

export type EditCategory =
  | "NCCI PTP"
  | "MUE"
  | "Global Surgery"
  | "Modifiers"
  | "Duplicate"
  | "Frequency"
  | "Age / Gender / POS"
  | "Medical Necessity"
  | "Unbundling";

export interface Source {
  label: string;
  url?: string;
}

export interface WalkthroughStep {
  n: number;
  title: string;
  subtitle?: string;
  render: () => string;
}

export interface Explainer {
  slug: string;
  title: string;
  category: EditCategory;
  oneLiner: string;
  definition: string;
  conceptNote?: string;
  whenItFires: string[];
  keyReferences: string[];
  edgeCases: string[];
  miniExample: {
    summary: string;
    claim?: Claim;
    edit?: EditHit;
    resolution: string;
  };
  sources: Source[];
}

export interface QuizOption {
  id: string;
  text: string;
  correct: boolean;
  rationale: string;
}

export interface TutorialStep {
  title: string;
  body: string;
  claim?: Claim;
  quiz?: {
    prompt: string;
    options: QuizOption[];
    wrapUp?: string;
  };
}

export interface Tutorial {
  slug: string;
  title: string;
  category: EditCategory;
  lede: string;
  steps: TutorialStep[];
  sources: Source[];
}

export interface Example {
  slug: string;
  title: string;
  category: EditCategory;
  lede: string;
  claim: Claim;
  edit: EditHit;
  resolutionTitle: string;
  resolution: string;
  sources: Source[];
}

export interface GlossaryEntry {
  term: string;
  full?: string;
  definition: string;
  seeAlso?: string[];
}
