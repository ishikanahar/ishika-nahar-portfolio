/**
 * Sternson Lab case-study content.
 * Lab visuals: approvalStatus "pending" | "approved" | "hidden"
 */

export type ApprovalStatus = 'pending' | 'approved' | 'hidden'

export interface LabAsset {
  src: string
  alt: string
  caption: string
  approvalStatus: ApprovalStatus
}

export interface ConceptCard {
  id: string
  name: string
  definition: string
  whyNeeded: string
  howUsed: string
  implementation: string
  limitation: string
  formula?: string
}

export interface PipelineStage {
  id: string
  label: string
  short: string
  detail: string
  asset?: LabAsset
}

export const sternson = {
  slug: 'sternson-behavioral-ml',
  approvalStatus: 'approved' as ApprovalStatus,
  approvalNotice: '',

  hero: {
    title: 'From Mouse Videos to Measurable Behavior',
    subtitle:
      'A human-in-the-loop machine learning workflow for tracking two interacting mice, translating pose trajectories into behavioral features, and validating behavior predictions against corrected annotations.',
    cardTitle: 'Behavioral Machine Learning for Social Observation',
    cardContext: 'UC San Diego Sternson Lab · Data Engineer Research',
    cardSummary:
      'Built a human-in-the-loop workflow for tracking two interacting mice, extracting behavioral features, and evaluating observation-behavior predictions against corrected annotations.',
    tags: ['Computer Vision', 'SLEAP', 'XGBoost', 'Behavioral Data'],
    verifiedHighlight:
      '8,200 annotated frames and 0.85 mean ROC-AUC with five-fold cross-validation',
  },

  meta: {
    organization: 'Sternson Lab, UC San Diego',
    role: 'Data Engineer Research Assistant',
    timeline: 'June 2025 to Present',
    location: 'San Diego, CA',
    domain: 'Behavioral Neuroscience',
    methods: [
      'Pose Estimation',
      'Feature Engineering',
      'Classification',
      'Error Analysis',
    ],
  },

  atAGlance: [
    {
      label: 'Annotated frames',
      value: '8,200',
      detail: 'Across three labeling batches',
    },
    {
      label: 'Keypoints tracked',
      value: '4',
      detail: 'Nose, left ear, right ear, tail base',
    },
    {
      label: 'Animals',
      value: '2',
      detail: 'DEM (demonstrator) + OBS (observer)',
    },
    {
      label: 'Mean ROC-AUC',
      value: '0.85',
      detail: 'Five-fold cross-validation',
    },
  ],

  stack: [
    'SLEAP',
    'Python',
    'XGBoost',
    'pandas',
    'NumPy',
    'ELAN',
    'PyQt',
    'Computer Vision',
  ],

  coreConcepts: [
    'Multi-animal pose estimation',
    'Human-in-the-loop labeling',
    'Feature engineering',
    'Behavior classification',
    'Error analysis',
  ],

  toc: [
    { id: 'at-a-glance', label: 'At a glance' },
    { id: 'problem', label: 'The problem' },
    { id: 'contribution', label: 'My contribution' },
    { id: 'pipeline', label: 'How the pipeline worked' },
    { id: 'concepts', label: 'Technical concepts' },
    { id: 'demo', label: 'Interactive demo' },
    { id: 'results', label: 'Results' },
    { id: 'limitations', label: 'Limitations' },
    { id: 'learned', label: 'What I learned' },
  ],

  scientificContext: {
    lead: 'The experiment studies social observational learning: how one mouse learns by watching another.',
    dem: 'Demonstrator (DEM): the mouse that already knows how to interact with the food-reward location.',
    obs: 'Observer (OBS): the mouse that watches and may learn from the demonstrator before acting.',
    whyAutomation: [
      'Behavioral videos are long — manual frame-by-frame review does not scale.',
      'Two animals can overlap or obscure one another.',
      'Behavior unfolds over time, not in isolated images.',
      'Researchers need quantitative trajectories, not only video.',
    ],
  },

  problem:
    'Manually reviewing long behavioral recordings does not scale. The project needed a way to convert video of two interacting mice into structured data that could support the study of social observation and learning — while keeping humans in the loop to correct model failures.',

  whyItMatters:
    'Reliable tracking and validated behavior labels let researchers quantify social learning at a scale and consistency that manual scoring alone cannot match. Aggregate metrics are useful only when paired with human review of where the system fails.',

  contributionLead:
    'I contributed to a larger laboratory project (K99-related behavioral pipeline). I did not independently design the neuroscience experiment.',

  contribution: [
    'Manually labeled the nose, right ear, left ear, and tail base across selected frames.',
    'Labeled clear examples first, then targeted difficult frames involving overlap, occlusion, unusual orientation, and identity ambiguity.',
    'Corrected model-generated labels through three annotation batches (3,600 + 3,600 + 1,000 = 8,200 frames).',
    'Compared model predictions with manually corrected behavioral intervals using raster visualizations.',
    'Engineered movement, distance, orientation, and temporal features from pose trajectories.',
    'Aligned engineered features with corrected behavioral annotations.',
    'Trained and evaluated an XGBoost behavior classifier (0.85 mean ROC-AUC, five-fold CV).',
    'Created Python raster plots for error analysis and built / contributed to a PyQt interface for reviewing episodes and features.',
    'Contributed analyses presented at the 2025 Society for Neuroscience (SfN) Annual Conference.',
  ],

  pipelineStages: [
    {
      id: 'label',
      label: 'Label Keypoints',
      short: 'Manual SLEAP annotation',
      detail:
        'I manually annotated the nose, left ear, right ear, and tail base across selected video frames. Early labeling focused on clearly visible anatomy; later batches targeted difficult poses and failure cases. Each body part becomes an (x, y) coordinate per frame.',
      asset: {
        src: '/projects/sternson/manual-keypoints.png',
        alt: 'SLEAP labeling interface and keypoint documentation from the tracking report',
        caption:
          'Manual keypoint labeling: nose, ears, and tail base form the training ground truth for pose estimation.',
        approvalStatus: 'pending',
      },
    },
    {
      id: 'train',
      label: 'Train Pose Models',
      short: 'Top-down multi-animal SLEAP',
      detail:
        'The top-down pipeline uses a centroid model to locate each mouse, then a centered-instance model to predict anatomical keypoints within each crop: Video Frame → Mouse Centroids → Individual Crops → Four Keypoints per Mouse.',
      asset: {
        src: '/projects/sternson/training-pipeline.png',
        alt: 'Multi-animal top-down training description from the SLEAP report',
        caption:
          'Centroid + centered-instance training separates detection from per-animal keypoint prediction.',
        approvalStatus: 'pending',
      },
    },
    {
      id: 'review',
      label: 'Review Failures',
      short: 'Human-in-the-loop correction',
      detail:
        'I compared predicted intervals with manually corrected labels to identify false positives, missed bouts, and fragmented predictions. Occlusion and overlapping animals were recurring error sources. Cycle: Predict → Inspect → Label difficult cases → Retrain → Re-evaluate.',
      asset: {
        src: '/projects/sternson/prediction-comparison.png',
        alt: 'True versus predicted raster comparison of behavioral labels',
        caption:
          'Raster error analysis highlights false positives, missed bouts, and fragmented predictions.',
        approvalStatus: 'pending',
      },
    },
    {
      id: 'features',
      label: 'Extract Features',
      short: 'Trajectories → tabular signals',
      detail:
        'Pose trajectories were transformed into movement and interaction features: velocity, nose-to-nose distance, head direction, angular velocity, distance from the food/lick port, and temporal windows — not the full 134-column CSV dump.',
    },
    {
      id: 'classify',
      label: 'Classify Behavior',
      short: 'XGBoost + cross-validation',
      detail:
        'Derived features were aligned with corrected behavioral annotations and used to train an XGBoost classifier. Five-fold cross-validation produced a 0.85 mean ROC-AUC. This does not claim biological causality.',
    },
  ] satisfies PipelineStage[],

  features: [
    {
      name: 'Velocity',
      meaning: 'How quickly each mouse changes position.',
    },
    {
      name: 'Nose-to-nose distance',
      meaning: 'Proximity between DEM and OBS.',
    },
    {
      name: 'Head direction',
      meaning: 'Orientation from nose–ear geometry.',
    },
    {
      name: 'Angular velocity',
      meaning: 'How quickly orientation changes.',
    },
    {
      name: 'Reward-location distance',
      meaning: 'Distance to the food / lick port.',
    },
    {
      name: 'Temporal windows',
      meaning: 'Rolling summaries across frames — behavior is not frame-independent.',
    },
  ],

  concepts: [
    {
      id: 'keypoints',
      name: 'Anatomical Keypoints',
      definition:
        'Keypoints are anatomical landmarks represented as x/y coordinates in every video frame.',
      whyNeeded:
        'Raw video is pixels. Keypoints turn posture into structured numbers that support orientation, movement, and interaction measures.',
      howUsed:
        'I manually labeled nose, right ear, left ear, and tail base so SLEAP could learn reliable landmarks for both mice.',
      implementation:
        'Each labeled point is an (x, y) pair. Nose and ears support head orientation; tail base anchors body direction; inter-animal distances use paired landmarks over time.',
      limitation:
        'Occlusion and unusual poses reduce label confidence; early “easy” examples alone under-prepare the model for hard cases.',
    },
    {
      id: 'multi-animal',
      name: 'Multi-Animal Pose Estimation',
      definition:
        'Pose estimation converts video pixels into anatomical coordinates. Multi-animal pose estimation must detect more than one animal while separating their keypoints.',
      whyNeeded:
        'DEM and OBS share the same frame. Single-animal assumptions break when animals interact.',
      howUsed:
        'SLEAP predicted four keypoints per mouse across frames after iterative human-in-the-loop labeling.',
      implementation:
        'Labeled frames train a CNN that outputs per-body-part heatmaps; peaks become coordinates used for tracking.',
      limitation:
        'Overlap and identity ambiguity remain failure modes even after correction batches.',
    },
    {
      id: 'top-down',
      name: 'Top-Down Tracking Pipeline',
      definition:
        'A two-stage architecture: a centroid model finds each animal, then a centered-instance model predicts keypoints inside each crop.',
      whyNeeded:
        'Cropping each mouse simplifies keypoint prediction when two animals appear together.',
      howUsed:
        'I trained and iterated on the multi-animal top-down SLEAP setup described in the lab report.',
      implementation:
        'Video Frame → Mouse Centroids → Individual Crops → Four Keypoints per Mouse.',
      limitation:
        'Centroid errors cascade: a bad crop produces bad keypoints for that animal.',
    },
    {
      id: 'heatmaps',
      name: 'Confidence Heatmaps',
      definition:
        'Instead of outputting one coordinate immediately, the network produces a spatial heatmap per body part. Higher values mark likelier locations.',
      whyNeeded:
        'Heatmaps make training more stable and expose uncertainty when anatomy is ambiguous.',
      howUsed:
        'I reviewed predictions where heatmaps were diffuse or competing — often occlusion or overlap — and corrected those frames.',
      implementation:
        'Ground-truth labels become Gaussians; training matches predicted heatmaps (e.g. MSE). The peak becomes the predicted coordinate.',
      limitation:
        'Competing peaks under occlusion can yield wrong coordinates with misleading confidence.',
      formula: 'pred_keypoint = argmax_{(x,y)} heatmap_bodypart(x, y)',
    },
    {
      id: 'hitl',
      name: 'Human-in-the-Loop Learning',
      definition:
        'An iterative cycle where humans label, the model predicts, humans correct failures, and the model retrains on harder examples.',
      whyNeeded:
        'Clear frames alone do not teach the model about the cases that break tracking in real experiments.',
      howUsed:
        'I labeled clear anatomy first, then deliberately targeted occlusion, overlap, unusual orientations, low-confidence anatomy, and identity ambiguity across three batches.',
      implementation:
        'Label → Train → Predict → Review → Correct → Retrain. Corrected predictions were added back into training.',
      limitation:
        'Human labels still involve judgment; correction quality bounds downstream behavior models.',
    },
    {
      id: 'identity',
      name: 'Identity Tracking',
      definition:
        'Detecting two mice in one frame is different from keeping DEM and OBS identities consistent across time.',
      whyNeeded:
        'Swapped identities corrupt distance, orientation, and role-specific behavioral features.',
      howUsed:
        'I reviewed identity switches during overlap/crossing and used failures to guide re-labeling.',
      implementation:
        'SLEAP groups keypoints into instances (track_0 / track_1) using spatial arrangement and temporal continuity.',
      limitation:
        'No claim of perfect identity — overlap remains a recurring ambiguity source.',
    },
    {
      id: 'ground-truth',
      name: 'Behavioral Ground Truth',
      definition:
        'Pose keypoints are not behavior labels. Behavioral intervals are separately annotated and corrected.',
      whyNeeded:
        'Classification needs targets that mean “observation occurred here,” not only “where the nose was.”',
      howUsed:
        'Corrected behavioral intervals (aligned with tools such as ELAN / review interfaces) supervised the XGBoost stage.',
      implementation:
        'Distinguish: pose prediction → engineered feature → human behavioral annotation → classifier prediction.',
      limitation:
        'Corrected labels are human judgments, not absolute biological truth.',
    },
    {
      id: 'features',
      name: 'Feature Engineering',
      definition:
        'Transforming pose trajectories into tabular movement, distance, orientation, and temporal signals.',
      whyNeeded:
        'XGBoost does not see raw video; it learns from engineered features aligned to behavior intervals.',
      howUsed:
        'I engineered velocity, nose-to-nose distance, head direction, angular velocity, reward-location distance, and temporal windows.',
      implementation:
        'Frame-aligned features.csv joined to labels.csv on frame index for supervised training.',
      limitation:
        'Feature choice embeds assumptions; one frame is insufficient for temporally extended behaviors.',
    },
    {
      id: 'xgboost',
      name: 'XGBoost Classification',
      definition:
        'An ensemble of decision trees trained sequentially; later trees focus on patterns earlier trees handled poorly.',
      whyNeeded:
        'Behavioral features are mixed, nonlinear, and tabular — strong without requiring a huge end-to-end video dataset.',
      howUsed:
        'After pose estimation and feature extraction, I trained XGBoost to predict behavioral intervals from engineered features.',
      implementation:
        'Not run on raw frames. Evaluated with five-fold CV; explored HMMs separately for temporal state structure.',
      limitation:
        'Strong ROC-AUC does not prove a neural or biological mechanism.',
    },
    {
      id: 'cv',
      name: 'Five-Fold Cross-Validation',
      definition:
        'Data is split into five subsets; train on four, evaluate on one, rotate until each subset is held out.',
      whyNeeded:
        'More reliable than a single train/test split for estimating generalization.',
      howUsed:
        'Reported 0.85 mean ROC-AUC across folds for the behavior classifier.',
      implementation:
        'Mean performance aggregated across the five validation folds.',
      limitation:
        'Does not claim animal-level or participant-level separation unless separately verified.',
    },
    {
      id: 'roc',
      name: 'ROC-AUC',
      definition:
        'Measures how well a classifier ranks positive behavioral examples above negative ones across thresholds. 0.5 ≈ chance; 1.0 ≈ perfect ranking.',
      whyNeeded:
        'Behavior classes can be imbalanced; accuracy alone can mislead.',
      howUsed:
        'Primary reported metric for the XGBoost behavior model: 0.85 mean ROC-AUC.',
      implementation:
        'Computed per fold, then averaged. Not the same as classification accuracy.',
      limitation:
        'Does not reveal false positives, missed bouts, or occlusion failures — raster review does.',
    },
    {
      id: 'raster',
      name: 'Raster Error Analysis',
      definition:
        'Timeline visualizations comparing true vs predicted behavioral intervals frame by frame.',
      whyNeeded:
        'Aggregate metrics hide where the model fails temporally.',
      howUsed:
        'I used rasters to find false positives, false negatives, fragmented bouts, and occlusion-related misses to prioritize re-labeling.',
      implementation:
        'Python plots of observation_* labels over frame index for corrected vs predicted series.',
      limitation:
        'Interpretation still requires watching the video context around spikes.',
    },
    {
      id: 'pyqt',
      name: 'PyQt Review Interface',
      definition:
        'A desktop GUI for playing video alongside DEM/OBS episode blocks and synchronized feature traces.',
      whyNeeded:
        'Validating predictions requires inspecting episodes with movement features, not only CSV rows.',
      howUsed:
        'Supported human validation, zooming, frame-range selection, and saving revised labels.',
      implementation:
        'Video + annotation tracks + head-direction / angular-velocity style traces — the web demo below mirrors this review workflow.',
      limitation:
        'The public website demo uses a short precomputed sample; it does not run SLEAP or XGBoost live.',
    },
    {
      id: 'hmm',
      name: 'Hidden Markov Models (Explored)',
      definition:
        'Models behavior as hidden states that emit movement features, capturing temporal persistence and transitions.',
      whyNeeded:
        'Frame-independent classifiers can fragment continuous bouts; HMMs encode temporal structure.',
      howUsed:
        'Explored for continuous behavioral-state modeling alongside the XGBoost pipeline.',
      implementation:
        'Labeled clearly as explored — not claimed as the final deployed model with verified HMM metrics.',
      limitation:
        'No final HMM performance number is claimed here without a verified result table.',
    },
  ] satisfies ConceptCard[],

  assets: {
    hero: {
      src: '/projects/sternson/hero-still.png',
      alt: 'Still from a behavioral arena video used for pose labeling',
      caption: 'Arena still used during manual keypoint labeling.',
      approvalStatus: 'pending' as ApprovalStatus,
    },
    heatmap: {
      src: '/projects/sternson/heatmap-example.png',
      alt: 'Heatmap and keypoint mathematics explanation from the SLEAP report',
      caption: 'SLEAP predicts body-part heatmaps; peaks become coordinates.',
      approvalStatus: 'pending' as ApprovalStatus,
    },
  },

  results: [
    '8,200 annotated frames across three labeling batches',
    'Four anatomical landmarks across two animals',
    '0.85 mean ROC-AUC with five-fold cross-validation',
    'Human-reviewed error cases involving occlusion, identity switches, and low-confidence predictions',
    'Interactive tools for reviewing behavioral episodes and temporal features',
    'Analyses contributed to work presented at SfN 2025',
  ],

  limitations: [
    'Pose confidence decreases during occlusion.',
    'Mouse overlap can cause identity ambiguity.',
    'Manually corrected labels still involve human judgment.',
    'Temporal dependence complicates frame-level evaluation.',
    'ROC-AUC does not reveal every failure mode.',
    'The public demonstration uses a short, precomputed sample — it does not run SLEAP or XGBoost live.',
    'Laboratory footage and figures require approval before public use.',
  ],

  learned:
    'This project changed how I think about model performance. A strong aggregate metric does not reveal where a system fails. Reviewing individual frames and behavioral episodes showed me why domain context and human validation remain essential when predictions are used to interpret complex biological behavior.',

  transferable: [
    'Working with noisy, imperfect real-world data',
    'Building reproducible feature pipelines',
    'Evaluating models beyond a single metric',
    'Designing human-in-the-loop review workflows',
    'Communicating technical results to interdisciplinary teams',
  ],

  accuracyNotes: [
    'SLEAP predicts pose keypoints — not behavior labels.',
    'XGBoost predicts behavior from engineered features.',
    'Corrected annotations are not the same as model predictions.',
    'Feature–behavior association does not establish biological causality.',
  ],
} as const

export type SternsonContent = typeof sternson
