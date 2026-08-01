import { Arrow, Bar, Figure, Panel, Stage, ink } from "./figure";

/** 11 — Home loan journey across a long tenure. */
export function HomeJourneyArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="The home loan journey from property selection to disbursal and long-term repayment"
      desc="A house outline on the left, then five numbered stages along a track that continues into a repayment horizon."
      viewBox="0 0 400 190"
    >
      <path
        d="M22 96 L62 62 L102 96 v46 a4 4 0 0 1-4 4 H26 a4 4 0 0 1-4-4z"
        fill={ink.softer}
        stroke={ink.brand}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect x={52} y={112} width={20} height={34} rx={2} fill={ink.card} stroke={ink.brandLight} />
      <line x1={124} y1={104} x2={378} y2={104} stroke={ink.line} strokeWidth={2} />
      <line x1={124} y1={104} x2={252} y2={104} stroke={ink.brand} strokeWidth={2} />
      {[140, 196, 252, 308, 364].map((x, i) => (
        <g key={x}>
          <Stage cx={x} cy={104} n={i + 1} />
          <rect x={x - 22} y={128} width={44} height={6} rx={3} fill={i < 3 ? ink.brandLight : ink.soft} />
        </g>
      ))}
    </Figure>
  );
}

/** 12 — Business working-capital cycle. */
export function CashFlowCycleArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="The working capital cycle of a small business"
      desc="A circular flow linking stock purchase, sales inflow, operating expenses and loan repayment, with a funding gap highlighted."
      viewBox="0 0 400 230"
    >
      <circle
        cx={200}
        cy={116}
        r={78}
        fill="none"
        stroke={ink.line}
        strokeWidth={2}
        strokeDasharray="6 6"
      />
      {[
        [200, 26],
        [290, 116],
        [200, 206],
        [110, 116],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <rect
            x={cx! - 46}
            y={cy! - 20}
            width={92}
            height={40}
            rx={10}
            fill={i === 3 ? ink.amberSoft : ink.card}
            stroke={i === 3 ? ink.amber : ink.line}
            strokeWidth={1.4}
          />
          <Bar x={cx! - 32} y={cy! - 8} w={64} h={6} fill={i === 3 ? ink.amber : ink.brandLight} />
          <Bar x={cx! - 32} y={cy! + 4} w={42} h={5} fill={ink.soft} />
        </g>
      ))}
      <Arrow x1={252} y1={54} x2={266} y2={74} />
      <Arrow x1={266} y1={158} x2={250} y2={176} />
      <Arrow x1={148} y1={176} x2={132} y2={158} />
      <Arrow x1={134} y1={74} x2={150} y2={54} />
    </Figure>
  );
}

/** 13 — Mortgage / loan against property: pledged asset supporting a goal. */
export function MortgageArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A property offered as security while the borrowed funds support a separate financial goal"
      desc="A property block on the left is linked by a charge marker to a funding panel on the right, with a responsibility note area below."
      viewBox="0 0 400 200"
    >
      <Panel x={18} y={38} w={132} h={124} fill={ink.surface} />
      <path
        d="M52 96 L84 70 L116 96 v40 H52z"
        fill={ink.card}
        stroke={ink.brand}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <rect x={76} y={110} width={16} height={26} rx={2} fill={ink.softer} />
      <g>
        <line x1={156} y1={100} x2={244} y2={100} stroke={ink.brand} strokeWidth={1.5} />
        <rect x={182} y={84} width={36} height={32} rx={8} fill={ink.softer} stroke={ink.brand} />
        <path
          d="M194 96 v-4 a6 6 0 0 1 12 0 v4"
          fill="none"
          stroke={ink.brand}
          strokeWidth={1.6}
        />
        <rect x={192} y={96} width={16} height={13} rx={3} fill={ink.brand} />
      </g>
      <Panel x={250} y={38} w={132} h={124} />
      <Bar x={268} y={60} w={72} h={7} fill={ink.brandLight} />
      <Bar x={268} y={82} w={96} />
      <Bar x={268} y={96} w={80} />
      <rect x={268} y={116} width={96} height={28} rx={6} fill={ink.softer} />
    </Figure>
  );
}

