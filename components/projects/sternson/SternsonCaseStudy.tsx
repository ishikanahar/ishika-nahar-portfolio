import Link from 'next/link'
import {
  ArrowLeft,
  CircleCheck,
  Lightbulb,
  TriangleAlert,
} from 'lucide-react'
import { sternson } from '@/data/projects/sternson'
import { AtAGlance } from '@/components/case-study/at-a-glance'
import { ConceptImplementationCard } from '@/components/case-study/concept-card'
import {
  ArchitectureFlow,
  FailureModeGrid,
  FigureBlock,
  ParBlock,
} from '@/components/case-study/visual-blocks'
import { PipelineStages } from '@/components/projects/sternson/pipeline-stages'
import { ExplorerLazy } from '@/components/projects/sternson/ExplorerLazy'

const ARCHITECTURE = [
  { label: 'Behavioral video', detail: 'Two mice · DEM + OBS · continuous recording' },
  { label: 'Manual keypoints', detail: 'Nose, earL, earR, tail base · 8,200 frames' },
  { label: 'SLEAP pose models', detail: 'Centroid → centered-instance · multi-animal' },
  { label: 'Human correction', detail: 'Occlusion, overlap, identity · retrain loop' },
  { label: 'Pose trajectories', detail: '(x, y, confidence) per landmark per frame' },
  { label: 'Feature engineering', detail: 'Velocity, distance, orientation, temporal' },
  { label: 'Behavior labels', detail: 'Corrected intervals (not pose itself)' },
  { label: 'XGBoost classifier', detail: '0.85 mean ROC-AUC · 5-fold CV' },
  { label: 'Error analysis', detail: 'Rasters + review GUI · failure modes' },
]

const FAILURES = [
  {
    title: 'False positive',
    detail:
      'Model marks observation when animals are only crossing or approaching without a true bout.',
  },
  {
    title: 'Missed bout',
    detail:
      'True observation interval present in corrected labels but absent or shortened in predictions.',
  },
  {
    title: 'Fragmented bout',
    detail:
      'One continuous behavior is split into pieces when a few middle frames are missed.',
  },
  {
    title: 'Occlusion / identity',
    detail:
      'Overlap or unusual orientation drops confidence and can swap DEM/OBS tracks.',
  },
]

