import type { DivisionSlug } from "@/content/divisions";

/**
 * Custom line-art illustrations for each division, drawn in the
 * blueprint language of the site. Scales cleanly at any size.
 */
export function DivisionGlyph({
  slug,
  tone = "light",
  className = "w-full h-auto",
}: {
  slug: DivisionSlug;
  tone?: "light" | "dark";
  className?: string;
}) {
  const ink = tone === "dark" ? "#ffffff" : "#071530";
  const faint = tone === "dark" ? "rgb(255 255 255 / 0.16)" : "rgb(7 21 48 / 0.12)";
  const mid = tone === "dark" ? "rgb(255 255 255 / 0.45)" : "rgb(7 21 48 / 0.4)";
  const red = "#e3161b";
  const blue = tone === "dark" ? "#7ea2e6" : "#19376f";
  const common = { fill: "none", stroke: ink, strokeWidth: 1.5 } as const;

  const grid = (
    <g stroke={faint} strokeWidth="1">
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" />
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
      ))}
    </g>
  );

  let body: React.ReactNode;
  switch (slug) {
    case "software-development":
      body = (
        <>
          <rect x="90" y="70" width="230" height="160" fill={tone === "dark" ? "#0a1a3a" : "#f6f5f1"} stroke={mid} strokeWidth="1.5" />
          <rect x="60" y="110" width="250" height="180" {...common} fill={tone === "dark" ? "#0a1a3a" : "#ffffff"} />
          <line x1="60" y1="134" x2="310" y2="134" stroke={ink} strokeWidth="1.5" />
          <circle cx="76" cy="122" r="3.5" fill={red} />
          <circle cx="90" cy="122" r="3.5" fill="none" stroke={ink} />
          <circle cx="104" cy="122" r="3.5" fill="none" stroke={ink} />
          {[
            [84, 160, 90],
            [100, 180, 120],
            [100, 200, 70],
            [116, 220, 100],
            [100, 240, 54],
            [84, 260, 40],
          ].map(([x, y, w], i) => (
            <line key={i} x1={x} y1={y} x2={x + w} y2={y} stroke={i === 2 ? red : blue} strokeWidth="5" strokeLinecap="round" />
          ))}
          <path d="M250 190 L232 208 L250 226 M282 190 L300 208 L282 226" fill="none" stroke={red} strokeWidth="2.5" />
          <rect x="200" y="300" width="130" height="50" {...common} fill={tone === "dark" ? "#050d22" : "#f6f5f1"} />
          <text x="214" y="331" fill={ink} fontFamily="var(--font-geist-mono)" fontSize="13" letterSpacing="1">API ⇄ DB</text>
          <path d="M185 290 V325 H200" fill="none" stroke={mid} strokeDasharray="3 4" />
        </>
      );
      break;
    case "it-infrastructure":
      body = (
        <>
          <rect x="70" y="80" width="110" height="250" {...common} fill={tone === "dark" ? "#0a1a3a" : "#ffffff"} />
          {Array.from({ length: 7 }, (_, i) => (
            <g key={i}>
              <rect x="82" y={96 + i * 32} width="86" height="22" fill="none" stroke={mid} />
              <circle cx="154" cy={107 + i * 32} r="3" fill={i === 3 ? red : "#11a139"} />
              <line x1="92" y1={107 + i * 32} x2="130" y2={107 + i * 32} stroke={blue} strokeWidth="3" />
            </g>
          ))}
          <path d="M180 140 H240 V100 H300 M180 205 H300 M180 270 H240 V310 H300" fill="none" stroke={ink} strokeWidth="1.5" />
          {[100, 205, 310].map((y, i) => (
            <g key={y}>
              <rect x="300" y={y - 18} width="50" height="36" {...common} fill={tone === "dark" ? "#050d22" : "#f6f5f1"} />
              <line x1="310" y1={y + 8} x2="340" y2={y + 8} stroke={i === 1 ? red : mid} strokeWidth="2" />
            </g>
          ))}
          <circle cx="240" cy="205" r="22" fill="none" stroke={red} strokeDasharray="4 4" />
          <circle cx="240" cy="205" r="5" fill={red} />
        </>
      );
      break;
    case "it-training":
      body = (
        <>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={70 + i * 66}
              y={290 - i * 56}
              width="66"
              height={50 + i * 56}
              fill={i === 3 ? (tone === "dark" ? "#19376f" : "#19376f") : tone === "dark" ? "#0a1a3a" : "#ffffff"}
              stroke={ink}
              strokeWidth="1.5"
            />
          ))}
          <path d="M70 290 L136 234 L202 178 L268 122 L330 70" fill="none" stroke={red} strokeWidth="2.5" />
          {[
            [136, 234],
            [202, 178],
            [268, 122],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="5" fill={tone === "dark" ? "#050d22" : "#f6f5f1"} stroke={red} strokeWidth="2" />
          ))}
          <path d="M318 62 L334 66 L328 82" fill="none" stroke={red} strokeWidth="2.5" />
          {["BASICS", "SKILLS", "PRACTICE", "MASTERY"].map((t, i) => (
            <text key={t} x={76 + i * 66} y="362" fill={mid} fontFamily="var(--font-geist-mono)" fontSize="10" letterSpacing="0.8">
              {t}
            </text>
          ))}
        </>
      );
      break;
    default:
      body = (
        <>
          <path d="M60 300 C 120 300, 120 140, 200 140 S 290 260, 340 110" fill="none" stroke={mid} strokeWidth="1.5" strokeDasharray="5 6" />
          {[
            [60, 300],
            [200, 140],
            [340, 110],
          ].map(([x, y], i) => (
            <g key={x}>
              <circle cx={x} cy={y} r={i === 2 ? 10 : 7} fill={i === 2 ? red : tone === "dark" ? "#050d22" : "#ffffff"} stroke={i === 2 ? red : ink} strokeWidth="1.5" />
              {i === 2 && <circle cx={x} cy={y} r="20" fill="none" stroke={red} strokeDasharray="3 4" />}
            </g>
          ))}
          <g transform="translate(150 220)">
            <path d="M60 0 L120 26 L60 52 L0 26 Z" {...common} fill={tone === "dark" ? "#0a1a3a" : "#ffffff"} />
            <path d="M0 26 V86 L60 112 V52 M120 26 V86 L60 112" {...common} />
            <path d="M30 13 L90 39 V55" fill="none" stroke={red} strokeWidth="2" />
            <path d="M60 52 V112" stroke={ink} strokeWidth="1.5" />
            <path d="M12 46 L48 62 M12 58 L48 74" stroke={blue} strokeWidth="3" />
          </g>
          <text x="40" y="330" fill={mid} fontFamily="var(--font-geist-mono)" fontSize="10" letterSpacing="0.8">ORIGIN</text>
          <text x="306" y="80" fill={ink} fontFamily="var(--font-geist-mono)" fontSize="10" letterSpacing="0.8">SITE</text>
        </>
      );
  }

  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden focusable="false">
      {grid}
      {body}
    </svg>
  );
}
