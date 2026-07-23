/**
 * Subtle neuro / data-science atmosphere for the homepage hero.
 * Sparse nodes, faint spike traces, soft grid — no clutter over the brand.
 */
export function NeuroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft brand washes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% -5%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 55%), radial-gradient(ellipse 45% 40% at 92% 28%, color-mix(in oklch, var(--chart-2) 12%, transparent), transparent 50%), radial-gradient(ellipse 40% 35% at 8% 70%, color-mix(in oklch, var(--chart-5) 8%, transparent), transparent 55%)',
        }}
      />

      {/* Fine data grid */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.22]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklch, var(--foreground) 4.5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 4.5%, transparent) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage:
            'radial-gradient(ellipse 75% 70% at 50% 40%, black 20%, transparent 75%)',
        }}
      />

      {/* Neural graph + spike traces */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.55] dark:opacity-[0.45]"
        viewBox="0 0 1200 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="neuro-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--chart-5)" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="spike-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="35%" stopColor="var(--primary)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Connections */}
        <g stroke="url(#neuro-edge)" strokeWidth="1.2">
          <path className="animate-flow" strokeDasharray="6 10" d="M120 120 L280 180 L420 140 L560 220" />
          <path className="animate-flow" strokeDasharray="5 12" d="M980 100 L860 160 L740 130 L620 200" />
          <path d="M160 480 L300 420 L440 460 L580 390" opacity="0.5" />
          <path d="M1040 500 L900 440 L760 480 L640 410" opacity="0.45" />
          <path d="M280 180 L300 420" opacity="0.35" />
          <path d="M860 160 L900 440" opacity="0.3" />
          <path d="M560 220 L620 200 L580 390" opacity="0.4" />
        </g>

        {/* Nodes */}
        <g fill="var(--primary)">
          {[
            [120, 120],
            [280, 180],
            [420, 140],
            [560, 220],
            [620, 200],
            [740, 130],
            [860, 160],
            [980, 100],
            [160, 480],
            [300, 420],
            [440, 460],
            [580, 390],
            [640, 410],
            [760, 480],
            [900, 440],
            [1040, 500],
          ].map(([x, y], i) => (
            <circle
              key={`${x}-${y}`}
              className="animate-node"
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 3.5 : 2.5}
              style={{ animationDelay: `${(i % 7) * 0.35}s` }}
              opacity="0.7"
            />
          ))}
        </g>

        {/* Spike / LFP-style traces */}
        <g stroke="url(#spike-stroke)" strokeWidth="1.4" strokeLinecap="round">
          <path d="M80 300 L140 300 L155 255 L170 340 L185 300 L260 300 L275 270 L290 330 L305 300 L400 300" />
          <path
            d="M720 340 L780 340 L792 305 L808 375 L822 340 L900 340 L915 315 L930 365 L945 340 L1080 340"
            opacity="0.85"
          />
          <path
            d="M200 540 L280 540 L295 510 L310 570 L325 540 L480 540"
            opacity="0.5"
          />
        </g>

        {/* Tiny mono data labels — desktop only to avoid clutter on phones */}
        <g
          className="hidden sm:block"
          fill="var(--muted-foreground)"
          fontFamily="ui-monospace, monospace"
          fontSize="11"
          opacity="0.45"
        >
          <text x="95" y="95">PCA · subspace</text>
          <text x="900" y="85">spike · rate</text>
          <text x="70" y="555">trial × neuron</text>
          <text x="920" y="555">ROC · AUC</text>
        </g>
      </svg>

      {/* Soft vignette so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  )
}
