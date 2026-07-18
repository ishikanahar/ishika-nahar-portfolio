/**
 * ------------------------------------------------------------------
 * PROJECTS / CASE STUDIES  —  Ishika, this is the most important file.
 * ------------------------------------------------------------------
 * Each object here becomes a project card on the home/work pages AND a
 * full case-study page at /work/<slug>.
 *
 * - Text wrapped in "[Ishika: ...]" is a placeholder to replace/verify.
 * - Keep results HONEST: only list verified outcomes.
 * - To hide a section on a case study, delete the field or leave it
 *   as an empty array/string.
 * ------------------------------------------------------------------
 */

export type ProjectCategory =
  | 'Applied AI'
  | 'Machine Learning'
  | 'Data Science'
  | 'Healthcare'
  | 'Research'
  | 'Computer Vision'

export type ProjectContext = 'Internship' | 'Research' | 'Hackathon' | 'Analytics'

export interface PipelineStep {
  label: string
  detail: string
}

export interface CaseStudyLink {
  label: string
  href: string
}

export interface Project {
  slug: string
  title: string
  /** One-line problem statement for cards. */
  summary: string
  /** Short label: organization or event. */
  organization: string
  context: ProjectContext
  timeline: string
  location?: string
  categories: ProjectCategory[]
  /** 2-3 core technologies to surface on the card. */
  coreTech: string[]
  /** One verified result/contribution for the card. */
  headlineResult: string
  /** Show on the home "featured" strip? */
  featured: boolean
  /** Accent color key for the card visual (chart-1..chart-5). */
  accent: 1 | 2 | 3 | 4 | 5

  // ---- Full case study fields ----
  role: string
  collaborators?: string
  links?: CaseStudyLink[]
  problem: string
  whyItMatters: string
  data: string[]
  approach: string
  pipeline: PipelineStep[]
  contribution: string[]
  technicalDetails: string[]
  challenges: string[]
  results: string[]
  limitations: string[]
  learned: string
  nextSteps?: string
}