/** 14 — Responsible repayment: schedule, reminder, payment, confirmation. */
export function RepaymentArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A repayment schedule with reminders, payment and confirmation"
      desc="A grid of monthly instalment blocks, with completed months filled, an upcoming month highlighted and a confirmation marker."
      viewBox="0 0 400 200"
    >
      <Panel x={16} y={20} w={244} h={160} fill={ink.surface} />
      {Array.from({ length: 18 }).map((_, i) => {
        const col = i % 6;
        const row = Math.floor(i / 6);
        const done = i < 8;
        const next = i === 8;
        return (
          <rect
            key={i}
            x={34 + col * 36}
            y={46 + row * 44}
            width={28}
            height={28}
            rx={6}
            fill={done ? ink.brand : next ? ink.amberSoft : ink.card}
            stroke={next ? ink.amber : ink.line}
            strokeWidth={next ? 1.8 : 1}
          />
        );
      })}
      <Panel x={276} y={52} w={108} h={96} />
      <circle cx={330} cy={92} r={20} fill={ink.tealSoft} stroke={ink.teal} strokeWidth={1.5} />
      <path d="M321 92 l6 6 12-13" fill="none" stroke={ink.teal} strokeWidth={2.2} strokeLinecap="round" />
      <Bar x={298} y={126} w={64} />
    </Figure>
  );
}

/** 15 — Cooling-off window with a borrower-controlled cancellation path. */
export function CoolingOffArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A defined cooling-off window during which the borrower can exit the loan"
      desc="A timeline with a shaded window between signing and the deadline, and a borrower-controlled exit branch inside that window."
      viewBox="0 0 400 180"
    >
      <rect x={70} y={54} width={150} height={44} rx={8} fill={ink.softer} />
      <line x1={30} y1={76} x2={376} y2={76} stroke={ink.line} strokeWidth={2} />
      <Stage cx={70} cy={76} n={1} />
      <Stage cx={220} cy={76} n={2} />
      <circle cx={340} cy={76} r={8} fill={ink.card} stroke={ink.line} strokeWidth={2} />
      <Arrow x1={145} y1={98} x2={145} y2={142} color={ink.amber} />
      <rect x={104} y={142} width={82} height={26} rx={8} fill={ink.amberSoft} stroke={ink.amber} />
      <Bar x={116} y={152} w={58} h={6} fill={ink.amber} />
    </Figure>
  );
}

/** 16 — Key Fact Statement anatomy. */
export function KfsArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A Key Fact Statement listing the loan's financial terms"
      desc="A document with a header block and paired label and value rows for amount, rate, annual percentage rate, fees, instalment and total repayment, plus a signature area."
      viewBox="0 0 400 240"
    >
      <Panel x={92} y={12} w={216} h={216} />
      <rect x={92} y={12} width={216} height={38} rx={10} fill={ink.softer} />
      <Bar x={112} y={26} w={96} h={8} fill={ink.brand} />
      {[68, 96, 124, 152, 180].map((y, i) => (
        <g key={y}>
          <Bar x={112} y={y} w={84} />
          <Bar x={216} y={y} w={i === 4 ? 72 : 54} h={6} fill={i === 4 ? ink.brand : ink.brandLight} />
          <line x1={112} y1={y + 16} x2={288} y2={y + 16} stroke={ink.line} strokeDasharray="2 4" />
        </g>
      ))}
      <rect x={216} y={200} width={72} height={16} rx={4} fill={ink.tealSoft} stroke={ink.teal} />
    </Figure>
  );
}

/** 17 — Agent commission lifecycle. */
export function CommissionArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="The agent commission lifecycle from disbursal through deductions to payout"
      desc="Five sequential blocks: disbursal, commission earned, tax deducted at source, hold or clawback check, and payout."
      viewBox="0 0 400 160"
    >
      {[16, 94, 172, 250, 328].map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y={48}
            width={56}
            height={56}
            rx={12}
            fill={i === 3 ? ink.amberSoft : ink.card}
            stroke={i === 3 ? ink.amber : ink.line}
            strokeWidth={1.4}
          />
          <Stage cx={x + 28} cy={64} n={i + 1} />
          <Bar x={x + 12} y={84} w={32} h={5} fill={i === 3 ? ink.amber : ink.brandLight} />
          {i < 4 ? <Arrow x1={x + 60} y1={76} x2={x + 90} y2={76} /> : null}
        </g>
      ))}
    </Figure>
  );
}