export function SternsonCaseStudy() {
  const s = sternson

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/work"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All work
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-16">
          {/* HERO */}
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary">
                Machine Learning Research
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                Pose Estimation → Behavior Classification
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
              {s.hero.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">
              {s.hero.subtitle}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-3">
              <Meta label="Organization" value={s.meta.organization} />
              <Meta label="Role" value={s.meta.role} />
              <Meta label="Timeline" value={s.meta.timeline} />
              <Meta label="Domain" value={s.meta.domain} />
              <div className="col-span-2 sm:col-span-3">
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Methods
                </dt>
                <dd className="mt-1 flex flex-wrap gap-1.5">
                  {s.meta.methods.map((m) => (
                    <span
                      key={m}
                      className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </header>

          {/* INTERACTIVE DEMO — first thing after intro */}
          <section id="demo" className="scroll-mt-24 space-y-4">
            <SectionTitle>Try it: can you identify an observation episode?</SectionTitle>
            <p className="text-sm text-muted-foreground text-pretty">
              Working prototype from the Sternson Behavioral ML Explorer. Watch
              DEM/OBS, drag an interval, compare against corrected labels and
              synchronized features. Local browser state only — nothing uploads.
              Does not run SLEAP or XGBoost live.
            </p>
            <ExplorerLazy />
          </section>

          <FigureBlock
            src="/projects/sternson/sleap-keypoints-labeled.png"
            alt="SLEAP interface showing labeled anatomical keypoints on a mouse"
            caption="SLEAP labeling — nose, ears, and body landmarks placed on interacting mice across long recordings."
            pending={false}
          />

          {/* RECRUITER SUMMARY — Vedant-style PAR */}
          <section id="at-a-glance" className="scroll-mt-24 space-y-5">
            <SectionTitle>At a glance</SectionTitle>
            <AtAGlance items={[...s.atAGlance]} />

            <div className="grid gap-4">
              <ParBlock
                tone="problem"
                title="Manual review of social behavior videos does not scale"
              >
                <p>
                  Two mice share an arena: the <strong>demonstrator (DEM)</strong>{' '}
                  already knows the food-reward task; the{' '}
                  <strong>observer (OBS)</strong> watches and may learn. Hours of
                  video cannot be scored frame-by-frame by hand, and animals
                  overlap, occlude, and swap identities.
                </p>
              </ParBlock>

              <ParBlock
                tone="action"
                title="Human-in-the-loop pose tracking → features → classifier"
              >
                <ul className="space-y-1.5">
                  <li>
                    · Labeled 8,200 frames (nose, left ear, right ear, tail base)
                    across three correction batches
                  </li>
                  <li>
                    · Trained SLEAP multi-animal top-down models; reviewed
                    failures from occlusion and overlap
                  </li>
                  <li>
                    · Engineered movement / distance / orientation / temporal
                    features; aligned to corrected behavior intervals
                  </li>
                  <li>
                    · Trained XGBoost; built raster + review tooling for error
                    analysis (PyQt workflow + this web explorer)
                  </li>
                </ul>
              </ParBlock>

              <ParBlock
                tone="result"
                title="0.85 mean ROC-AUC with five-fold CV — plus inspectable failures"
              >
                <p>
                  Aggregate ranking performance of 0.85 mean ROC-AUC across folds,
                  with human-reviewed error cases. Analyses contributed to work
                  presented at <strong>SfN 2025</strong>. The metric comes from
                  the behavior-classification pipeline — not from the interactive
                  demo alone.
                </p>
              </ParBlock>
            </div>
          </section>

          {/* ARCHITECTURE */}
          <section id="architecture" className="scroll-mt-24 space-y-4">
            <SectionTitle>End-to-end architecture</SectionTitle>
            <p className="text-sm text-muted-foreground">
              Keep these layers separate when you interview: pose ≠ behavior;
              features ≠ labels; ROC-AUC ≠ “the biology is solved.”
            </p>
            <ArchitectureFlow steps={ARCHITECTURE} />
          </section>

          {/* PIPELINE VISUAL */}
          <section id="pipeline" className="scroll-mt-24 space-y-5">
            <SectionTitle>How the pipeline worked — visual walkthrough</SectionTitle>
            <p className="text-sm text-muted-foreground">
              Click each stage. Figures are cropped from lab tooling / analysis
              outputs — not full PDF pages dumped onto the site.
            </p>
            <PipelineStages
              stages={[
                {
                  id: 'label',
                  label: 'Label Keypoints',
                  short: 'SLEAP annotation UI',
                  detail:
                    'I loaded arena videos into SLEAP and manually placed nose, left ear, right ear, and tail base. Early batches favored clear anatomy; later batches targeted hard poses the model failed on. Each landmark is an (x, y) per frame — the ground truth for pose training.',
                  asset: {
                    src: '/projects/sternson/sleap-keypoints-labeled.png',
                    alt: 'SLEAP desktop interface with labeled keypoints on a mouse',
                    caption:
                      'SLEAP labeling — anatomical skeleton + labeling suggestions to prioritize informative frames.',
                    approvalStatus: 'approved',
                  },
                },
                {
                  id: 'train',
                  label: 'Train Pose Models',
                  short: 'Top-down multi-animal',
                  detail:
                    'Top-down pipeline: centroid model finds each mouse → centered-instance model predicts keypoints inside each crop. Flow: Video Frame → Centroids → Crops → Four keypoints per mouse. Training minimizes heatmap loss over epochs; I watched train/val curves and validation heatmaps while iterating labels.',
                  asset: {
                    src: '/projects/sternson/sleap-training-centroid.png',
                    alt: 'SLEAP centroid training monitor with loss curves',
                    caption:
                      'Centroid training monitor — loss curves + live validation heatmaps during iterative improvement.',
                    approvalStatus: 'approved',
                  },
                },
                {
                  id: 'review',
                  label: 'Review Failures',
                  short: 'Correct → retrain',
                  detail:
                    'After inference I compared original vs my corrected behavioral intervals and true vs predicted rasters. False positives, missed bouts, and fragmented predictions drove the next labeling batch. Cycle: Predict → Inspect → Label hard cases → Retrain → Re-evaluate.',
                  asset: {
                    src: '/projects/sternson/label-correction-comparison.png',
                    alt: 'Original vs corrected vs difference-highlighted behavioral label timelines',
                    caption:
                      'Label correction diagnostics — green markers highlight where my corrections disagree with the original intervals.',
                    approvalStatus: 'approved',
                  },
                },
                {
                  id: 'features',
                  label: 'Extract Features',
                  short: 'Trajectories → table',
                  detail:
                    'Pose trajectories become tabular signals: velocity, nose-to-nose distance, head direction, angular velocity, distance to lick/food port, and temporal windows. One frame is not enough for behaviors that unfold over time.',
                  asset: {
                    src: '/projects/sternson/pose-coordinates-table.png',
                    alt: 'Tabular pose coordinates with x, y, and confidence',
                    caption:
                      'Pose as a table — (x, y, confidence) per landmark before feature engineering.',
                    approvalStatus: 'approved',
                  },
                },
                {
                  id: 'classify',
                  label: 'Classify Behavior',
                  short: 'XGBoost + CV',
                  detail:
                    'Features aligned to corrected observation intervals train an XGBoost classifier. Five-fold cross-validation produced 0.85 mean ROC-AUC. This ranks positive vs negative frames — it is not accuracy, and it does not claim a neural mechanism.',
                  asset: {
                    src: '/projects/sternson/roc-fold1.png',
                    alt: 'ROC curve for fold 1 showing area under curve of 0.85',
                    caption:
                      'Example fold ROC — area = 0.85. Mean across five folds is the headline metric on my résumé.',
                    approvalStatus: 'approved',
                  },
                },
              ]}
            />

            <div>
              <h3 className="font-display text-base font-semibold">
                Feature cards (what I actually engineered)
              </h3>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {s.features.map((f) => (
                  <div
                    key={f.name}
                    className="rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <p className="text-sm font-medium">{f.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {f.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ERROR ANALYSIS VISUALS */}
          <section id="errors" className="scroll-mt-24 space-y-5">
            <SectionTitle>Error analysis is the point</SectionTitle>
            <p className="text-sm text-muted-foreground text-pretty">
              For ML interviews: I do not stop at a single score. Rasters show
              where predictions fragment, over-fire, or miss — which is how I
              chose the next frames to label.
            </p>
            <FailureModeGrid items={FAILURES} />
            <div className="grid gap-4 lg:grid-cols-2">
              <FigureBlock
                src="/projects/sternson/raster-true-vs-pred.png"
                alt="True vs predicted observation rasters over frame index"
                caption="True (blue) vs predicted (red) observation intervals — temporal alignment check, not just scalar AUC."
                pending={false}
              />
              <FigureBlock
                src="/projects/sternson/raster-dem-obs.png"
                alt="DEM and OBS raster comparison plots"
                caption="DEM vs OBS labeled intervals — role-specific behavior, not a single shared track."
                pending={false}
              />
            </div>
          </section>

          {/* CONTRIBUTION */}
          <section id="contribution" className="scroll-mt-24 space-y-4">
            <SectionTitle>What I built</SectionTitle>
            <p className="text-sm text-muted-foreground text-pretty">
              UC San Diego Neurobiology Lab · Data Engineer Research Assistant
              · June 2025 – Present. I contributed inside a larger laboratory
              pipeline for social observational learning — I did not design the
              neuroscience experiment myself.
            </p>
            <ul className="space-y-2.5">
              {[
                'Built and iterated a computer-vision pipeline to quantify social learning: SLEAP multi-animal pose estimation on 8,200 manually annotated frames across 3 labeling batches, tracking 4 keypoints on 2 interacting mice while maintaining identity.',
                'Labeled nose, left ear, right ear, and tail base — starting with clear anatomy, then targeting overlap, occlusion, unusual orientation, and identity ambiguity.',
                'Diagnosed model failures frame-by-frame (false positives, missed bouts, fragmented intervals, low-confidence heatmaps) and used those cases to drive targeted re-labeling and retraining.',
                'Aligned pose trajectories with ELAN ground-truth behavioral intervals — matching timestamps/frame indices so engineered features and labels refer to the same moments in the video.',
                'Engineered movement, inter-animal distance, orientation, and temporal features; trained and evaluated XGBoost with F1 and ROC-AUC (0.85 mean ROC-AUC, five-fold CV); explored HMMs for temporal state structure.',
                'Tuned classifier hyperparameters (tree depth, learning rate, regularization / sample weights) and compared folds to see where performance collapsed rather than chasing a single score.',
                'Built Python raster visualizations and a PyQt Orientation Editor for human-in-the-loop review: video + DEM/OBS episode blocks + synchronized head-direction and angular-velocity traces.',
                'Contributed analyses presented at the 2025 Society for Neuroscience Annual Meeting.',
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-sm">
                  <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-foreground/85">{item}</span>
                </li>
              ))}
            </ul>

            <div className="grid gap-4 lg:grid-cols-2">
              <FigureBlock
                src="/projects/sternson/pyqt-orientation-editor.png"
                alt="PyQt Orientation Editor with video, DEM/OBS episodes, and feature traces"
                caption="PyQt Orientation Editor — review video, edit DEM/OBS episodes, and inspect synchronized feature traces."
                pending={false}
              />
              <FigureBlock
                src="/projects/sternson/sleap-training-centroid.png"
                alt="SLEAP centroid model training monitor with loss curves and validation preview"
                caption="SLEAP centroid training — watching train/val loss and validation heatmaps while iterating labels."
                pending={false}
              />
            </div>
            <FigureBlock
              src="/projects/sternson/pose-coordinates-table.png"
              alt="Tabular pose coordinates with x, y, and confidence for ear landmarks"
              caption="Pose trajectories as data — (x, y, confidence) per landmark per frame before feature engineering."
              pending={false}
            />
          </section>

          {/* CONCEPT CARDS */}
          <section id="concepts" className="scroll-mt-24 space-y-4">
            <SectionTitle>Technical concepts</SectionTitle>
            <p className="text-sm text-muted-foreground">
              Expand any card for the definition, how it showed up in this
              pipeline, and what tends to break.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              {s.concepts.map((c, i) => (
                <ConceptImplementationCard
                  key={c.id}
                  name={c.name}
                  definition={c.definition}
                  whyNeeded={c.whyNeeded}
                  howUsed={c.howUsed}
                  implementation={c.implementation}
                  limitation={c.limitation}
                  formula={c.formula}
                  defaultOpen={i < 2}
                />
              ))}
            </div>
          </section>

          {/* RESULTS */}
          <section id="results" className="scroll-mt-24 space-y-4">
            <SectionTitle icon={<CircleCheck className="size-5" />}>
              Results
            </SectionTitle>
            <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
              <ul className="space-y-2.5">
                {s.results.map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm">
                    <CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <FigureBlock
                src="/projects/sternson/roc-fold1.png"
                alt="ROC curve with AUC 0.85"
                caption="Fold-level ROC (AUC 0.85). Mean across five folds is the résumé figure."
              />
            </div>
          </section>

          <section id="limitations" className="scroll-mt-24 space-y-4">
            <SectionTitle icon={<TriangleAlert className="size-5" />}>
              Limitations
            </SectionTitle>
            <div className="rounded-xl border border-border bg-secondary/40 p-5">
              <ul className="space-y-2 text-sm text-foreground/85">
                {s.limitations.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-dashed border-border p-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Accuracy distinctions (say these out loud in interviews)
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                {s.accuracyNotes.map((n) => (
                  <li key={n}>· {n}</li>
                ))}
              </ul>
            </div>
          </section>

          <section id="learned" className="scroll-mt-24 space-y-4">
            <SectionTitle icon={<Lightbulb className="size-5" />}>
              What I learned
            </SectionTitle>
            <p className="leading-relaxed text-foreground/85 text-pretty">
              {s.learned}
            </p>
            <h3 className="font-display text-base font-semibold">
              Transferable to applied ML / data roles
            </h3>
            <div className="flex flex-wrap gap-2">
              {s.transferable.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                At a glance
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {s.atAGlance.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-lg border border-border bg-background p-2.5"
                  >
                    <p className="font-display text-lg font-semibold text-primary">
                      {m.value}
                    </p>
                    <p className="text-[10px] leading-tight text-muted-foreground">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Technology stack
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {s.stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <nav aria-label="On this page">
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                On this page
              </p>
              <ul className="mt-2 space-y-1">
                {[
                  { id: 'demo', label: 'Interactive demo' },
                  { id: 'at-a-glance', label: 'At a glance' },
                  { id: 'architecture', label: 'Architecture' },
                  { id: 'pipeline', label: 'Visual pipeline' },
                  { id: 'errors', label: 'Error analysis' },
                  { id: 'contribution', label: 'What I built' },
                  { id: 'concepts', label: 'Concept cards' },
                  { id: 'results', label: 'Results' },
                  { id: 'limitations', label: 'Limitations' },
                  { id: 'learned', label: 'What I learned' },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href="#demo"
              className="flex w-full items-center justify-center rounded-md bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Jump to working prototype
            </a>
          </div>
        </aside>
      </div>
    </article>
  )
}

function SectionTitle({
  children,
  icon,
}: {
  children: React.ReactNode
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-primary">{icon}</span>}
      <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
        {children}
      </h2>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-medium">{value}</dd>
    </div>
  )
}