export const projects: Project[] = [
  // ================================================================
  // 1. LUVEO HEALTH COMPLIANCE COPILOT
  // ================================================================
  {
    slug: 'luveo-health-compliance-copilot',
    title: 'Luveo Health Compliance Copilot',
    summary:
      'Extending and evaluating an AI copilot that reasons over healthcare compliance scenarios end to end.',
    organization: 'Luveo Health',
    context: 'Internship',
    timeline: '[Ishika: e.g. Summer 2025]',
    location: '[Ishika: Remote / City]',
    categories: ['Applied AI', 'Healthcare'],
    coreTech: ['FastAPI', 'React', 'Langfuse'],
    headlineResult:
      'Extended compounding support across the full stack and traced AI behavior end to end with Langfuse.',
    featured: true,
    accent: 1,

    role: 'Applied AI / software intern — extended the copilot backend and clinical sandbox, mapped compliance scenarios, and evaluated AI behavior with tracing.',
    links: [
      // { label: 'Demo', href: '[Ishika: link]' },
      // { label: 'Docs', href: '[Ishika: link]' },
    ],
    problem:
      'Healthcare organizations must check clinical actions against a web of interoperability standards and compliance rules. Luveo builds an AI copilot that reasons over these scenarios, but its rule execution, explanations, and clinical sandbox needed to be extended and validated so that outputs were both correct and explainable.',
    whyItMatters:
      'When AI is used near clinical and compliance decisions, an answer is not enough — teams need to see why the system reached a conclusion. Reliable tracing and complete knowledge artifacts are what separate a demo from something a compliance team could eventually trust.',
    data: [
      'Eight compliance scenarios mapped across HL7 v2.5, FHIR R4, and Pyxis / Omnicell-style dispensing payloads.',
      'Synthetic data only — a Phase 1 environment intended for architecture and workflow validation.',
      'Structured AI knowledge artifacts connecting domain rules to model-consumable formats.',
    ],
    approach:
      'I worked from an existing copilot architecture: tracing results from rule execution through a FastAPI case view and explanation layer, connecting a React clinical sandbox to an authenticated FastAPI backend, and extending the domain model so a new class of scenario (compounding) flowed correctly from payload to explanation.',
    pipeline: [
      { label: 'Payload', detail: 'HL7 v2.5 / FHIR R4 / dispensing data enters the system' },
      { label: 'Rule execution', detail: 'Compliance rules evaluate the scenario' },
      { label: 'FastAPI case view', detail: 'Structured result + explanation layer' },
      { label: 'React sandbox', detail: 'Authenticated clinician-facing view' },
      { label: 'Langfuse trace', detail: 'AI behavior inspected and evaluated' },
    ],
    contribution: [
      'Extended compounding support across field semantics, domain models, loader tests, and the OpenAPI contract.',
      'Connected the React clinical sandbox to an authenticated FastAPI backend.',
      'Mapped eight compliance scenarios across HL7 v2.5, FHIR R4, and Pyxis / Omnicell-style payloads.',
      'Used Langfuse tracing to inspect and evaluate the copilot’s reasoning, identifying missing knowledge artifacts that blocked complete explanations.',
      'Resolved type and schema failures surfaced while extending the domain model.',
    ],
    technicalDetails: [
      'Backend: FastAPI with a typed domain model and an OpenAPI contract kept in sync with new fields.',
      'Frontend: React clinical sandbox wired to authenticated backend endpoints.',
      'Observability: Langfuse tracing to inspect prompts, outputs, and rule-execution paths.',
      'Interoperability: HL7 v2.5, FHIR R4, and dispensing-system payload semantics.',
      'Testing: loader tests to validate that new field semantics parsed and flowed correctly.',
    ],
    challenges: [
      'Adding compounding support was not a single change — it touched field semantics, domain models, loader tests, and the API contract at once, so I had to trace type and schema failures through each layer before the scenario worked end to end.',
      'Tracing revealed that some explanations were incomplete not because of model behavior but because knowledge artifacts were missing; diagnosing that required connecting domain research to the structured knowledge the system consumes.',
    ],
    results: [
      'Compounding scenarios flow correctly from payload through rule execution to explanation.',
      'End-to-end AI behavior is now inspectable through Langfuse traces.',
      'Identified and documented missing knowledge artifacts blocking complete explanations.',
      '[Ishika: add any additional verified outcome or metric]',
    ],
    limitations:
      'The Phase 1 environment uses synthetic data and is intended for architecture and workflow validation. This work does not represent deployment in a clinical environment, use with real patient data, validated regulatory advice, or full production readiness, and I did not own the entire product.',
    learned:
      'I learned how much of applied AI work is systems reasoning — following a result across payloads, rules, APIs, and UI — and that evaluating whether a system can explain itself matters as much as whether it produces an answer.',
    nextSteps:
      'Natural extensions include broadening scenario coverage, filling identified knowledge-artifact gaps, and building richer evaluation on top of the tracing layer. [Ishika: confirm/adjust.]',
  },

  // ================================================================
  // 2. STERNSON LAB — BEHAVIORAL MACHINE LEARNING
  // ================================================================
  {
    slug: 'sternson-lab-behavioral-ml',
    title: 'Computational Behavioral ML at the Sternson Lab',
    summary:
      'Turning noisy multi-animal pose-estimation data into a validated behavior classifier.',
    organization: 'Sternson Lab, UC San Diego',
    context: 'Research',
    timeline: '[Ishika: e.g. 2024–2025]',
    location: 'La Jolla, CA',
    categories: ['Machine Learning', 'Computer Vision', 'Research'],
    coreTech: ['SLEAP', 'XGBoost', 'Python'],
    headlineResult:
      'Trained a behavior classifier reaching 0.85 mean ROC-AUC with five-fold cross-validation.',
    featured: true,
    accent: 3,

    role: 'Research contributor — trained pose-estimation models, engineered behavioral features, built and evaluated the classifier, and created human-in-the-loop review tooling.',
    links: [],
    problem:
      'Understanding social behavior in interacting mice requires tracking their movement precisely and then labeling what they are doing — but raw video produces noisy tracking with occlusions and identity switches, and manual behavioral labeling does not scale.',
    whyItMatters:
      'Reliable, automated behavioral analysis lets neuroscientists study social behavior at a scale and consistency that manual scoring cannot match, while keeping a human in the loop for validation.',
    data: [
      '8,200 manually annotated frames across three labeling batches.',
      'Four anatomical keypoints tracked across two interacting mice.',
      'ELAN ground-truth behavioral annotations used to align model-derived features.',
      '[Ishika: confirm any dataset detail before publishing; do not expose restricted lab data.]',
    ],
    approach:
      'I trained SLEAP multi-animal pose-estimation models on annotated frames, engineered movement, distance, orientation, and temporal features from the tracked keypoints, aligned those features with ELAN ground-truth annotations, and trained an XGBoost classifier to recognize behaviors — then validated results with a human review interface.',
    pipeline: [
      { label: 'Video frames', detail: '8,200 annotated frames, 2 mice' },
      { label: 'SLEAP pose model', detail: '4 keypoints per animal, identity maintained' },
      { label: 'Feature engineering', detail: 'Movement, distance, orientation, temporal' },
      { label: 'XGBoost classifier', detail: 'Aligned to ELAN ground truth' },
      { label: 'Human review', detail: 'PyQt interface validates predictions' },
    ],
    contribution: [
      'Trained SLEAP multi-animal pose-estimation models and maintained animal identities across frames.',
      'Investigated occlusion, identity switches, and low-confidence predictions.',
      'Engineered movement, distance, orientation, and temporal features from tracked keypoints.',
      'Aligned model-derived features with ELAN ground-truth annotations.',
      'Trained an XGBoost behavior classifier reaching 0.85 mean ROC-AUC with five-fold cross-validation.',
      'Explored Hidden Markov Models for continuous behavioral-state modeling.',
      'Created Python raster plots for error analysis and built a PyQt interface for human validation.',
    ],
    technicalDetails: [
      'Pose estimation: SLEAP multi-animal models with identity tracking.',
      'Feature engineering: kinematic (movement, distance, orientation) and temporal features.',
      'Model: XGBoost classifier evaluated with five-fold cross-validation (0.85 mean ROC-AUC).',
      'Exploration: Hidden Markov Models for continuous behavioral-state modeling.',
      'Tooling: Python raster plots for error analysis; PyQt review interface for human-in-the-loop validation.',
    ],
    challenges: [
      'Occlusions and identity switches produced low-confidence predictions; I analyzed where and why they occurred (using raster plots) instead of treating tracking output as ground truth.',
      'Model-derived features had to be carefully aligned with ELAN annotations so the classifier learned from correctly timed labels.',
    ],
    results: [
      'XGBoost classifier reached 0.85 mean ROC-AUC with five-fold cross-validation.',
      'Built a reusable feature pipeline and a human-in-the-loop PyQt review interface.',
      '[Ishika: add SfN 2025 poster/presentation once final materials confirm it.]',
    ],
    limitations:
      'This is experimental research on a specific dataset. Tracking quality is affected by occlusion and identity switches, and results reflect the annotated data and scope of the study rather than a general-purpose behavior model.',
    learned:
      'I learned to treat model outputs skeptically — analyzing errors, aligning noisy signals with ground truth, and keeping a human in the loop rather than trusting a single accuracy number.',
    nextSteps:
      'Continued directions include richer behavioral-state modeling (e.g. HMMs) and expanding validated behavior classes. [Ishika: confirm/adjust.]',
  },

  // ================================================================
  // 3. OWKIN HACKATHON — BIOMEDICAL FOUNDATION MODELS
  // ================================================================
  {
    slug: 'owkin-biomedical-foundation-models',
    title: 'Biomedical Foundation Model Evaluation — Owkin Hackathon',
    summary:
      'Testing whether pathology foundation-model predictions rely on meaningful tissue representations.',
    organization: 'Owkin Hackathon',
    context: 'Hackathon',
    timeline: '[Ishika: e.g. 2025]',
    location: '[Ishika: City / Remote]',
    categories: ['Applied AI', 'Research', 'Healthcare'],
    coreTech: ['Phikon-v2', 'H0-mini', 'Python'],
    headlineResult:
      'Designed causal probes and shipped a certify(prediction) evidence-card workflow with the team.',
    featured: true,
    accent: 2,

    role: '[Ishika: your exact role, e.g. "Evaluation & interface" — name teammates below.]',
    collaborators: '[Ishika: name collaborators, e.g. "with [names]"]',
    links: [],
    problem:
      'Biomedical foundation models produce strong predictions, but it is not obvious whether those predictions depend on meaningful tissue representations or on spurious signal. Our team asked how to evaluate that question rather than trusting the score.',
    whyItMatters:
      'In biomedical settings, a prediction that is right for the wrong reason is dangerous. Evaluating whether a model relies on meaningful representations is central to trusting AI in high-stakes domains.',
    data: [
      'Embeddings from biomedical pathology foundation models such as Phikon-v2 and H0-mini.',
      'Representations explored at multiple model depths.',
    ],
    approach:
      'We designed a battery of evaluations — causal probes, ablations, specificity tests, and matched-random comparisons — to test whether predictions depended on meaningful representations, then packaged the evidence into a structured card through a certify(prediction) workflow.',
    pipeline: [
      { label: 'Model embeddings', detail: 'Phikon-v2 / H0-mini at multiple depths' },
      { label: 'Causal probes', detail: 'Ablations, specificity, matched-random tests' },
      { label: 'Evidence synthesis', detail: 'Results aggregated per prediction' },
      { label: 'certify(prediction)', detail: 'Structured evidence card produced' },
    ],
    contribution: [
      'Contributed to designing causal probes, ablations, specificity tests, and matched-random comparisons.',
      'Helped produce a structured evidence card through a certify(prediction) workflow.',
      'Built or contributed to the demonstration interface.',
      'Communicated limitations in model-internal causal interpretation.',
      '[Ishika: sharpen these to what YOU specifically did vs. the team.]',
    ],
    technicalDetails: [
      'Foundation models: Phikon-v2 and H0-mini pathology embeddings.',
      'Evaluation design: causal probes, ablations, specificity tests, matched-random baselines.',
      'Representation analysis across multiple model depths.',
      'Output: a certify(prediction) workflow producing a structured evidence card.',
    ],
    challenges: [
      'Distinguishing meaningful representation from coincidental signal required careful experiment design — a single probe is not convincing, so we combined multiple complementary tests.',
      'Communicating that model-internal probes do not prove real-world biological causality, without undercutting the value of the evaluation.',
    ],
    results: [
      'Delivered a working certify(prediction) evidence-card workflow within the hackathon.',
      'Produced a structured, communicable evaluation of representation reliance.',
      '[Ishika: add placement / recognition / demo link if applicable.]',
    ],
    limitations:
      'This was a time-boxed, team-based hackathon project. Model-internal interventions do not constitute proof of real-world biological causality — they probe what the model relies on, not what is biologically true.',
    learned:
      'I learned how to design evaluation as a first-class deliverable and to communicate carefully scoped claims about what a model does and does not tell us.',
    nextSteps:
      'The evaluation battery could be extended to more models and formalized into a reusable evidence framework. [Ishika: confirm/adjust.]',
  },

  // ================================================================
  // 4. SKILLSOFT — CONVERSATION & PRODUCT ANALYTICS
  // ================================================================
  {
    slug: 'skillsoft-analytics',
    title: 'Skillsoft Conversation & Product Analytics',
    summary:
      'Turning beta conversation logs and learner data into prompt and product recommendations.',
    organization: 'Skillsoft Corporation',
    context: 'Internship',
    timeline: '[Ishika: e.g. Summer 2024]',
    location: '[Ishika: Remote / City]',
    categories: ['Data Science'],
    coreTech: ['Tableau', 'Power BI', 'Excel'],
    headlineResult:
      'Translated CAISY beta conversation analysis into prompt and audience-targeting recommendations.',
    featured: false,
    accent: 4,

    role: 'Data / analytics intern — analyzed conversation logs and learner cohorts and turned findings into product recommendations.',
    links: [],
    problem:
      'Skillsoft’s CAISY beta produced conversation logs and learner-engagement data, but the team needed to understand how learners actually used the product and what that implied for prompts and targeting.',
    whyItMatters:
      'Product decisions improve when they are grounded in real user behavior. Translating messy logs into clear recommendations is where data analysis creates product value.',
    data: [
      'CAISY beta conversation logs.',
      'Learner cohort and engagement data.',
      'Percipio metadata and technical learning paths curated in Excel.',
    ],
    approach:
      'I analyzed conversation logs and learner cohorts, identified recurring queries and behavioral differences, and translated the findings into concrete prompt and audience-targeting recommendations — using Tableau and Power BI for analysis and visualization.',
    pipeline: [
      { label: 'Conversation logs', detail: 'CAISY beta data + learner cohorts' },
      { label: 'Analysis', detail: 'Recurring queries, engagement patterns' },
      { label: 'Visualization', detail: 'Tableau / Power BI dashboards' },
      { label: 'Recommendations', detail: 'Prompt + audience-targeting guidance' },
    ],
    contribution: [
      'Analyzed CAISY beta conversation logs and studied learner cohorts and engagement patterns.',
      'Identified recurring queries and differences in user behavior.',
      'Translated findings into prompt and audience-targeting recommendations.',
      'Curated Percipio metadata and technical learning paths in Excel.',
      'Created a Systems Engineering benchmark planbook for Instructional Design.',
    ],
    technicalDetails: [
      'Analysis & visualization: Tableau, Power BI, Excel.',
      'Cohort and user-behavior analysis on conversation logs.',
      'Metadata curation for Percipio technical learning paths.',
    ],
    challenges: [
      'Conversation logs are unstructured; finding recurring, actionable patterns required judgment about what mattered to the product, not just what was frequent.',
      '[Ishika: add a specific decision you made here if you have one.]',
    ],
    results: [
      'Delivered prompt and audience-targeting recommendations grounded in beta usage.',
      'Produced a Systems Engineering benchmark planbook for Instructional Design.',
      '[Ishika: add any adoption / impact detail if shareable.]',
    ],
    limitations:
      'Findings reflect the CAISY beta period and available data. Recommendations were analytical inputs to product decisions rather than measured production outcomes.',
    learned:
      'I learned to work outside academic research — connecting data analysis to product thinking and communicating recommendations an audience could act on.',
  },

  // ================================================================
  // 5. ALL OF US — WEARABLE DATA RESEARCH  (currently exploring)
  // ================================================================
  {
    slug: 'all-of-us-wearable-research',
    title: 'All of Us Wearable Data Research',
    summary:
      'Designing a reproducible cohort-analysis plan to identify night-shift workers from wearable data.',
    organization: 'All of Us Research Program',
    context: 'Research',
    timeline: '[Ishika: e.g. In progress, 2025]',
    location: '[Ishika: Remote]',
    categories: ['Data Science', 'Healthcare', 'Research'],
    coreTech: ['Python', 'Fitbit data', 'Cohort analysis'],
    headlineResult:
      'Developed a reproducible cohort-analysis plan for identifying night-shift workers. (In progress.)',
    featured: false,
    accent: 5,

    role: 'Research contributor — designing cohort criteria and a reproducible analysis plan over wearable time-series data.',
    links: [],
    problem:
      'Identifying likely night-shift workers from wearable data is ambiguous: it requires defining wear-time, qualifying nights, and activity thresholds carefully before any health question can be asked.',
    whyItMatters:
      'Shift work is linked to health outcomes, so reliably identifying shift workers from passive wearable data could support large-scale health research — but only if the cohort definition is sound.',
    data: [
      'Intraday Fitbit steps, heart-rate, activity, sleep, and device tables.',
      'Activity between midnight and 6 a.m. used as a night-shift signal.',
    ],
    approach:
      'I am defining participant wear-time and qualifying-night criteria, then developing a reproducible cohort-analysis plan that handles ambiguity in thresholds and data definitions before drawing any conclusions.',
    pipeline: [
      { label: 'Wearable tables', detail: 'Steps, HR, activity, sleep, device' },
      { label: 'Wear-time rules', detail: 'Define valid days & qualifying nights' },
      { label: 'Night-shift signal', detail: 'Activity between 12 a.m.–6 a.m.' },
      { label: 'Cohort plan', detail: 'Reproducible, threshold-documented' },
    ],
    contribution: [
      'Identifying night-shift workers using wearable activity between midnight and 6 a.m.',
      'Defining participant wear-time and qualifying-night criteria.',
      'Developing a reproducible cohort-analysis plan.',
      'Handling ambiguity in thresholds and data definitions.',
    ],
    technicalDetails: [
      'Data: intraday Fitbit steps, heart-rate, activity, sleep, and device tables.',
      'Method: rule-based cohort definition with documented, reproducible thresholds.',
      'Focus: wear-time validity and qualifying-night criteria.',
    ],
    challenges: [
      'Thresholds and definitions are genuinely ambiguous; the work is as much about making defensible, documented choices as about computation.',
    ],
    results: [
      'Reproducible cohort-analysis plan under development. Analysis in progress — no health-outcome findings claimed yet.',
    ],
    limitations:
      'This analysis is still in progress. No completed health-outcome findings are claimed. Thresholds and cohort definitions are working choices, not validated standards.',
    learned:
      'I am learning how much rigor precedes results — defining a cohort well is a research contribution in itself.',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const featuredProjects = projects.filter((p) => p.featured)

export const allCategories: ProjectCategory[] = [
  'Applied AI',
  'Machine Learning',
  'Data Science',
  'Healthcare',
  'Research',
  'Computer Vision',
]
