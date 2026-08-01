/**
 * ShriNeo illustration library — six families, one visual language.
 *
 * Rules for every figure in this file:
 *  - thin (1) and medium (1.75) line weights only
 *  - deep navy outlines, soft blue fills, warm neutral plate
 *  - mature green only for a confirmed state, muted amber only for guidance
 *  - flat vector, no 3D, no gradients inside diagrams, no coins
 *  - short labels only; every figure carries an accessible title
 */

const NAVY = "var(--brand-700)";
const NAVY_SOFT = "var(--brand-300)";
const BLUE = "var(--brand-500)";
const FILL_SOFT = "var(--brand-50)";
const FILL_MID = "var(--brand-100)";
const PLATE = "var(--surface-warm)";
const GREEN = "var(--success)";
const AMBER = "var(--warning)";
const MUTED = "var(--muted-foreground)";

type FigureProps = { className?: string | undefined; title?: string | undefined };

function Frame({
  title,
  viewBox,
  className,
  children,
}: {
  title: string;
  viewBox: string;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={title}
      className={className ?? "h-auto w-full"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

const microLabel = {
  fontSize: 9,
  letterSpacing: 0.8,
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
} as const;

const valueLabel = {
  fontSize: 11,
  fontFamily: "IBM Plex Mono, monospace",
} as const;

/* ------------------------------------------------ 1. Offer comparison */

export function CompareFigure({ className, title = "Three lender offers compared column by column, with one option selected" }: FigureProps) {
  const cols = [
    { x: 16, selected: false, bars: [26, 40, 18] },
    { x: 118, selected: true, bars: [34, 52, 24] },
    { x: 220, selected: false, bars: [20, 34, 14] },
  ];
  return (
    <Frame title={title} viewBox="0 0 320 200" className={className}>
      <rect x="0" y="0" width="320" height="200" rx="10" fill={PLATE} />
      {cols.map((col, i) => (
        <g key={i}>
          <rect
            x={col.x}
            y={20}
            width="84"
            height="160"
            rx="8"
            fill={col.selected ? FILL_MID : "#ffffff"}
            stroke={col.selected ? NAVY : "var(--border-strong)"}
            strokeWidth={col.selected ? 1.75 : 1}
          />
          <line x1={col.x + 12} y1={44} x2={col.x + 56} y2={44} stroke={NAVY} strokeWidth="1.75" />
          <line x1={col.x + 12} y1={56} x2={col.x + 44} y2={56} stroke={NAVY_SOFT} strokeWidth="1" />
          <line
            x1={col.x + 12}
            y1={72}
            x2={col.x + 72}
            y2={72}
            stroke="var(--border-strong)"
            strokeWidth="1"
          />
          {col.bars.map((w, b) => (
            <g key={b}>
              <rect
                x={col.x + 12}
                y={86 + b * 22}
                width={w}
                height="6"
                rx="3"
                fill={col.selected ? BLUE : NAVY_SOFT}
                opacity={col.selected ? 1 : 0.5}
              />
              <line
                x1={col.x + 12}
                y1={102 + b * 22}
                x2={col.x + 72}
                y2={102 + b * 22}
                stroke="var(--border)"
                strokeWidth="1"
              />
            </g>
          ))}
          {col.selected ? (
            <>
              <circle cx={col.x + 70} cy={34} r="7" fill={GREEN} opacity="0.14" />
              <path
                d={`M ${col.x + 66} 34 l 3 3 l 6 -6`}
                stroke={GREEN}
                strokeWidth="1.75"
              />
            </>
          ) : null}
        </g>
      ))}
      <text x="16" y="14" style={microLabel} fill={MUTED}>
        RATE · APR · EMI · TOTAL
      </text>
    </Frame>
  );
}

/* ------------------------------------------- 2. Financial cost breakdown */

export function CostBreakdownFigure({
  className,
  title = "Loan amount plus interest, fees and taxes forming the total repayment",
}: FigureProps) {
  const parts = [
    { label: "PRINCIPAL", w: 150, fill: FILL_MID, stroke: NAVY },
    { label: "INTEREST", w: 92, fill: FILL_SOFT, stroke: BLUE },
    { label: "FEE", w: 34, fill: "#ffffff", stroke: NAVY_SOFT },
    { label: "TAX", w: 18, fill: "#ffffff", stroke: AMBER },
  ];
  let x = 16;
  return (
    <Frame title={title} viewBox="0 0 320 200" className={className}>
      <rect x="0" y="0" width="320" height="200" rx="10" fill={PLATE} />
      <text x="16" y="22" style={microLabel} fill={MUTED}>
        WHAT YOU REPAY
      </text>
      {parts.map((part) => {
        const node = (
          <g key={part.label}>
            <rect
              x={x}
              y={34}
              width={part.w}
              height="30"
              rx="5"
              fill={part.fill}
              stroke={part.stroke}
              strokeWidth="1.25"
            />
            <text x={x + 8} y={53} style={microLabel} fill={NAVY}>
              {part.label}
            </text>
            <line x1={x} y1={72} x2={x} y2={82} stroke="var(--border-strong)" strokeWidth="1" />
          </g>
        );
        x += part.w + 6;
        return node;
      })}
      <line x1="16" y1="82" x2="304" y2="82" stroke="var(--border-strong)" strokeWidth="1" />
      <line x1="160" y1="82" x2="160" y2="96" stroke="var(--border-strong)" strokeWidth="1" />
      <rect x="96" y="96" width="128" height="30" rx="6" fill="#ffffff" stroke={NAVY} strokeWidth="1.75" />
      <text x="108" y="115" style={microLabel} fill={NAVY}>
        TOTAL REPAYMENT
      </text>

      <text x="16" y="146" style={microLabel} fill={MUTED}>
        MONTHLY EMI
      </text>
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={16 + i * 24}
          y={156}
          width="14"
          height="24"
          rx="3"
          fill={i < 4 ? FILL_MID : "#ffffff"}
          stroke={NAVY_SOFT}
          strokeWidth="1"
        />
      ))}
      <line x1="16" y1="186" x2="304" y2="186" stroke="var(--border-strong)" strokeWidth="1" />
    </Frame>
  );
}

