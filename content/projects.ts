/**
 * Project index for cards + routing.
 * Deep case-study copy lives in data/projects/* where expanded.
 */

export type ProjectCategory =
  | 'Applied AI'
  | 'Machine Learning'
  | 'Data Science'
  | 'Healthcare'
  | 'Research'
  | 'Computer Vision'
  | 'Product'

export type ProjectContext =
  | 'Internship'
  | 'Research'
  | 'Hackathon'
  | 'Analytics'
  | 'Independent'

export type WorkGroup = 'featured' | 'ideas' | 'projects' | 'additional'

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
  summary: string
  organization: string
  context: ProjectContext
  timeline: string
  location?: string
  categories: ProjectCategory[]
  coreTech: string[]
  headlineResult: string
  /** Featured Applied AI / ML strip */
  featured: boolean
  workGroup: WorkGroup
  accent: 1 | 2 | 3 | 4 | 5
  statusBadge?: string
  ctaLabel?: string

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
  limitations: string
  learned: string
  nextSteps?: string
  figures?: { src: string; alt: string; caption: string }[]
}

export const projects: Project[] = [
  {
    slug: 'luveo-compliance-copilot',
    title: 'Luveo Health Compliance Copilot',
    summary:
      'Extending and evaluating an AI copilot that translates structured healthcare-compliance results into clear, actionable explanations.',
    organization: 'Luveo Health',
    context: 'Internship',
    timeline: 'June 2026 – Present',
    location: 'San Diego, CA',
    categories: ['Applied AI', 'Healthcare'],
    coreTech: ['FastAPI', 'React', 'Langfuse', 'AI Evaluation'],
    headlineResult:
      'Extended compounding support across domain models, field semantics, API contracts, and tests, then traced AI behavior end to end using Langfuse.',
    featured: true,
    workGroup: 'featured',
    accent: 1,
    ctaLabel: 'Explore the Case Study',
    role: 'Machine Learning Intern — extended the copilot backend and clinical sandbox, mapped compliance scenarios, and evaluated AI behavior with tracing.',
    links: [],
    problem:
      'Healthcare organizations must check clinical actions against interoperability standards and compliance rules. Luveo builds an AI copilot that reasons over these scenarios; rule execution, explanations, and the clinical sandbox needed extension and validation so outputs were correct and explainable.',
    whyItMatters:
      'Near clinical and compliance decisions, teams need to see why a system reached a conclusion. Tracing and grounded knowledge separate a demo from something a compliance team could eventually trust.',
    data: [
      'Eight compliance scenarios mapped across HL7 v2.5, FHIR R4, and Pyxis / Omnicell-style dispensing payloads.',
      'Synthetic data only — Phase 1 architecture and workflow validation.',
      'Structured knowledge artifacts connecting domain rules to model-consumable formats.',
    ],
    approach:
      'Traced results from rule execution through a FastAPI case view and explanation layer, connected a React clinical sandbox to an authenticated FastAPI backend, and extended compounding so scenarios flowed from payload to explanation.',
    pipeline: [
      { label: 'Synthetic event', detail: 'HL7 / FHIR / dispensing payload' },
      { label: 'Rules engine', detail: 'Deterministic Pass / Warning / Fail' },
      { label: 'FastAPI case view', detail: 'Structured result + evidence' },
      { label: 'Explainer agent', detail: 'Grounded natural-language guidance' },
      { label: 'Langfuse', detail: 'Trace prompts, tools, failures' },
    ],
    contribution: [
      'Mapped and extended architecture normalizing Epic, Pyxis, and Omnicell-style events against pharmacy rules.',
      'Built end-to-end demo integration connecting React, FastAPI, HL7 v2.5, and FHIR R4 across eight medication scenarios.',
      'Instrumented the LLM explanation layer with Langfuse tracing.',
      'Strengthened grounding with structured workflow and regulatory schemas.',
    ],
    technicalDetails: [
      'Backend: FastAPI with typed domain models and OpenAPI contracts.',
      'Frontend: React clinical sandbox on authenticated endpoints.',
      'Observability: Langfuse for prompts, tool calls, latency, failure modes.',
      'Interoperability: HL7 v2.5, FHIR R4, dispensing-system payload semantics.',
    ],
    challenges: [
      'Compounding support touched field semantics, domain models, loader tests, and the API contract together.',
      'Incomplete explanations often came from missing knowledge artifacts, not only model behavior.',
    ],
    results: [
      'Eight synthetic scenarios return structured Pass, Warning, or Fail evaluations.',
      'End-to-end AI behavior inspectable through Langfuse traces.',
    ],
    limitations:
      'Phase 1 uses synthetic data for architecture validation. Not a deployed clinical product and not validated regulatory guidance.',
    learned:
      'Applied AI work is systems reasoning — following a result across payloads, rules, APIs, and UI — and evaluating whether a system can explain itself.',
  },

  {
    slug: 'sternson-behavioral-ml',
    title: 'Behavioral Machine Learning for Social Observation',
    summary:
      'Built a human-in-the-loop workflow for tracking two interacting mice, extracting behavioral features, and evaluating observation-behavior predictions against corrected annotations.',
    organization: 'Sternson Lab, UC San Diego',
    context: 'Research',
    timeline: 'June 2025 – Present',
    location: 'San Diego, CA',
    categories: ['Machine Learning', 'Computer Vision', 'Research'],
    coreTech: ['Computer Vision', 'SLEAP', 'XGBoost', 'Behavioral Data'],
    headlineResult:
      '8,200 annotated frames and 0.85 mean ROC-AUC with five-fold cross-validation',
    featured: true,
    workGroup: 'featured',
    accent: 3,
    ctaLabel: 'Explore the Case Study',
    role: 'Data Engineer Research Assistant — labeling, pose-model iteration, feature engineering, classification, and human-in-the-loop review tooling.',
    links: [],
    problem:
      'Manually reviewing long behavioral recordings does not scale. The lab needed structured data from two interacting mice to study social observation and learning.',
    whyItMatters:
      'Automated tracking plus human validation lets researchers quantify social learning at a scale manual scoring alone cannot match.',
    data: [
      '8,200 manually annotated frames across three labeling batches.',
      'Four anatomical keypoints across two interacting mice (DEM and OBS).',
      'Corrected behavioral annotations aligned to engineered features.',
    ],
    approach:
      'Human-in-the-loop SLEAP pose estimation → feature engineering → XGBoost behavior classification → raster and GUI error analysis.',
    pipeline: [
      { label: 'Label keypoints', detail: 'Nose, ears, tail base' },
      { label: 'Train pose models', detail: 'Top-down multi-animal SLEAP' },
      { label: 'Review failures', detail: 'Occlusion, overlap, identity' },
      { label: 'Extract features', detail: 'Movement, distance, orientation' },
      { label: 'Classify behavior', detail: 'XGBoost + 5-fold CV' },
    ],
    contribution: [
      'Annotated 8,200 frames; corrected difficult failure cases.',
      'Engineered behavioral features and trained XGBoost (0.85 mean ROC-AUC).',
      'Built error-analysis visualizations and PyQt review workflows.',
      'Contributed analyses presented at SfN 2025.',
    ],
    technicalDetails: [
      'SLEAP multi-animal top-down pose estimation.',
      'XGBoost on engineered trajectory features.',
      'Five-fold cross-validation; HMM exploration for temporal structure.',
    ],
    challenges: [
      'Occlusion and identity switches corrupt downstream features.',
      'Aggregate ROC-AUC hides fragmented bouts — raster review was essential.',
    ],
    results: [
      '0.85 mean ROC-AUC with five-fold cross-validation.',
      'Reusable feature pipeline and human-in-the-loop review tools.',
    ],
    limitations:
      'Experimental research on a specific dataset. Public demo uses a short precomputed sample; lab footage pending approval.',
    learned:
      'A strong aggregate metric does not reveal where a system fails — frame-level review and domain context remain essential.',
  },

  {
    slug: 'owkin-foundation-model-evaluation',
    title: 'Biomedical Foundation Model Evaluation at the Owkin Hackathon',
    summary:
      'Testing whether pathology foundation-model predictions depend on meaningful tissue representations rather than spurious signals.',
    organization: 'Owkin Hackathon (K-Scope)',
    context: 'Hackathon',
    timeline: 'July 2026',
    location: 'San Francisco, CA',
    categories: ['Applied AI', 'Research', 'Healthcare'],
    coreTech: ['Phikon-v2', 'H-optimus-0', 'Probes', 'Matched-random controls'],
    headlineResult:
      '1st Place. certify(prediction) evidence cards across pathology foundation-model embeddings.',
    featured: true,
    workGroup: 'featured',
    accent: 2,
    ctaLabel: 'Explore the Case Study',
    role: 'Hackathon teammate: evidence-card dashboard UI and evaluation-workflow framing with Ben Moskowitz, Sophia Zhou, and Eddie Bae.',
    collaborators: 'Ben Moskowitz, Sophia Zhou, Eddie Bae',
    links: [
      { label: 'GitHub (K-Scope)', href: 'https://github.com/ishikanahar/K-scope' },
    ],
    problem:
      'Biomedical foundation models produce strong predictions, but it is unclear whether those predictions depend on meaningful tissue representations or spurious signal.',
    whyItMatters:
      'In biomedical settings, a prediction that is right for the wrong reason is dangerous. Evaluating representation reliance is central to trusting AI in high-stakes domains.',
    data: [
      'Embeddings from pathology foundation models (Phikon-v2, H-optimus-0).',
      '5,400 pathology image tiles across 9 tissue classes (NCT-CRC-HE).',
    ],
    approach:
      'Concept probes, latent-space interventions, and matched-random controls measuring necessity, sufficiency, and specificity — packaged as evidence cards via certify(prediction).',
    pipeline: [
      { label: 'Histology tile', detail: 'H&E region' },
      { label: 'Foundation model', detail: 'Frozen embeddings' },
      { label: 'Probes & interventions', detail: 'Necessity / specificity' },
      { label: 'Matched-random null', detail: 'Control comparisons' },
      { label: 'Evidence card', detail: 'certify(prediction)' },
    ],
    contribution: [
      'Built the local evidence-card dashboard UI so the team could demo certify(prediction) without a live GPU.',
      'Hardened the UI for the zero-claims edge case.',
      'Collaborated on framing certification as a structured evaluation workflow.',
    ],
    technicalDetails: [
      'Frozen vision foundation models; no fine-tuning of the backbone.',
      'Matched-random controls for interventions.',
      'Structured evidence cards rather than accuracy-only reporting.',
    ],
    challenges: [
      'Model-internal causality ≠ biological causality.',
      'Hackathon time constraints limit multi-site confound testing.',
    ],
    results: [
      '1st Place, Owkin Rewiring Biology Hackathon.',
      'Reusable evaluation pipeline and evidence-card workflow.',
    ],
    limitations:
      'Time-boxed team hackathon. Model-internal interventions do not prove real-world biological causality.',
    learned:
      'Evaluation can be a first-class deliverable — and claims about what a model relies on must stay carefully scoped.',
  },

  {
    slug: 'momentum',
    title: 'MOMentum',
    summary:
      'Context-aware personal AI prototype combining RAG with structured user state (tasks, location, focus, device signals) for proactive nudges and chat.',
    organization: 'Independent · UC San Diego × Y Combinator Hackathon',
    context: 'Independent',
    timeline: '2025 – Present',
    categories: ['Applied AI', 'Product'],
    coreTech: ['FastAPI', 'Claude API', 'sentence-transformers', 'FAISS'],
    headlineResult:
      'Interactive frontend live; FastAPI + RAG + Claude MVP implemented locally.',
    featured: false,
    workGroup: 'ideas',
    accent: 4,
    statusBadge: 'Idea',
    ctaLabel: 'Explore the Case Study',
    role: 'Independent builder: product vision, interactive frontend, FastAPI/RAG backend, and Claude integration.',
    links: [
      {
        label: 'Interactive UI',
        href: 'https://ishikanahar.github.io/momentum/frontend/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/ishikanahar/momentum',
      },
    ],
    problem:
      'Students juggle deadlines, location changes, energy, and distractions. Existing tools wait for a prompt instead of combining fragmented context into timely guidance.',
    whyItMatters:
      'Proactive, context-aware assistance can turn fragmented signals into timely decisions — if the system stays honest about what is prototype vs production.',
    data: [
      'Structured user-state fields (tasks, location, battery, focus, sleep, screen time).',
      'Demo knowledge base embedded with sentence-transformers into an in-memory FAISS index.',
    ],
    approach:
      'Mobile-first UI + FastAPI /chat (RAG + Claude) and /nudge endpoints, with simulated context until live integrations exist.',
    pipeline: [
      { label: 'User / device state', detail: 'Structured fields (often simulated)' },
      { label: 'Query or nudge', detail: '/chat · /nudge' },
      { label: 'FAISS retrieval', detail: 'Top-k personal chunks' },
      { label: 'Prompt assembly', detail: 'Role + state + memory' },
      { label: 'Claude', detail: 'Personalized reply / nudge' },
    ],
    contribution: [
      'Designed and built the interactive mobile frontend.',
      'Implemented FastAPI backend with /chat (RAG) and /nudge.',
      'Wired sentence-transformers + FAISS + Claude for grounded responses.',
    ],
    technicalDetails: [
      'Frontend: vanilla HTML/CSS/JS phone UI on GitHub Pages.',
      'Backend: FastAPI, sentence-transformers (all-MiniLM-L6-v2), FAISS, Claude API.',
      'Public Pages demo falls back to offline replies until a hosted backend URL is set.',
    ],
    challenges: [
      'Separating a compelling product experience from unfinished live integrations.',
      'Designing when not to interrupt — not only how to generate text.',
    ],
    results: [
      'Shipped interactive UI prototype.',
      'Local FastAPI + RAG + Claude MVP in repository.',
    ],
    limitations:
      'Not a production personal OS. Live calendar/wearable integrations and systematic evaluation are incomplete.',
    learned:
      'A useful personal AI needs structured state, retrieval, and a policy for silence — not only a chat box.',
    nextSteps:
      'Host the backend, wire one real context source end-to-end, and evaluate retrieval + nudge timing.',
  },

  {
    slug: 'health-text-robustness',
    title: 'Robustness of Health Text Classification',
    summary:
      'Comparing TF-IDF, LSTM, and DistilBERT on symptom-to-diagnosis classification under synonym, typo, and word-deletion perturbations.',
    organization: 'Independent · UC San Diego coursework / research project',
    context: 'Independent',
    timeline: '2025',
    categories: ['Machine Learning', 'Data Science', 'Healthcare'],
    coreTech: ['DistilBERT', 'LSTM', 'TF-IDF', 'Perturbation evaluation'],
    headlineResult:
      'Transformer led on clean Macro F1 (0.86); TF-IDF stayed surprisingly robust under typos until stress intensity rose.',
    featured: false,
    workGroup: 'projects',
    accent: 5,
    ctaLabel: 'View on GitHub',
    role: 'Built the full comparison pipeline: models, perturbation engine, metrics, and stress tests.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/ishikanahar/health-text-robustness',
      },
    ],
    problem:
      'Clinical NLP demos often look strong on clean symptom text. Real users type typos, synonyms, and incomplete phrases — and models can collapse without anyone noticing until deployment.',
    whyItMatters:
      'Health text systems have to stay useful under messy language. Comparing clean accuracy alone hides brittleness that matters for triage-style or decision-support tooling.',
    data: [
      'gretelai/symptom_to_diagnosis — natural-language symptom descriptions mapped to diagnosis labels.',
      'Restricted to the top-10 diagnosis classes so classical, recurrent, and Transformer baselines compete on the same label set.',
      'Held-out evaluation under clean text plus controlled synonym, character-typo, and word-drop perturbations.',
    ],
    approach:
      'Train TF-IDF + logistic regression, a bidirectional LSTM, and fine-tuned DistilBERT on the same splits. Score Accuracy and Macro F1 on clean text, then re-evaluate under synonym swaps, typos, and dropped words. Add a typo-intensity stress curve to see when each model breaks.',
    pipeline: [
      { label: 'Symptom text', detail: 'Natural-language descriptions' },
      { label: 'Perturb', detail: 'Synonym / typo / drop' },
      { label: 'Classify', detail: 'TF-IDF · LSTM · DistilBERT' },
      { label: 'Compare', detail: 'Accuracy · Macro F1 · stress curve' },
    ],
    contribution: [
      'Designed the clean-vs-perturbed protocol so every model sees identical splits and noise settings.',
      'Implemented classical (TF-IDF + LR), recurrent (LSTM), and Transformer (DistilBERT) baselines end to end.',
      'Built a typo intensity sweep that plots degradation as character noise rises — not only a single “typo” flag.',
      'Reported Macro F1 alongside accuracy so majority-class wins cannot hide weak rare diagnoses.',
    ],
    technicalDetails: [
      'Multi-class diagnosis classification on top-10 labels for fair head-to-head comparison.',
      'Perturbations applied at evaluation time: synonym substitution, character-level typos, and random word deletion.',
      'DistilBERT fine-tuned as a sequence classifier; TF-IDF uses sparse bag-of-words features with logistic regression.',
      'Stress curve varies typo rate so robustness is a curve, not a single point estimate.',
    ],
    challenges: [
      'LSTM underperformed with limited labeled data — sequence capacity without enough examples.',
      'Transformers led on clean text but degraded sharply under heavy character noise.',
      'Synonym perturbations can be semantically valid yet still shift lexical features classical models rely on.',
    ],
    results: [
      'Clean: DistilBERT Macro F1 ≈ 0.86; TF-IDF accuracy ≈ 0.97 on the restricted label set.',
      'Typos: TF-IDF accuracy drops from ~0.97 → ~0.79; DistilBERT Macro F1 falls from ~0.86 → ~0.44 under the same noise.',
      'Stress curve: classical lexical features stay surprisingly stable at mild typo rates; Transformer gains erode once character noise intensifies.',
      'Takeaway: the best clean model is not automatically the most reliable under realistic input noise.',
    ],
    limitations:
      'Academic comparison on a public synthetic-style dataset — not a deployed clinical NLP system, and not a claim about real patient outcomes.',
    learned:
      'Robustness evaluation belongs next to accuracy. Clean leaderboards can hide failure modes that show up the moment users type imperfectly.',
    figures: [
      {
        src: '/projects/health-text/performance_comparison.png',
        alt: 'Performance comparison across TF-IDF, LSTM, and DistilBERT',
        caption: 'Clean vs perturbed performance across model families.',
      },
      {
        src: '/projects/health-text/f1_across_perturbations.png',
        alt: 'Macro F1 across synonym, typo, and drop perturbations',
        caption: 'Macro F1 under synonym, typo, and word-drop noise.',
      },
      {
        src: '/projects/health-text/accuracy_across_perturbations.png',
        alt: 'Accuracy across perturbation types',
        caption: 'Accuracy under the same perturbation suite.',
      },
    ],
  },

  {
    slug: 'neural-decoder-steinmetz',
    title: 'Neural Decoder for Behavioral Choice',
    summary:
      'Decoding left vs. right choices from Neuropixels population activity (Steinmetz 2019) with PCA, logistic regression, and permutation testing.',
    organization: 'Independent · Steinmetz / DANDI 000017',
    context: 'Independent',
    timeline: '2025',
    categories: ['Machine Learning', 'Research'],
    coreTech: ['PCA', 'Logistic Regression', 'Permutation testing', 'Neuropixels'],
    headlineResult:
      'ROC-AUC 0.884 ± 0.025 (5-fold CV); permutation p < 0.0001 vs null AUC ≈ 0.50.',
    featured: false,
    workGroup: 'projects',
    accent: 2,
    ctaLabel: 'View on GitHub',
    role: 'End-to-end analysis: firing-rate features, PCA, decoder, null tests, and figures.',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/ishikanahar/neural-decoder-steinmetz',
      },
    ],
    problem:
      'Neuropixels recordings give hundreds of simultaneously recorded neurons — noisy, correlated, and high-dimensional. The question: can left vs right choice still be decoded above chance from a short post-stimulus window, without pretending the decoder is a causal circuit map?',
    whyItMatters:
      'Shows whether behaviorally relevant structure lives in a low-dimensional neural subspace. Cross-validation alone is not enough; a permutation null asks whether the effect beats chance label structure.',
    data: [
      'Steinmetz et al. 2019 — Mouse Richards session from DANDI 000017.',
      '778 neurons × trial firing rates in a 0–300 ms post-stimulus window.',
      '174 left/right choice trials after filtering for analyzable behavioral outcomes.',
    ],
    approach:
      'Build a trial × neuron firing-rate matrix → PCA to compress correlated population activity → L2-regularized logistic regression on the top principal components → 5-fold cross-validated ROC-AUC, plus a 500-shuffle label-permutation null to estimate chance.',
    pipeline: [
      { label: 'Firing rates', detail: '174 trials × 778 neurons' },
      { label: 'PCA', detail: 'Low-dimensional neural modes' },
      { label: 'Decode', detail: 'L2 logistic regression' },
      { label: 'Validate', detail: 'CV + 500× permutation null' },
    ],
    contribution: [
      'Implemented the full decoding pipeline from firing-rate features through figures.',
      'Chose PCA + L2 logistic regression to control overfitting with 778 features and only 174 trials.',
      'Ran a 500-iteration label permutation test so “above chance” is quantified, not assumed.',
      'Swept principal-component count and showed performance saturates around ~11 PCs.',
    ],
    technicalDetails: [
      'Primary metric: ROC-AUC for ranking left vs right trials (reported with fold mean ± std).',
      'Secondary metric: classification accuracy under the same CV splits.',
      'Null distribution mean AUC ≈ 0.505 — confirms the chance baseline sits at ~0.50.',
      'Regularization and dimensionality reduction are required; raw-rate decoding overfits in this regime.',
    ],
    challenges: [
      'p ≫ n features vs trials — without PCA, the classifier memorizes noise.',
      'Population correlations mean many neurons carry overlapping information; the useful subspace is smaller than 778.',
      'Decoding choice is not the same as identifying a specific causal circuit.',
    ],
    results: [
      'ROC-AUC 0.884 ± 0.025; accuracy 0.799 ± 0.039 under 5-fold CV.',
      'Permutation p-value < 0.0001 versus the label-shuffled null (mean null AUC ≈ 0.505).',
      'Decoder performance saturates near ~11 principal components — most usable signal lives in a compact subspace.',
    ],
    limitations:
      'Single subject / session analysis. Decoding behavioral choice is not a claim about a specific causal circuit or generalizes across mice without further sessions.',
    learned:
      'Cross-validation measures stability; permutation testing asks whether the effect beats chance. Both belong in a decoding write-up.',
    figures: [
      {
        src: '/projects/neural-decoder/decoder_results.png',
        alt: 'Neural decoder ROC and permutation-null results',
        caption: 'Decoder ROC-AUC vs chance from the label-permutation null.',
      },
    ],
  },

  {
    slug: 'adwave-aaf',
    title: 'Adwave — AAF District 15 Competition',
    summary:
      'Collaborative advertising campaign work for the American Advertising Federation District 15 competition — strategy, creative planning, and team delivery.',
    organization: 'AAF District 15 · Adwave',
    context: 'Independent',
    timeline: '2024 – 2025',
    categories: ['Product'],
    coreTech: ['Strategy', 'Team collaboration', 'Presentation'],
    headlineResult:
      'Team campaign delivered for AAF District 15; plansbook and competition materials produced.',
    featured: false,
    workGroup: 'additional',
    accent: 1,
    statusBadge: 'Team',
    ctaLabel: 'View plansbook',
    role: 'Team contributor on campaign planning and collaborative delivery.',
    links: [
      {
        label: 'Plansbook (PDF)',
        href: '/projects/adwave/plansbook.pdf',
      },
    ],
    problem:
      'Competition brief required a full campaign strategy and creative plan under tight team deadlines.',
    whyItMatters:
      'Shows cross-functional communication and high-stakes team delivery alongside technical work.',
    data: ['Competition brief and secondary research for the campaign category.'],
    approach:
      'Collaborative strategy → creative direction → plansbook → live presentation with the Adwave team.',
    pipeline: [
      { label: 'Brief', detail: 'AAF District 15' },
      { label: 'Strategy', detail: 'Audience + positioning' },
      { label: 'Creative', detail: 'Campaign system' },
      { label: 'Deliver', detail: 'Plansbook + pitch' },
    ],
    contribution: [
      'Contributed to campaign planning and team materials.',
      'Helped prepare competition deliverables including the plansbook.',
    ],
    technicalDetails: [
      'Team project, not an ML system. Included for leadership and communication breadth.',
    ],
    challenges: [
      'Aligning creative, strategy, and presentation under competition time pressure.',
    ],
    results: [
      'Completed team plansbook and competition presentation materials.',
    ],
    limitations:
      'Advertising competition project. Complementary to the applied AI / ML case studies.',
    learned:
      'Clear storytelling and team coordination transfer directly into technical demos and interviews.',
  },

  {
    slug: 'style-adaptive-extraction',
    title: 'Style-Adaptive Representation Extraction',
    summary:
      'Interactive exploration of how pathology-style features and adaptive extraction choices change what a model can surface from tissue tiles.',
    organization: 'Independent exploration',
    context: 'Independent',
    timeline: '2026',
    categories: ['Applied AI', 'Research', 'Healthcare'],
    coreTech: ['Embeddings', 'Interactive viz', 'Pathology AI'],
    headlineResult:
      'Browser demo for comparing adaptive extraction paths and readout quality.',
    featured: false,
    workGroup: 'ideas',
    accent: 3,
    statusBadge: 'Idea',
    ctaLabel: 'Open interactive demo',
    role: 'Designed an interactive HTML exploration of adaptive extraction ideas.',
    links: [
      {
        label: 'Interactive demo',
        href: '/projects/style-adaptive/index.html',
      },
    ],
    problem:
      'Static embedding pipelines hide how extraction choices affect what becomes visible in tissue representations.',
    whyItMatters:
      'Before committing to a full evaluation stack, it helps to probe how style and extraction settings change the story.',
    data: ['Illustrative pathology-style tile / embedding views for exploration.'],
    approach:
      'Interactive controls and visual comparisons for adaptive extraction concepts, kept clearly exploratory.',
    pipeline: [
      { label: 'Tile / style view', detail: 'Local tissue context' },
      { label: 'Extraction choice', detail: 'Adaptive vs fixed path' },
      { label: 'Readout', detail: 'What becomes decodable' },
      { label: 'Compare', detail: 'Interactive inspection' },
    ],
    contribution: [
      'Built the interactive exploration surface for style-adaptive extraction ideas.',
    ],
    technicalDetails: [
      'Client-side HTML/JS demo. Not a trained production model.',
    ],
    challenges: [
      'Keeping exploratory UI honest about what is simulated vs measured.',
    ],
    results: [
      'Shipped a clickable demo for walking through adaptive extraction concepts.',
    ],
    limitations:
      'Exploratory idea demo, not a completed research study or clinical tool.',
    learned:
      'Good interaction design makes representation choices inspectable before they harden into a pipeline.',
  },

  {
    slug: 'skillsoft-product-analytics',
    title: 'Turning Conversation Data Into Product Recommendations',
    summary:
      'Analyzing CAISY beta interactions and learner cohorts to understand user behavior, recurring queries, and opportunities for better prompting and audience targeting.',
    organization: 'Skillsoft Corporation',
    context: 'Analytics',
    timeline: 'July 2024 – September 2024',
    location: 'Remote',
    categories: ['Data Science'],
    coreTech: ['Tableau', 'Power BI', 'Excel', 'Conversation Analytics'],
    headlineResult:
      'Translated CAISY beta conversation analysis into prompt and audience-targeting recommendations.',
    featured: false,
    workGroup: 'additional',
    accent: 5,
    ctaLabel: 'Explore the Case Study',
    role: 'Product & Content Strategy Intern — conversation analytics and content strategy.',
    links: [],
    problem:
      'CAISY beta produced conversation logs and learner-engagement data; the team needed to understand real usage and implications for prompts and targeting.',
    whyItMatters:
      'Product decisions improve when grounded in real user behavior.',
    data: [
      'CAISY beta conversation logs.',
      'Learner cohort and engagement data.',
      'Percipio metadata and technical learning paths.',
    ],
    approach:
      'Analyzed logs and cohorts in Tableau and Power BI; translated patterns into prompt and audience-targeting recommendations; curated Percipio metadata.',
    pipeline: [
      { label: 'Conversation logs', detail: 'CAISY beta + cohorts' },
      { label: 'Analysis', detail: 'Recurring queries, engagement' },
      { label: 'Visualization', detail: 'Tableau / Power BI' },
      { label: 'Recommendations', detail: 'Prompt + targeting guidance' },
    ],
    contribution: [
      'Analyzed beta conversation logs and learner cohorts.',
      'Visualized engagement patterns and recurring queries.',
      'Translated findings into prompt and audience-targeting recommendations.',
      'Curated Percipio metadata and technical learning paths.',
      'Developed a Systems Engineering benchmark planbook for Instructional Design.',
    ],
    technicalDetails: [
      'Tableau, Power BI, Excel for analysis and metadata curation.',
      'Cohort comparison across role-play scenario responses.',
    ],
    challenges: [
      'Conversation logs are unstructured; judgment is required to find product-relevant patterns.',
    ],
    results: [
      'Delivered prompt and audience-targeting recommendations.',
      'Produced Systems Engineering benchmark planbook for Instructional Design.',
    ],
    limitations:
      'Findings reflect the CAISY beta period. Analytical inputs to product decisions rather than measured production outcomes claimed here.',
    learned:
      'Connecting data analysis to product thinking — recommendations an audience can act on.',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const featuredProjects = projects.filter((p) => p.featured)

export const ideaProjects = projects.filter((p) => p.workGroup === 'ideas')

export const personalProjects = projects.filter((p) => p.workGroup === 'projects')

export const additionalProjects = projects.filter(
  (p) => p.workGroup === 'additional',
)

/** @deprecated use ideaProjects */
export const independentProjects = ideaProjects

export const allCategories: ProjectCategory[] = [
  'Applied AI',
  'Machine Learning',
  'Data Science',
  'Healthcare',
  'Research',
  'Computer Vision',
  'Product',
]
