'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import {
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Info,
} from 'lucide-react'
import {
  sternsonDemoFrames,
  STERNSON_DEMO_META,
  STERNSON_DURATION,
  STERNSON_FPS,
  type SternsonFrame,
} from '@/data/sternson-demo-data'
import { cn } from '@/lib/utils'

type Selection = [number, number] | null
type VisitorLabel = 'Observation' | 'Not observation' | 'Unsure'

export function BehavioralMLExplorer({
  showPoseOverlay = false,
}: {
  /** Reserved for a future pose-coordinate file. Inactive until real data exists. */
  showPoseOverlay?: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const data = sternsonDemoFrames
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showDem, setShowDem] = useState(true)
  const [showObs, setShowObs] = useState(true)
  const [label, setLabel] = useState<VisitorLabel>('Observation')
  const [selection, setSelection] = useState<Selection>(null)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const [comparison, setComparison] = useState(
    'Your comparison will appear here after you mark an interval.',
  )
  const reduceMotion = usePrefersReducedMotion()

  const frame = Math.min(
    data.length - 1,
    Math.max(0, Math.floor(currentTime * STERNSON_FPS)),
  )
  const row = data[frame]

  const demSegs = useMemo(() => segments(data.map((r) => r.dem)), [data])
  const obsSegs = useMemo(() => segments(data.map((r) => r.obs)), [data])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    let raf = 0
    const tick = () => {
      setCurrentTime(v.currentTime)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const seekFrame = (delta: number) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(
      0,
      Math.min(STERNSON_DURATION, v.currentTime + delta / STERNSON_FPS),
    )
  }

  const jumpToEpisode = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    setPlaying(false)
    v.currentTime = STERNSON_DEMO_META.guidedEpisode.startFrame / STERNSON_FPS
  }

  const onTrackPointer = (
    e: ReactPointerEvent<HTMLDivElement>,
    phase: 'down' | 'move' | 'up',
  ) => {
    const f = frameFromEvent(e)
    if (phase === 'down') {
      ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
      setDragStart(f)
    } else if (phase === 'move' && dragStart !== null) {
      setSelection([Math.min(dragStart, f), Math.max(dragStart, f)])
    } else if (phase === 'up' && dragStart !== null) {
      setSelection([Math.min(dragStart, f), Math.max(dragStart, f)])
      setDragStart(null)
    }
  }

  const reset = () => {
    setSelection(null)
    setDragStart(null)
    setComparison(
      'Your comparison will appear here after you mark an interval.',
    )
  }

  const compare = () => {
    if (!selection) {
      setComparison('Select an interval first by dragging on a behavior track.')
      return
    }
    const [a, b] = selection
    const rows = data.slice(a, b + 1)
    const dem = rows.filter((r) => r.dem === 1).length / rows.length
    const obs = rows.filter((r) => r.obs === 1).length / rows.length
    const headDelta = featureChange(rows, 'hd', 'ho')
    const distDelta = featureChangeSingle(rows, 'nn')

    let plain: string
    if (obs >= 0.55) {
      plain = `Your selected interval overlaps strongly with the corrected OBS annotation (${Math.round(obs * 100)}% of frames). ${headDelta} ${distDelta} This suggests orientation and proximity helped distinguish observation from unrelated movement — not proof of a neural mechanism.`
    } else if (dem >= 0.55) {
      plain = `Your interval overlaps more with corrected DEM observation (${Math.round(dem * 100)}% DEM vs ${Math.round(obs * 100)}% OBS). Compare the head-direction traces: DEM and OBS often orient differently during these bouts.`
    } else if (obs >= 0.25 || dem >= 0.25) {
      plain = `Partial overlap with corrected labels (${Math.round(dem * 100)}% DEM, ${Math.round(obs * 100)}% OBS). You may have caught the edge of a bout, or included frames where animals moved without a clear observation interval.`
    } else {
      plain = `Low overlap with corrected observation labels (${Math.round(dem * 100)}% DEM, ${Math.round(obs * 100)}% OBS). The animals may still be moving — check whether head direction or nose-to-nose distance actually shift in your window.`
    }

    setComparison(
      `You labeled frames ${a}–${b} as “${label}”. ${plain}`,
    )
  }

  const playheadPct = (currentTime / STERNSON_DURATION) * 100

  return (
    <div className="space-y-4 overflow-x-hidden rounded-2xl border border-border bg-card p-3 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wider text-primary">
            Interactive research preview · working prototype
          </p>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight sm:text-xl">
            Can you identify an observation episode?
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground text-pretty">
            Watch the demonstrator (DEM) and observer (OBS), mark an interval,
            then compare your judgment with the corrected behavioral annotation
            and movement features — same interaction as the private explorer,
            rebuilt in this portfolio’s design system.
          </p>
        </div>
        <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-800 dark:text-amber-300">
          Pending lab approval
        </span>
      </div>

      {/* 3-step strip */}
      <ol className="grid gap-2 sm:grid-cols-3">
        {[
          '1. Watch the DEM / OBS interaction',
          '2. Drag to mark an interval',
          '3. Compare with corrected labels',
        ].map((step) => (
          <li
            key={step}
            className="rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium"
          >
            {step}
          </li>
        ))}
      </ol>

      <div className="grid gap-4 lg:grid-template-cols lg:grid-cols-[1.55fr_0.85fr]">
        <div className="space-y-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-black">
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              preload="metadata"
              poster="/projects/sternson/poster.jpg"
              playsInline
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            >
              <source
                src="/projects/sternson/sternson-demo.mp4"
                type="video/mp4"
              />
            </video>
            {/* Pose overlay hook — inactive without real coordinates */}
            {showPoseOverlay && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 text-[11px] text-white">
                Pose overlay ready — awaiting approved coordinate file.
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
              {playing ? 'Pause' : 'Play'}
            </button>
            <button
              type="button"
              onClick={() => seekFrame(-1)}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-2 text-sm"
            >
              <SkipBack className="size-4" /> −1
            </button>
            <button
              type="button"
              onClick={() => seekFrame(1)}
              className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-2 text-sm"
            >
              +1 <SkipForward className="size-4" />
            </button>
            <select
              aria-label="Playback speed"
              className="rounded-md border border-border bg-background px-2 py-2 text-sm"
              defaultValue="1"
              onChange={(e) => {
                if (videoRef.current)
                  videoRef.current.playbackRate = Number(e.target.value)
              }}
            >
              <option value="0.5">0.5×</option>
              <option value="1">1×</option>
              <option value="2">2×</option>
            </select>
            <button
              type="button"
              onClick={jumpToEpisode}
              className="rounded-md border border-primary/40 bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
            >
              Try this episode
            </button>
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
              {fmt(currentTime)} / {fmt(STERNSON_DURATION)} · frame {frame}
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={STERNSON_DURATION}
            step={0.1}
            value={currentTime}
            aria-label="Video position"
            className="w-full accent-[var(--primary)]"
            onChange={(e) => {
              const t = Number(e.target.value)
              if (videoRef.current) videoRef.current.currentTime = t
              setCurrentTime(t)
            }}
          />

          <div className="flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={showDem}
                onChange={(e) => setShowDem(e.target.checked)}
              />
              <span>
                <span className="font-medium">DEM</span>
                <span className="text-muted-foreground"> demonstrator</span>
              </span>
              <Tip text="DEM = demonstrator mouse that already knows the food-reward task." />
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={showObs}
                onChange={(e) => setShowObs(e.target.checked)}
              />
              <span>
                <span className="font-medium">OBS</span>
                <span className="text-muted-foreground"> observer</span>
              </span>
              <Tip text="OBS = observer mouse that watches and may learn from the demonstrator." />
            </label>
          </div>
        </div>

        <aside className="space-y-3 rounded-xl border border-border bg-background p-4">
          <div className="grid grid-cols-2 gap-2">
            <Stat
              label="Nose distance"
              tip="Distance between DEM and OBS nose keypoints."
              value={row ? row.nn.toFixed(1) : '—'}
            />
            <Stat
              label="OBS velocity"
              tip="How quickly the observer is moving."
              value={row ? row.vo.toFixed(2) : '—'}
            />
          </div>

          <label className="block text-sm">
            <span className="text-muted-foreground">Your temporary label</span>
            <select
              className="mt-1 w-full rounded-md border border-border bg-card px-2 py-2"
              value={label}
              onChange={(e) => setLabel(e.target.value as VisitorLabel)}
            >
              <option>Observation</option>
              <option>Not observation</option>
              <option>Unsure</option>
            </select>
          </label>

          <p className="text-xs text-muted-foreground">
            Drag across either behavior track below to select an interval. Labels
            stay in this browser only — nothing is uploaded.
          </p>

          <div className="min-h-[3rem] rounded-lg border border-border px-3 py-2 text-sm">
            {selection
              ? `Selected frames ${selection[0]}–${selection[1]} (${fmt(selection[0] / STERNSON_FPS)}–${fmt(selection[1] / STERNSON_FPS)}) as “${label}”.`
              : 'No interval selected.'}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={compare}
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
            >
              Compare with annotation
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm"
            >
              <RotateCcw className="size-3.5" /> Reset
            </button>
          </div>

          <div className="rounded-lg border border-border bg-card px-3 py-2 text-sm leading-relaxed text-foreground/90 text-pretty">
            {comparison}
          </div>
        </aside>
      </div>

      {/* Tracks + charts */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block size-2.5 rounded-sm bg-[var(--dem)]" />
            DEM corrected observation
            <Tip text="Manually corrected intervals where the demonstrator was scored as observing / related observation behavior." />
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="inline-block size-2.5 rounded-sm bg-[var(--obs)]" />
            OBS corrected observation
            <Tip text="Manually corrected intervals for the observer. These are ground-truth labels — not live model predictions." />
          </span>
        </div>

        <AnnotationTrack
          title="DEM corrected"
          pattern="dem"
          segments={demSegs}
          hidden={!showDem}
          n={data.length}
          selection={selection}
          playheadPct={playheadPct}
          onPointerDown={(e) => onTrackPointer(e, 'down')}
          onPointerMove={(e) => onTrackPointer(e, 'move')}
          onPointerUp={(e) => onTrackPointer(e, 'up')}
          onJump={(f) => {
            if (videoRef.current) videoRef.current.currentTime = f / STERNSON_FPS
          }}
        />
        <AnnotationTrack
          title="OBS corrected"
          pattern="obs"
          segments={obsSegs}
          hidden={!showObs}
          n={data.length}
          selection={selection}
          playheadPct={playheadPct}
          onPointerDown={(e) => onTrackPointer(e, 'down')}
          onPointerMove={(e) => onTrackPointer(e, 'move')}
          onPointerUp={(e) => onTrackPointer(e, 'up')}
          onJump={(f) => {
            if (videoRef.current) videoRef.current.currentTime = f / STERNSON_FPS
          }}
        />

        <FeatureChart
          title="Head direction"
          tip="Orientation inferred from nose–ear geometry for DEM and OBS."
          data={data}
          keys={['hd', 'ho']}
          colors={['var(--dem)', 'var(--obs)']}
          playheadPct={playheadPct}
          animate={!reduceMotion}
        />
        <FeatureChart
          title="Angular velocity"
          tip="How quickly each animal’s head orientation is changing."
          data={data}
          keys={['ad', 'ao']}
          colors={['var(--dem)', 'var(--obs)']}
          playheadPct={playheadPct}
          animate={!reduceMotion}
        />
        <FeatureChart
          title="Nose-to-nose distance"
          tip="Euclidean distance between DEM and OBS nose keypoints."
          data={data}
          keys={['nn']}
          colors={['var(--chart-1)']}
          playheadPct={playheadPct}
          animate={!reduceMotion}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        This demo uses a precomputed ~2-minute sample. It does not run SLEAP or
        XGBoost in the browser.
      </p>
    </div>
  )
}

function AnnotationTrack({
  title,
  pattern,
  segments: segs,
  hidden,
  n,
  selection,
  playheadPct,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onJump,
}: {
  title: string
  pattern: 'dem' | 'obs'
  segments: [number, number][]
  hidden: boolean
  n: number
  selection: Selection
  playheadPct: number
  onPointerDown: (e: ReactPointerEvent<HTMLDivElement>) => void
  onPointerMove: (e: ReactPointerEvent<HTMLDivElement>) => void
  onPointerUp: (e: ReactPointerEvent<HTMLDivElement>) => void
  onJump: (frame: number) => void
}) {
  return (
    <div
      className="relative h-10 touch-none select-none overflow-hidden rounded-lg border border-border bg-secondary/40"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      role="slider"
      aria-label={`${title} timeline — drag to select`}
    >
      <span className="pointer-events-none absolute left-2 top-2 z-10 text-[11px] font-medium text-foreground drop-shadow">
        {title}
        {pattern === 'dem' ? ' · DEM' : ' · OBS'}
      </span>
      {!hidden &&
        segs.map(([a, b]) => (
          <button
            key={`${a}-${b}`}
            type="button"
            aria-label={`Jump to frames ${a}–${b}`}
            className={cn(
              'absolute top-0 h-full border-0 opacity-85',
              pattern === 'dem'
                ? 'bg-[var(--dem)] bg-[repeating-linear-gradient(45deg,transparent,transparent_3px,rgba(0,0,0,0.15)_3px,rgba(0,0,0,0.15)_6px)]'
                : 'bg-[var(--obs)] bg-[repeating-linear-gradient(-45deg,transparent,transparent_3px,rgba(255,255,255,0.12)_3px,rgba(255,255,255,0.12)_6px)]',
            )}
            style={{
              left: `${(a / (n - 1)) * 100}%`,
              width: `${Math.max(0.35, ((b - a + 1) / n) * 100)}%`,
            }}
            onClick={(e) => {
              e.stopPropagation()
              onJump(a)
            }}
          />
        ))}
      {selection && (
        <div
          className="pointer-events-none absolute top-0 h-full border border-primary bg-primary/25"
          style={{
            left: `${(selection[0] / (n - 1)) * 100}%`,
            width: `${((selection[1] - selection[0] + 1) / n) * 100}%`,
          }}
        />
      )}
      <div
        className="pointer-events-none absolute top-0 z-20 h-full w-0.5 bg-foreground"
        style={{ left: `${playheadPct}%` }}
      />
    </div>
  )
}

function FeatureChart({
  title,
  tip,
  data,
  keys,
  colors,
  playheadPct,
}: {
  title: string
  tip: string
  data: SternsonFrame[]
  keys: (keyof SternsonFrame)[]
  colors: string[]
  playheadPct: number
  animate?: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.scale(dpr, dpr)

    const vals = keys.flatMap((k) =>
      data.map((r) => Number(r[k])).filter(Number.isFinite),
    )
    const min = Math.min(...vals)
    const max = Math.max(...vals)
    const span = max - min || 1

    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.strokeStyle = 'color-mix(in oklch, var(--border) 80%, transparent)'
    ctx.lineWidth = 1
    for (let i = 1; i < 4; i++) {
      const y = (rect.height * i) / 4
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    keys.forEach((k, j) => {
      ctx.strokeStyle = colors[j]
      ctx.lineWidth = 1.5
      ctx.beginPath()
      data.forEach((r, i) => {
        const v = Number(r[k])
        const x = (i / (data.length - 1)) * rect.width
        const y = rect.height - ((v - min) / span) * rect.height
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      })
      ctx.stroke()
    })
  }, [colors, data, keys])

  useEffect(() => {
    draw()
    const onResize = () => draw()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [draw])

  return (
    <div className="relative h-28 overflow-hidden rounded-lg border border-border bg-secondary/30">
      <div className="absolute left-2 top-2 z-10 flex items-center gap-1 text-[11px] font-medium">
        {title}
        <Tip text={tip} />
      </div>
      <canvas ref={canvasRef} className="h-full w-full" />
      <div
        className="pointer-events-none absolute top-0 z-20 h-full w-0.5 bg-foreground"
        style={{ left: `${playheadPct}%` }}
      />
    </div>
  )
}

function Stat({
  label,
  value,
  tip,
}: {
  label: string
  value: string
  tip: string
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
        {label}
        <Tip text={tip} />
      </div>
      <p className="mt-1 font-display text-lg font-semibold tabular-nums">
        {value}
      </p>
    </div>
  )
}

function Tip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <Info className="size-3.5 text-muted-foreground" aria-hidden />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1 hidden w-48 -translate-x-1/2 rounded-md border border-border bg-popover px-2 py-1.5 text-[11px] font-normal leading-snug text-popover-foreground shadow-md group-hover:block group-focus-within:block">
        {text}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}

function segments(values: number[]): [number, number][] {
  const out: [number, number][] = []
  let start: number | null = null
  ;[...values, 0].forEach((v, i) => {
    if (v && start === null) start = i
    if (!v && start !== null) {
      out.push([start, i - 1])
      start = null
    }
  })
  return out
}

function frameFromEvent(e: ReactPointerEvent<HTMLDivElement>) {
  const box = e.currentTarget.getBoundingClientRect()
  const n = sternsonDemoFrames.length
  return Math.max(
    0,
    Math.min(n - 1, Math.round(((e.clientX - box.left) / box.width) * (n - 1))),
  )
}

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, '0')}:${r.toFixed(1).padStart(4, '0')}`
}

function featureChange(
  rows: SternsonFrame[],
  demKey: keyof SternsonFrame,
  obsKey: keyof SternsonFrame,
) {
  if (rows.length < 2) return ''
  const demSpan =
    Math.max(...rows.map((r) => Number(r[demKey]))) -
    Math.min(...rows.map((r) => Number(r[demKey])))
  const obsSpan =
    Math.max(...rows.map((r) => Number(r[obsKey]))) -
    Math.min(...rows.map((r) => Number(r[obsKey])))
  if (obsSpan > demSpan * 1.15) {
    return 'The head-direction trace for OBS also varies more during this period.'
  }
  if (demSpan > 20 || obsSpan > 20) {
    return 'Head-direction traces also change during this period.'
  }
  return 'Head direction is relatively steady in this window.'
}

function featureChangeSingle(rows: SternsonFrame[], key: keyof SternsonFrame) {
  if (rows.length < 2) return ''
  const vals = rows.map((r) => Number(r[key]))
  const span = Math.max(...vals) - Math.min(...vals)
  if (span > 40) {
    return 'Nose-to-nose distance also shifts noticeably here.'
  }
  return ''
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const fn = () => setReduced(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return reduced
}