/* ------------------------------------------------- 3. Direct fund flow */

export function FundFlowFigure({
  className,
  title = "Funds move from the participating lender directly to the borrower bank account, with ShriNeo supporting routing and tracking",
}: FigureProps) {
  return (
    <Frame title={title} viewBox="0 0 320 200" className={className}>
      <rect x="0" y="0" width="320" height="200" rx="10" fill={PLATE} />

      {/* lender */}
      <rect x="16" y="34" width="112" height="52" rx="8" fill="#ffffff" stroke={NAVY} strokeWidth="1.75" />
      <path d="M32 68 v-14 l16 -10 l16 10 v14" stroke={NAVY} strokeWidth="1.25" />
      <line x1="26" y1="68" x2="70" y2="68" stroke={NAVY} strokeWidth="1.25" />
      <text x="80" y="56" style={microLabel} fill={NAVY}>
        LENDER
      </text>
      <line x1="80" y1="64" x2="116" y2="64" stroke={NAVY_SOFT} strokeWidth="1" />

      {/* borrower */}
      <rect x="192" y="34" width="112" height="52" rx="8" fill="#ffffff" stroke={NAVY} strokeWidth="1.75" />
      <circle cx="216" cy="52" r="7" stroke={NAVY} strokeWidth="1.25" />
      <path d="M204 70 a12 12 0 0 1 24 0" stroke={NAVY} strokeWidth="1.25" />
      <text x="238" y="56" style={microLabel} fill={NAVY}>
        BORROWER
      </text>
      <line x1="238" y1="64" x2="286" y2="64" stroke={NAVY_SOFT} strokeWidth="1" />

      {/* direct transfer */}
      <line x1="132" y1="60" x2="182" y2="60" stroke={GREEN} strokeWidth="1.75" />
      <path d="M176 55 l6 5 l-6 5" stroke={GREEN} strokeWidth="1.75" />
      <text x="130" y="46" style={microLabel} fill={GREEN}>
        DISBURSAL
      </text>

      {/* shrineo support layer */}
      <line x1="72" y1="86" x2="72" y2="118" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="248" y1="86" x2="248" y2="118" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="3 3" />
      <rect x="16" y="118" width="288" height="62" rx="8" fill={FILL_SOFT} stroke={BLUE} strokeWidth="1" />
      <text x="28" y="138" style={microLabel} fill={NAVY}>
        SHRINEO SUPPORT LAYER
      </text>
      {["ROUTING", "TRACKING", "SUPPORT", "DOCUMENTS"].map((label, i) => (
        <g key={label}>
          <rect x={28 + i * 68} y={148} width="60" height="20" rx="4" fill="#ffffff" stroke={NAVY_SOFT} strokeWidth="1" />
          <text x={34 + i * 68} y={162} style={microLabel} fill={NAVY}>
            {label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* --------------------------------------------------- 4. Borrower journey */

export function JourneyFigure({
  className,
  title = "A single path from stating a need through comparing offers to tracking the lender response",
}: FigureProps) {
  const nodes = [
    { x: 30, actor: "you" },
    { x: 88, actor: "you" },
    { x: 146, actor: "shrineo" },
    { x: 204, actor: "you" },
    { x: 262, actor: "lender" },
  ];
  const tone = (actor: string) => (actor === "lender" ? NAVY_SOFT : actor === "shrineo" ? BLUE : NAVY);
  return (
    <Frame title={title} viewBox="0 0 320 140" className={className}>
      <rect x="0" y="0" width="320" height="140" rx="10" fill={PLATE} />
      <path d="M30 78 H262" stroke="var(--border-strong)" strokeWidth="1" />
      <path d="M30 78 H146" stroke={NAVY} strokeWidth="1.75" />
      {nodes.map((node, i) => (
        <g key={i}>
          <circle
            cx={node.x}
            cy={78}
            r="12"
            fill={i <= 2 ? "#ffffff" : "#ffffff"}
            stroke={tone(node.actor)}
            strokeWidth={i === 2 ? 1.75 : 1.25}
            strokeDasharray={node.actor === "lender" ? "3 3" : undefined}
          />
          <text x={node.x - 3} y={82} style={{ ...valueLabel, fontSize: 10 }} fill={tone(node.actor)}>
            {i + 1}
          </text>
          <line
            x1={node.x}
            y1={i % 2 === 0 ? 66 : 90}
            x2={node.x}
            y2={i % 2 === 0 ? 48 : 108}
            stroke="var(--border-strong)"
            strokeWidth="1"
          />
          <rect
            x={node.x - 22}
            y={i % 2 === 0 ? 30 : 108}
            width="44"
            height="18"
            rx="4"
            fill="#ffffff"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <line
            x1={node.x - 14}
            y1={i % 2 === 0 ? 39 : 117}
            x2={node.x + 8}
            y2={i % 2 === 0 ? 39 : 117}
            stroke={tone(node.actor)}
            strokeWidth="1.25"
          />
        </g>
      ))}
      <circle cx="290" cy="78" r="9" fill={GREEN} opacity="0.12" />
      <path d="M285 78 l4 4 l7 -8" stroke={GREEN} strokeWidth="1.75" />
    </Frame>
  );
}

/* ------------------------------------------ 5. Agent-assisted application */

export function AgentAssistFigure({
  className,
  title = "A borrower approves an OTP consent before a verified agent helps complete the application",
}: FigureProps) {
  return (
    <Frame title={title} viewBox="0 0 320 180" className={className}>
      <rect x="0" y="0" width="320" height="180" rx="10" fill={PLATE} />

      <rect x="16" y="30" width="96" height="120" rx="10" fill="#ffffff" stroke={NAVY} strokeWidth="1.75" />
      <text x="28" y="52" style={microLabel} fill={MUTED}>
        OTP CONSENT
      </text>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={28 + i * 20}
          y={62}
          width="14"
          height="18"
          rx="3"
          fill={i < 3 ? FILL_MID : "#ffffff"}
          stroke={i < 3 ? NAVY : "var(--border-strong)"}
          strokeWidth="1.25"
        />
      ))}
      <line x1="28" y1="96" x2="98" y2="96" stroke="var(--border)" strokeWidth="1" />
      <line x1="28" y1="106" x2="80" y2="106" stroke="var(--border)" strokeWidth="1" />
      <rect x="28" y="118" width="70" height="20" rx="4" fill={FILL_SOFT} stroke={BLUE} strokeWidth="1.25" />
      <text x="36" y="132" style={microLabel} fill={NAVY}>
        APPROVE
      </text>

      <line x1="112" y1="90" x2="150" y2="90" stroke={NAVY_SOFT} strokeWidth="1.25" strokeDasharray="4 3" />
      <path d="M144 85 l6 5 l-6 5" stroke={NAVY_SOFT} strokeWidth="1.25" />

      <circle cx="182" cy="62" r="14" stroke={NAVY} strokeWidth="1.5" fill="#ffffff" />
      <path d="M168 96 a14 16 0 0 1 28 0" stroke={NAVY} strokeWidth="1.5" />
      <circle cx="196" cy="50" r="7" fill={GREEN} opacity="0.14" />
      <path d="M192 50 l3 3 l6 -6" stroke={GREEN} strokeWidth="1.5" />
      <text x="160" y="118" style={microLabel} fill={NAVY}>
        VERIFIED AGENT
      </text>

      <rect x="228" y="42" width="76" height="96" rx="8" fill="#ffffff" stroke={NAVY} strokeWidth="1.25" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={240} y={58 + i * 26} width="20" height="16" rx="2" stroke={NAVY_SOFT} strokeWidth="1" />
          <line x1="266" y1={62 + i * 26} x2="292" y2={62 + i * 26} stroke="var(--border-strong)" strokeWidth="1" />
          <line x1="266" y1={70 + i * 26} x2="284" y2={70 + i * 26} stroke="var(--border)" strokeWidth="1" />
        </g>
      ))}
      <text x="240" y="152" style={microLabel} fill={MUTED}>
        FILES STAY IN SHRINEO
      </text>
    </Frame>
  );
}

