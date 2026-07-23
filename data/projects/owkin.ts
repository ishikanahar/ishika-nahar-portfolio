export const owkin = {
  slug: 'owkin-foundation-model-evaluation',
  title: 'Beyond Prediction Accuracy: Testing What Biomedical Models Rely On',
  subtitle:
    '1st-place Owkin hackathon project: test whether pathology foundation-model predictions depend on meaningful tissue representations — with matched-random controls and structured evidence cards.',
  status: '1st Place · Owkin Hackathon · Model evaluation workflow',
  context: 'Owkin Hackathon · San Francisco · July 2026',
  team: ['Ishika Nahar', 'Ben Moskowitz', 'Sophia Zhou', 'Eddie Bae'],
  github: 'https://github.com/ishikanahar/K-scope',
  stack: [
    'Phikon-v2',
    'H-optimus-0',
    'Python',
    'Embeddings',
    'Probes',
    'Matched-random controls',
    'Evidence cards',
    'MCP',
  ],
  atAGlance: [
    { label: 'Models', value: 'Phikon-v2', detail: '+ H-optimus-0 substrate' },
    { label: 'Tiles', value: '5,400', detail: 'NCT-CRC-HE · 9 classes' },
    { label: 'Tests', value: 'Probe→Ablate', detail: 'Matched-random · specificity' },
    { label: 'Output', value: 'certify()', detail: 'JSON evidence card' },
  ],
  myContribution: [
    'Built the local evidence-card dashboard UI (Case / Proof / Verdict cockpit) so the team could demo certify(prediction) without a GPU live.',
    'Hardened the UI for the zero-claims edge case so the demo fails gracefully.',
    'Collaborated on framing the certification idea as a structured evaluation workflow rather than only a visualization.',
  ],
  teamBuilt: [
    'Causal evaluation battery: probe, ablation, matched-random null, specificity, confound hooks',
    'MCP tools exposing certify / probe / ablate verbs',
    'Embedding extraction and SageMaker GPU infrastructure for large ViTs',
  ],
  architecture: [
    { label: 'H&E tissue tile', detail: '224×224 colorectal patches' },
    { label: 'Foundation model', detail: 'Phikon-v2 / H-optimus-0' },
    { label: 'Multi-layer embeddings', detail: 'CLS + mean-patch at selected depths' },
    { label: 'Probe & intervene', detail: 'Decode vs dependence tests' },
    { label: 'Matched-random null', detail: 'Control for generic damage' },
    { label: 'certify(prediction)', detail: 'Structured evidence card' },
  ],
} as const
