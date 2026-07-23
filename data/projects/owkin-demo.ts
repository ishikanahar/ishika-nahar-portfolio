/**
 * Portfolio demo data derived from the team's live_card.json artifact.
 * Shown as a recorded evaluation readout — not a live GPU re-run in the browser.
 */
export const owkinDemoMeta = {
  caveat:
    'This certifies model-internal use of a concept claim — not biological or clinical validity.',
  confoundGate: 'UNCHECKED (single-source data)',
  coverage: '7 of 7 claims certifiable in this recorded card',
  track: 'phikon_v2 · NCT-CRC-HE · 1024-d CLS',
} as const

export const owkinDemoClaims = [
  {
    id: 'tumor_epithelium',
    label: 'Tumor epithelium',
    contrast: 'TUM vs NORM',
    verdict: 'GROUNDED',
    scores: { necessity: 0.458, sufficiency: 0.51, specificity: 0.8 },
    image: '/projects/owkin/tumor_epithelium.png',
  },
  {
    id: 'immune_infiltrate',
    label: 'Peritumoral lymphocytic infiltrate',
    contrast: 'LYM vs TUM',
    verdict: 'GROUNDED',
    scores: { necessity: 0.617, sufficiency: 0.52, specificity: 0.893 },
    image: '/projects/owkin/immune_infiltrate.png',
  },
  {
    id: 'stroma',
    label: 'Desmoplastic stroma',
    contrast: 'STR vs MUS',
    verdict: 'GROUNDED',
    scores: { necessity: 0.704, sufficiency: 0.504, specificity: 0.84 },
    image: '/projects/owkin/stroma.png',
  },
  {
    id: 'normal_mucosa',
    label: 'Residual normal mucosa',
    contrast: 'NORM vs TUM',
    verdict: 'GROUNDED',
    scores: { necessity: 0.047, sufficiency: 0.511, specificity: 0.791 },
    image: '/projects/owkin/normal_mucosa.png',
  },
] as const

/** Plain-language battery steps for the portfolio demo. */
export const owkinBatterySteps = [
  {
    id: 'probe',
    title: 'Probe',
    question: 'Can we decode the concept from the embedding?',
    detail: 'Linear probe on frozen CLS. High score = readable signal, not proof of dependence.',
  },
  {
    id: 'ablate',
    title: 'Ablate',
    question: 'Does removing that axis hurt the prediction?',
    detail: 'Zero out the concept direction and re-read the model output.',
  },
  {
    id: 'null',
    title: 'Matched-random',
    question: 'Was the targeted edit worse than a random edit?',
    detail: 'Compare against size-matched random ablations so we are not just “damaging” the model.',
  },
  {
    id: 'spec',
    title: 'Specificity',
    question: 'Is the effect specific to this concept?',
    detail: 'Ablate a distractor axis — the target claim should stay intact.',
  },
] as const