/* ------------------------------------------------- 6. Data and consent */

export function ConsentFigure({
  className,
  title = "A consent screen showing purpose, data requested, recipient and duration before confirmation",
}: FigureProps) {
  const rows = ["PURPOSE", "DATA", "RECIPIENT", "DURATION"];
  return (
    <Frame title={title} viewBox="0 0 320 180" className={className}>
      <rect x="0" y="0" width="320" height="180" rx="10" fill={PLATE} />
      <rect x="16" y="20" width="200" height="144" rx="8" fill="#ffffff" stroke={NAVY} strokeWidth="1.75" />
      <text x="32" y="42" style={microLabel} fill={MUTED}>
        CONSENT REQUEST
      </text>
      <line x1="32" y1="50" x2="200" y2="50" stroke="var(--border)" strokeWidth="1" />
      {rows.map((row, i) => (
        <g key={row}>
          <text x="32" y={70 + i * 24} style={microLabel} fill={NAVY}>
            {row}
          </text>
          <line
            x1="104"
            y1={66 + i * 24}
            x2={188 - i * 12}
            y2={66 + i * 24}
            stroke={NAVY_SOFT}
            strokeWidth="1.25"
          />
          <line x1="32" y1={78 + i * 24} x2="200" y2={78 + i * 24} stroke="var(--border)" strokeWidth="1" />
        </g>
      ))}
      <rect x="32" y="128" width="72" height="22" rx="4" fill={FILL_MID} stroke={NAVY} strokeWidth="1.25" />
      <text x="42" y="143" style={microLabel} fill={NAVY}>
        ALLOW
      </text>
      <rect x="112" y="128" width="72" height="22" rx="4" fill="#ffffff" stroke="var(--border-strong)" strokeWidth="1" />
      <text x="126" y="143" style={microLabel} fill={MUTED}>
        DECLINE
      </text>

      <line x1="216" y1="92" x2="244" y2="92" stroke={NAVY_SOFT} strokeWidth="1.25" strokeDasharray="4 3" />
      <rect x="244" y="60" width="60" height="64" rx="8" fill={FILL_SOFT} stroke={BLUE} strokeWidth="1.25" />
      <circle cx="274" cy="86" r="12" fill="#ffffff" stroke={GREEN} strokeWidth="1.75" />
      <path d="M268 86 l4 4 l9 -9" stroke={GREEN} strokeWidth="1.75" />
      <text x="252" y="114" style={microLabel} fill={NAVY}>
        LOGGED
      </text>
      <text x="244" y="146" style={microLabel} fill={AMBER}>
        REVOCABLE
      </text>
    </Frame>
  );
}
