/**
 * Animated hero visual: raw data points enter from the left, pass through
 * two model/analysis layers, and resolve into a structured "evidence card"
 * on the right. Pure SVG + CSS, respects prefers-reduced-motion.
 */
export function HeroVisual() {
  const inputs = [40, 78, 116, 154, 192, 230]
  const layer1 = [70, 120, 170, 220]
  const layer2 = [95, 155, 205]

  return (
    <div className="relative w-full">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-bg rounded-2xl opacity-60"
      />
      <svg
        viewBox="0 0 520 280"
        className="relative w-full"
        role="img"
        aria-label="Diagram: raw data points flow through model layers and become a structured evidence card."
      >
        <defs>
          <linearGradient id="edgeFade" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* edges: inputs -> layer1 */}
        <g stroke="url(#edgeFade)" strokeWidth="1" fill="none">
          {inputs.map((y1, i) =>
            layer1.map((y2, j) => (
              <path
                key={`e1-${i}-${j}`}
                d={`M60 ${y1} C 130 ${y1}, 130 ${y2}, 190 ${y2}`}
                strokeDasharray="4 6"
                className="animate-flow"
                style={{ animationDelay: `${(i + j) * -0.4}s` }}
              />
            )),
          )}
        </g>

        {/* edges: layer1 -> layer2 */}
        <g stroke="url(#edgeFade)" strokeWidth="1" fill="none">
          {layer1.map((y1, i) =>
            layer2.map((y2, j) => (
              <path
                key={`e2-${i}-${j}`}
                d={`M190 ${y1} C 250 ${y1}, 250 ${y2}, 310 ${y2}`}
                strokeDasharray="4 6"
                className="animate-flow"
                style={{ animationDelay: `${(i + j) * -0.5}s` }}
              />
            )),
          )}
        </g>

        {/* edges: layer2 -> card */}
        <g stroke="url(#edgeFade)" strokeWidth="1.25" fill="none">
          {layer2.map((y1, i) => (
            <path
              key={`e3-${i}`}
              d={`M310 ${y1} C 360 ${y1}, 360 140, 400 140`}
              strokeDasharray="4 6"
              className="animate-flow"
              style={{ animationDelay: `${i * -0.6}s` }}
            />
          ))}
        </g>

        {/* input nodes */}
        {inputs.map((y, i) => (
          <circle
            key={`i-${i}`}
            cx="60"
            cy={y}
            r="4.5"
            fill="var(--chart-3)"
            className="animate-node"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        ))}

        {/* layer 1 nodes */}
        {layer1.map((y, i) => (
          <circle
            key={`l1-${i}`}
            cx="190"
            cy={y}
            r="7"
            fill="var(--primary)"
            className="animate-node"
            style={{ animationDelay: `${i * 0.3 + 0.4}s` }}
          />
        ))}

        {/* layer 2 nodes */}
        {layer2.map((y, i) => (
          <circle
            key={`l2-${i}`}
            cx="310"
            cy={y}
            r="7"
            fill="var(--chart-2)"
            className="animate-node"
            style={{ animationDelay: `${i * 0.3 + 0.8}s` }}
          />
        ))}

        {/* evidence card */}
        <g>
          <rect
            x="400"
            y="86"
            width="104"
            height="108"
            rx="10"
            fill="var(--card)"
            stroke="var(--primary)"
            strokeWidth="1.5"
          />
          <circle cx="416" cy="104" r="5" fill="var(--primary)" />
          <path
            d="M413.5 104 l2 2 l3.5 -4"
            stroke="var(--primary-foreground)"
            strokeWidth="1.2"
            fill="none"
          />
          <rect x="428" y="100" width="60" height="6" rx="3" fill="var(--muted-foreground)" opacity="0.5" />
          <rect x="416" y="122" width="72" height="5" rx="2.5" fill="var(--border)" />
          <rect x="416" y="134" width="56" height="5" rx="2.5" fill="var(--border)" />
          <rect x="416" y="152" width="72" height="5" rx="2.5" fill="var(--chart-3)" opacity="0.7" />
          <rect x="416" y="164" width="44" height="5" rx="2.5" fill="var(--chart-2)" opacity="0.7" />
          <rect x="416" y="176" width="60" height="5" rx="2.5" fill="var(--primary)" opacity="0.5" />
        </g>

        {/* labels */}
        <g
          fontFamily="var(--font-mono)"
          fontSize="9"
          fill="var(--muted-foreground)"
          textAnchor="middle"
        >
          <text x="60" y="258">data</text>
          <text x="250" y="258">model layers</text>
          <text x="452" y="258">evidence</text>
        </g>
      </svg>
    </div>
  )
}
