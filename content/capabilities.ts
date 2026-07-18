/**
 * ------------------------------------------------------------------
 * CAPABILITIES & CURRENT FOCUS
 * ------------------------------------------------------------------
 * Skills are grouped by WHAT Ishika can do, not as a wall of icons.
 * Only keep skills verified by real work.
 * ------------------------------------------------------------------
 */

export interface CapabilityGroup {
  title: string
  blurb: string
  skills: string[]
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    title: 'Applied Machine Learning',
    blurb: 'Building and evaluating models on real, messy data.',
    skills: [
      'Supervised learning',
      'Feature engineering',
      'Model evaluation',
      'Error analysis',
      'Computer vision',
      'Behavioral modeling',
      'Experiment design',
    ],
  },
  {
    title: 'AI Systems & Evaluation',
    blurb: 'Making AI behavior inspectable, explainable, and trustworthy.',
    skills: [
      'LLM tracing',
      'AI evaluation',
      'Prompt & output analysis',
      'FastAPI integration',
      'Structured knowledge systems',
      'Human-in-the-loop validation',
    ],
  },
  {
    title: 'Data & Analytics',
    blurb: 'Turning data into decisions and clear recommendations.',
    skills: [
      'Python',
      'SQL',
      'Pandas',
      'Data visualization',
      'Tableau',
      'Power BI',
      'Excel',
      'Cohort & user analysis',
    ],
  },
  {
    title: 'Scientific & Healthcare Data',
    blurb: 'Working fluently with specialized, high-stakes data.',
    skills: [
      'Behavioral & pose data',
      'Biomedical imaging embeddings',
      'Wearable time-series data',
      'Healthcare interoperability formats',
      'Biological & clinical domain interpretation',
    ],
  },
]

export const currentFocus = {
  heading: 'The questions that connect my work',
  questions: [
    'How can AI systems be evaluated beyond whether they produce an answer?',
    'How can complex data be translated into reliable, useful decisions?',
    'How can domain knowledge improve AI products without limiting their broader usability?',
  ],
}
