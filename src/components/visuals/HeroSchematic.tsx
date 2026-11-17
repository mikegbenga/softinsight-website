/**
 * Hero visual — a schematic of SoftInsight as one integrated system:
 * four divisions routed into a single core, above the delivery track.
 * Pure SVG + CSS animation (no JavaScript).
 */

const nodes = [
  { x: 60, y: 46, label: "01 / SOFTWARE", sub: "Applications · Integration", icon: "code" },
  { x: 920, y: 46, label: "02 / INFRASTRUCTURE", sub: "Networks · Servers · Support", icon: "rack" },
  { x: 60, y: 330, label: "03 / TRAINING", sub: "Skills · Professional growth", icon: "steps" },
  { x: 920, y: 330, label: "04 / PROCUREMENT", sub: "Sourcing · Logistics · Projects", icon: "box" },
] as const;

const routes = [
  "M280 94 H440 V228 H504",
  "M920 94 H760 V228 H696",
  "M280 378 H440 V292 H504",
  "M920 378 H760 V292 H696",
];

function NodeIcon({ kind, x, y }: { kind: string; x: number; y: number }) {
  const s = { stroke: "currentColor", strokeWidth: 1.5, fill: "none" } as const;
  switch (kind) {
    case "code":
      return (
        <g transform={`translate(${x} ${y})`} {...s}>
          <rect x="0" y="0" width="34" height="26" />
          <path d="M0 7 H34" />
          <path d="M11 13 L7 17 L11 21 M23 13 L27 17 L23 21" stroke="#e3161b" />
        </g>
      );
    case "rack":
      return (
        <g transform={`translate(${x} ${y})`} {...s}>
          <rect x="4" y="0" width="26" height="8" />
          <rect x="4" y="9" width="26" height="8" />
          <rect x="4" y="18" width="26" height="8" />
          <circle cx="25" cy="4" r="1.2" fill="#11a139" stroke="none" />
          <circle cx="25" cy="13" r="1.2" fill="#11a139" stroke="none" />
          <circle cx="25" cy="22" r="1.2" fill="#e3161b" stroke="none" />
        </g>
      );
    case "steps":
      return (
        <g transform={`translate(${x} ${y})`} {...s}>
          <path d="M2 26 H12 V18 H22 V10 H32 V2" />
          <circle cx="32" cy="2" r="2.5" fill="#e3161b" stroke="none" />
        </g>
      );
    default:
      return (
        <g transform={`translate(${x} ${y})`} {...s}>
          <path d="M17 1 L33 8 L17 15 L1 8 Z" />
          <path d="M1 8 V20 L17 27 V15 M33 8 V20 L17 27" />
          <path d="M9 4.5 L25 11.5" stroke="#e3161b" />
        </g>
      );
  }
}