/** 18 — Fraud signals reviewed and resolved by a person. */
export function FraudReviewArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="Risk signals escalated for evidence review and human resolution"
      desc="Signal markers feed a review queue panel, which connects to an evidence panel and a resolution outcome."
      viewBox="0 0 400 200"
    >
      {[36, 84, 132].map((y, i) => (
        <g key={y}>
          <circle cx={38} cy={y} r={12} fill={i === 1 ? ink.amberSoft : ink.surface} stroke={i === 1 ? ink.amber : ink.line} />
          <Bar x={58} y={y - 3} w={46} h={6} fill={i === 1 ? ink.amber : ink.soft} />
          <Arrow x1={112} y1={y} x2={150} y2={92} dashed />
        </g>
      ))}
      <Panel x={154} y={44} w={104} h={106} />
      <Bar x={170} y={64} w={58} h={7} fill={ink.brandLight} />
      <Bar x={170} y={84} w={72} />
      <Bar x={170} y={98} w={54} />
      <Bar x={170} y={112} w={66} />
      <Arrow x1={264} y1={96} x2={300} y2={96} />
      <Panel x={304} y={62} w={80} h={70} fill={ink.tealSoft} stroke={ink.teal} />
      <path d="M328 98 l9 9 18-20" fill="none" stroke={ink.teal} strokeWidth={2.2} strokeLinecap="round" />
    </Figure>
  );
}

/** 19 — Privacy and data control: who accessed what, when and why. */
export function PrivacyControlArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A record of which data was accessed, by whom, when and for what purpose"
      desc="An access log panel with timestamped rows, each with a revoke control, beside a data-control shield."
      viewBox="0 0 400 210"
    >
      <Panel x={16} y={20} w={236} h={170} />
      {[48, 84, 120, 156].map((y, i) => (
        <g key={y}>
          <circle cx={40} cy={y} r={7} fill={i === 0 ? ink.softer : ink.surface} stroke={ink.brandLight} />
          <Bar x={58} y={y - 8} w={96} />
          <Bar x={58} y={y + 2} w={64} h={5} fill={ink.surface} />
          <rect x={186} y={y - 10} width={48} height={20} rx={6} fill={ink.card} stroke={ink.line} />
        </g>
      ))}
      <path
        d="M320 40 l50 20 v42c0 32-24 50-50 60-26-10-50-28-50-60V60z"
        fill={ink.softer}
        stroke={ink.brand}
        strokeWidth={1.6}
      />
      <path d="M304 106 l12 12 24-26" fill="none" stroke={ink.brand} strokeWidth={2.4} strokeLinecap="round" />
    </Figure>
  );
}

/** 20 — Neo guidance: explains terms and next steps, never decides. */
export function NeoGuidanceArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A guidance assistant explaining financial terms and next steps"
      desc="A conversation panel with alternating question and answer bubbles beside a note that lending decisions remain with the lender."
      viewBox="0 0 400 220"
    >
      <Panel x={30} y={16} w={266} h={188} fill={ink.surface} />
      <rect x={48} y={40} width={148} height={34} rx={12} fill={ink.card} stroke={ink.line} />
      <Bar x={62} y={53} w={104} />
      <rect x={112} y={86} width={166} height={44} rx={12} fill={ink.softer} stroke={ink.brandLight} />
      <Bar x={128} y={98} w={132} h={6} fill={ink.brandLight} />
      <Bar x={128} y={112} w={96} h={6} fill={ink.brandLight} />
      <rect x={48} y={142} width={126} height={34} rx={12} fill={ink.card} stroke={ink.line} />
      <Bar x={62} y={155} w={84} />
      <circle cx={340} cy={110} r={26} fill={ink.tealSoft} stroke={ink.teal} strokeWidth={1.5} />
      <circle cx={332} cy={106} r={3.4} fill={ink.teal} />
      <circle cx={348} cy={106} r={3.4} fill={ink.teal} />
      <path d="M330 120 a12 10 0 0 0 20 0" fill="none" stroke={ink.teal} strokeWidth={2} strokeLinecap="round" />
    </Figure>
  );
}
