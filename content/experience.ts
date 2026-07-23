export interface ExperienceRole {
  id: string
  organization: string
  title: string
  timeline: string
  location: string
  context: string
  bullets: string[]
  skills: string[]
  caseStudySlug?: string
}

export const experienceRoles: ExperienceRole[] = [
  {
    id: 'luveo',
    organization: 'Luveo Health',
    title: 'Machine Learning Intern',
    timeline: 'June 2026 – Present',
    location: 'San Diego, CA',
    context:
      'Extending an AI compliance copilot that turns structured healthcare-compliance results into clear, actionable explanations.',
    bullets: [
      'Mapped and extended compounding support across domain models, field semantics, API contracts, and tests.',
      'Connected a React clinical sandbox to an authenticated FastAPI backend across HL7 v2.5 / FHIR R4 scenarios.',
      'Instrumented the LLM explanation layer with Langfuse for end-to-end tracing of prompts, tools, and failures.',
    ],
    skills: ['FastAPI', 'React', 'Langfuse', 'HL7 / FHIR', 'AI Evaluation'],
    caseStudySlug: 'luveo-compliance-copilot',
  },
  {
    id: 'sternson',
    organization: 'UC San Diego Neurobiology Lab (Sternson Lab)',
    title: 'Data Engineer Research Assistant',
    timeline: 'June 2025 – Present',
    location: 'San Diego, CA',
    context:
      'Human-in-the-loop computer-vision pipeline to quantify social observational learning in mice.',
    bullets: [
      'Trained SLEAP multi-animal pose models on 8,200 annotated frames across three labeling batches.',
      'Engineered trajectory features, aligned them with ELAN annotations, and trained XGBoost (0.85 mean ROC-AUC, 5-fold CV).',
      'Built raster visualizations and a PyQt review GUI; contributed analyses presented at SfN 2025.',
    ],
    skills: ['SLEAP', 'XGBoost', 'Python', 'ELAN', 'PyQt', 'Computer Vision'],
    caseStudySlug: 'sternson-behavioral-ml',
  },
  {
    id: 'owkin',
    organization: 'Owkin Hackathon (K-Scope)',
    title: 'Hackathon Teammate — Biomedical Model Evaluation',
    timeline: 'July 2026',
    location: 'San Francisco, CA',
    context:
      '1st-place team building a certify(prediction) workflow for pathology foundation-model evidence cards.',
    bullets: [
      'Built the evidence-card dashboard UI for demoing probe / necessity / specificity results without a live GPU.',
      'Collaborated on framing evaluation beyond accuracy with matched-random controls and structured caveats.',
    ],
    skills: ['Phikon-v2', 'Embeddings', 'Probes', 'Evidence cards', 'MCP'],
    caseStudySlug: 'owkin-foundation-model-evaluation',
  },
  {
    id: 'skillsoft',
    organization: 'Skillsoft Corporation',
    title: 'Product & Content Strategy Intern',
    timeline: 'July 2024 – September 2024',
    location: 'Remote',
    context:
      'Analyzed CAISY beta conversation and learner-engagement data to inform prompting and audience targeting.',
    bullets: [
      'Turned conversation logs into product recommendations for prompts and targeting.',
      'Built Tableau / Power BI views that made cohort patterns usable for the product team.',
    ],
    skills: ['Tableau', 'Power BI', 'Excel', 'Conversation Analytics'],
    caseStudySlug: 'skillsoft-product-analytics',
  },
  {
    id: 'momentum',
    organization: 'Independent · UC San Diego × Y Combinator Hackathon',
    title: 'Builder — MOMentum Personal AI Prototype',
    timeline: '2025 – Present',
    location: 'San Diego, CA',
    context:
      'Context-aware personal AI prototype with interactive frontend and FastAPI + RAG + Claude backend.',
    bullets: [
      'Shipped a mobile-first interactive UI with chat, world widget, and proactive nudge surfaces.',
      'Implemented /chat (sentence-transformers + FAISS + Claude) and /nudge endpoints locally.',
    ],
    skills: ['FastAPI', 'Claude API', 'FAISS', 'sentence-transformers', 'JavaScript'],
    caseStudySlug: 'momentum',
  },
]

export const leadership = [
  {
    title: 'Technical communication',
    detail:
      'Presented lab analyses at the 2025 Society for Neuroscience Annual Meeting and demoed hackathon evaluation workflows to judges.',
  },
  {
    title: 'Cross-functional collaboration',
    detail:
      'Worked with neuroscientists, hackathon teammates across modeling/infra/UI, and product stakeholders translating data into decisions.',
  },
]