export function HeroSchematic() {
  return (
    <div className="relative">
      {/* Desktop / tablet composition */}
      <svg
        viewBox="0 0 1200 540"
        className="hidden h-auto w-full text-white md:block"
        role="img"
        aria-labelledby="schematic-title schematic-desc"
      >
        <title id="schematic-title">SoftInsight integrated technology system</title>
        <desc id="schematic-desc">
          A schematic diagram connecting SoftInsight&apos;s four divisions — software, infrastructure, training and procurement —
          to a single core, above a delivery track from discovery to support.
        </desc>
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgb(255 255 255 / 0.12)" />
          </pattern>
          <clipPath id="coreClip">
            <circle cx="600" cy="260" r="64" />
          </clipPath>
        </defs>
        <rect width="1200" height="540" fill="url(#dots)" />

        {/* Rings */}
        <circle cx="600" cy="260" r="96" fill="none" stroke="rgb(255 255 255 / 0.35)" />
        <circle cx="600" cy="260" r="138" fill="none" stroke="rgb(255 255 255 / 0.18)" strokeDasharray="2 6" />
        <circle cx="600" cy="260" r="186" fill="none" stroke="rgb(255 255 255 / 0.08)" />
        <g className="origin-[600px_260px] motion-safe:animate-[spin_60s_linear_infinite]">
          <path d="M600 122 A138 138 0 0 1 738 260" fill="none" stroke="#e3161b" strokeWidth="2" />
          <circle cx="738" cy="260" r="3.5" fill="#e3161b" />
        </g>

        {/* Core: brand mark */}
        <image href="/brand/softinsight-mark-sm.webp" x="536" y="196" width="128" height="128" clipPath="url(#coreClip)" />
        <circle cx="600" cy="260" r="64" fill="none" stroke="rgb(255 255 255 / 0.9)" strokeWidth="1.5" />

        {/* Crosshair ticks */}
        {[0, 90, 180, 270].map((a) => (
          <line key={a} x1="600" y1="160" x2="600" y2="150" stroke="rgb(255 255 255 / 0.5)" transform={`rotate(${a} 600 260)`} />
        ))}

        {/* Routes */}
        {routes.map((d) => (
          <path key={d} d={d} fill="none" stroke="rgb(255 255 255 / 0.28)" strokeWidth="1.2" />
        ))}
        {routes.map((d, i) => (
          <path
            key={`s-${d}`}
            d={d}
            fill="none"
            stroke={i % 2 ? "#ffffff" : "#e3161b"}
            strokeWidth="2.4"
            strokeLinecap="square"
            className="signal-path"
            style={{ animationDelay: `${i * -0.8}s` }}
          />
        ))}
        {[
          [440, 94],
          [760, 94],
          [440, 378],
          [760, 378],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x - 3} y={y - 3} width="6" height="6" fill="#050d22" stroke="rgb(255 255 255 / 0.7)" />
        ))}

        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.label}>
            <rect x={n.x} y={n.y} width="220" height="96" fill="#0a1a3a" stroke="rgb(255 255 255 / 0.35)" />
            <path d={`M${n.x} ${n.y + 12} V${n.y} H${n.x + 12}`} fill="none" stroke="#fff" strokeWidth="2" />
            <path d={`M${n.x + 208} ${n.y + 96} H${n.x + 220} V${n.y + 84}`} fill="none" stroke="#fff" strokeWidth="2" />
            <NodeIcon kind={n.icon} x={n.x + 20} y={n.y + 20} />
            <text x={n.x + 20} y={n.y + 68} fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="13" letterSpacing="1.4">
              {n.label}
            </text>
            <text x={n.x + 20} y={n.y + 84} fill="rgb(167 176 196)" fontFamily="var(--font-geist-sans)" fontSize="11.5">
              {n.sub}
            </text>
          </g>
        ))}

        {/* Delivery track */}
        <line x1="60" y1="500" x2="1140" y2="500" stroke="rgb(255 255 255 / 0.25)" />
        {["DISCOVER", "DEFINE", "BUILD / SOURCE", "DEPLOY", "SUPPORT"].map((t, i) => {
          const x = 60 + i * 270;
          return (
            <g key={t}>
              <line x1={x} y1="494" x2={x} y2="506" stroke="rgb(255 255 255 / 0.6)" />
              <text
                x={x}
                y="526"
                fill="rgb(167 176 196)"
                fontFamily="var(--font-geist-mono)"
                fontSize="11"
                letterSpacing="1.4"
                textAnchor={i === 0 ? "start" : i === 4 ? "end" : "middle"}
              >
                {t}
              </text>
            </g>
          );
        })}
        <rect x="56" y="496" width="8" height="8" fill="#e3161b" className="track-dot" />
      </svg>

      {/* Mobile composition */}
      <svg viewBox="0 0 400 470" className="block h-auto w-full text-white md:hidden" role="img" aria-label="SoftInsight's four divisions connected to a single core">
        <defs>
          <pattern id="dots-m" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="rgb(255 255 255 / 0.12)" />
          </pattern>
          <clipPath id="coreClipM">
            <circle cx="200" cy="96" r="50" />
          </clipPath>
        </defs>
        <rect width="400" height="470" fill="url(#dots-m)" />
        <circle cx="200" cy="96" r="74" fill="none" stroke="rgb(255 255 255 / 0.3)" />
        <circle cx="200" cy="96" r="88" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeDasharray="2 6" />
        <image href="/brand/softinsight-mark-sm.webp" x="150" y="46" width="100" height="100" clipPath="url(#coreClipM)" />
        <circle cx="200" cy="96" r="50" fill="none" stroke="#fff" strokeWidth="1.5" />
        {["M200 170 V200 H104 V228", "M200 170 V200 H296 V228", "M200 200 V330 H104 V342", "M200 200 V330 H296 V342"].map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="rgb(255 255 255 / 0.28)" />
            <path d={d} fill="none" stroke={i % 2 ? "#fff" : "#e3161b"} strokeWidth="2" className="signal-path" style={{ animationDelay: `${i * -0.8}s` }} />
          </g>
        ))}
        {nodes.map((n, i) => {
          const x = i % 2 === 0 ? 14 : 206;
          const y = i < 2 ? 228 : 342;
          return (
            <g key={n.label}>
              <rect x={x} y={y} width="180" height="104" fill="#0a1a3a" stroke="rgb(255 255 255 / 0.35)" />
              <NodeIcon kind={n.icon} x={x + 16} y={y + 16} />
              <text x={x + 16} y={y + 68} fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="12" letterSpacing="1">
                {n.label.split(" / ")[0]}
              </text>
              <text x={x + 16} y={y + 86} fill="#fff" fontFamily="var(--font-geist-mono)" fontSize="12" letterSpacing="1">
                {n.label.split(" / ")[1]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
