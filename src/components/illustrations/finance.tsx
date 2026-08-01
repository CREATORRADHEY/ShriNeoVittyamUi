import { Arrow, Bar, Figure, Panel, Stage, ink } from "./figure";

/** 01 — Compare before you choose. Three offers aligned with cost breakdowns. */
export function CompareOffersArt({ className }: { className?: string }) {
  const cols = [20, 145, 270];
  const heights = [96, 116, 78];
  return (
    <Figure
      className={className}
      title="Comparing three loan offers side by side"
      desc="Three offer panels aligned on the same cost rows: interest rate, annual percentage rate, monthly instalment and total repayment."
    >
      <Panel x={8} y={16} w={384} h={228} fill={ink.surface} stroke={ink.line} r={14} />
      {cols.map((x, i) => (
        <g key={x}>
          <Panel x={x + 12} y={44} w={106} h={168} />
          <Bar x={x + 26} y={60} w={54} h={7} fill={ink.brandLight} />
          <rect x={x + 26} y={80} width={78} height={heights[i]! * 0.32} rx={4} fill={ink.softer} />
          <Bar x={x + 26} y={124} w={64} />
          <Bar x={x + 26} y={138} w={44} />
          <Bar x={x + 26} y={152} w={72} />
          <rect
            x={x + 26}
            y={174}
            width={78}
            height={22}
            rx={6}
            fill={i === 0 ? ink.softer : ink.surface}
            stroke={i === 0 ? ink.brand : ink.line}
            strokeWidth={i === 0 ? 1.5 : 1}
          />
        </g>
      ))}
      <line x1={20} y1={116} x2={380} y2={116} stroke={ink.line} strokeDasharray="3 5" />
      <line x1={20} y1={166} x2={380} y2={166} stroke={ink.line} strokeDasharray="3 5" />
    </Figure>
  );
}

/** 02 — Direct fund transfer, lender to borrower, ShriNeo as routing layer. */
export function DirectFundFlowArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="Loan funds move directly from the participating lender to the borrower's bank account"
      desc="A lender node connects by a solid line to a borrower bank account node. A separate routing and tracking layer sits below the line and does not touch the funds."
      viewBox="0 0 400 220"
    >
      <Panel x={16} y={44} w={128} h={78} fill={ink.card} />
      <circle cx={48} cy={72} r={12} fill={ink.softer} stroke={ink.brandLight} />
      <Bar x={70} y={66} w={58} h={7} fill={ink.brandLight} />
      <Bar x={34} y={96} w={92} />
      <Panel x={256} y={44} w={128} h={78} fill={ink.card} />
      <circle cx={288} cy={72} r={12} fill={ink.tealSoft} stroke={ink.teal} />
      <Bar x={310} y={66} w={58} h={7} fill={ink.teal} />
      <Bar x={274} y={96} w={92} />
      <Arrow x1={148} y1={80} x2={252} y2={80} color={ink.brand} />
      <Panel x={128} y={152} w={144} h={46} fill={ink.surface} />
      <Bar x={144} y={168} w={80} h={7} fill={ink.brandLight} />
      <Bar x={144} y={182} w={54} />
      <line x1={200} y1={100} x2={200} y2={150} stroke={ink.brandLight} strokeDasharray="4 4" />
    </Figure>
  );
}

/** 03 — Secure KYC: document, DigiLocker, camera and liveness in one workflow. */
export function SecureKycArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="Secure identity verification workflow"
      desc="An identity document, a digital locker source, a camera capture and a liveness check connect into a single verified profile."
      viewBox="0 0 400 220"
    >
      <Panel x={16} y={26} w={112} h={68} />
      <rect x={30} y={40} width={26} height={30} rx={4} fill={ink.softer} />
      <Bar x={64} y={44} w={48} />
      <Bar x={64} y={58} w={32} />
      <Panel x={16} y={122} w={112} h={68} />
      <circle cx={46} cy={156} r={14} fill={ink.softer} stroke={ink.brandLight} />
      <Bar x={70} y={146} w={44} />
      <Bar x={70} y={160} w={30} />
      <Arrow x1={134} y1={60} x2={186} y2={96} />
      <Arrow x1={134} y1={156} x2={186} y2={120} />
      <Panel x={192} y={72} w={94} h={72} fill={ink.softer} stroke={ink.brand} />
      <path
        d="M239 92 l20 9 v14 c0 12-9 20-20 24-11-4-20-12-20-24v-14z"
        fill={ink.card}
        stroke={ink.brand}
        strokeWidth={1.5}
      />
      <Arrow x1={292} y1={108} x2={336} y2={108} color={ink.teal} />
      <circle cx={362} cy={108} r={20} fill={ink.tealSoft} stroke={ink.teal} strokeWidth={1.5} />
      <path
        d="M353 108 l6 6 12-13"
        fill="none"
        stroke={ink.teal}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </Figure>
  );
}

/** 04 — Purpose-specific consent: data, purpose, recipient, duration. */
export function ConsentArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="Reviewing what data is shared, why, with whom and for how long"
      desc="A consent panel lists four review rows, each with a checkbox, above a confirm action."
      viewBox="0 0 400 230"
    >
      <Panel x={60} y={16} w={280} h={198} />
      <Bar x={80} y={38} w={110} h={8} fill={ink.brandLight} />
      {[70, 104, 138, 172].map((y, i) => (
        <g key={y}>
          <rect
            x={80}
            y={y}
            width={16}
            height={16}
            rx={4}
            fill={i < 3 ? ink.softer : ink.card}
            stroke={i < 3 ? ink.brand : ink.line}
            strokeWidth={1.4}
          />
          {i < 3 ? (
            <path
              d="M84 78 l3 3 6-7"
              transform={`translate(0 ${y - 70})`}
              fill="none"
              stroke={ink.brand}
              strokeWidth={2}
              strokeLinecap="round"
            />
          ) : null}
          <Bar x={108} y={y + 1} w={i === 3 ? 120 : 170} />
          <Bar x={108} y={y + 13} w={i === 3 ? 74 : 110} h={5} fill={ink.surface} />
        </g>
      ))}
      <rect x={80} y={196} width={0} height={0} />
    </Figure>
  );
}

/** 05 — Account Aggregator: banks connect through a consent-controlled layer. */
export function AccountAggregatorArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="Bank accounts shared through a consent-controlled data layer"
      desc="Three bank nodes connect into a consent layer, which passes a limited, time-bound data view to the lending workflow."
      viewBox="0 0 400 220"
    >
      {[26, 88, 150].map((y) => (
        <g key={y}>
          <Panel x={12} y={y} w={92} h={44} />
          <rect x={26} y={y + 14} width={16} height={16} rx={3} fill={ink.softer} />
          <Bar x={50} y={y + 16} w={40} />
          <Arrow x1={108} y1={y + 22} x2={150} y2={110} dashed />
        </g>
      ))}
      <Panel x={152} y={78} w={96} h={64} fill={ink.softer} stroke={ink.brand} />
      <path
        d="M200 96 l16 7 v11c0 10-7 16-16 19-9-3-16-9-16-19v-11z"
        fill={ink.card}
        stroke={ink.brand}
        strokeWidth={1.5}
      />
      <Arrow x1={252} y1={110} x2={296} y2={110} color={ink.brand} />
      <Panel x={300} y={68} w={88} h={84} />
      <Bar x={314} y={86} w={54} h={7} fill={ink.brandLight} />
      <Bar x={314} y={104} w={60} />
      <Bar x={314} y={118} w={44} />
      <Bar x={314} y={132} w={52} />
    </Figure>
  );
}

/** 06 — CIBIL bureau score vs SNV Trust Score: two distinct systems. */
export function DualScoreArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A bureau credit score and a cash-flow based trust indicator shown as two different systems"
      desc="On the left, an arc gauge represents a bureau score from three hundred to nine hundred. On the right, a bar series represents cash-flow and repayment behaviour signals."
      viewBox="0 0 400 210"
    >
      <Panel x={12} y={20} w={176} h={170} fill={ink.surface} />
      <path
        d="M52 140 a48 48 0 0 1 96 0"
        fill="none"
        stroke={ink.soft}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <path
        d="M52 140 a48 48 0 0 1 74 -37"
        fill="none"
        stroke={ink.brand}
        strokeWidth={12}
        strokeLinecap="round"
      />
      <Bar x={62} y={158} w={76} h={7} fill={ink.brandLight} />
      <Panel x={212} y={20} w={176} h={170} fill={ink.surface} />
      {[
        [0, 38],
        [1, 56],
        [2, 30],
        [3, 68],
        [4, 48],
      ].map(([i, h]) => (
        <rect
          key={i}
          x={238 + i! * 28}
          y={140 - h!}
          width={16}
          height={h}
          rx={4}
          fill={i! % 2 === 0 ? ink.teal : ink.brandLight}
        />
      ))}
      <line x1={232} y1={142} x2={368} y2={142} stroke={ink.line} />
      <Bar x={238} y={158} w={92} h={7} fill={ink.teal} />
    </Figure>
  );
}

/** 07 — Review the complete loan cost. */
export function LoanCostArt({ className }: { className?: string }) {
  const segs = [
    { w: 176, fill: ink.brand },
    { w: 96, fill: ink.brandLight },
    { w: 40, fill: ink.amber },
    { w: 24, fill: ink.teal },
  ];
  let x = 24;
  return (
    <Figure
      className={className}
      title="The total repayment split into principal, interest, processing fee and taxes"
      desc="A single horizontal bar divided into four proportional segments, above a stack of monthly instalment blocks."
      viewBox="0 0 400 200"
    >
      <Panel x={12} y={16} w={376} h={168} fill={ink.surface} />
      {segs.map((s, i) => {
        const rect = (
          <rect key={i} x={x} y={48} width={s.w} height={30} rx={i === 0 ? 8 : 4} fill={s.fill} />
        );
        x += s.w + 4;
        return rect;
      })}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x={24 + i * 29}
          y={112}
          width={20}
          height={40}
          rx={4}
          fill={ink.card}
          stroke={ink.line}
        />
      ))}
      <line x1={24} y1={160} x2={372} y2={160} stroke={ink.line} />
    </Figure>
  );
}

/** 08 — Human review of a system recommendation. */
export function HumanReviewArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A system recommendation passed to a lender professional for the final decision"
      desc="An automated analysis panel connects by an arrow to a reviewer, who holds the approve or decline outcome."
      viewBox="0 0 400 200"
    >
      <Panel x={16} y={38} w={140} h={124} />
      <Bar x={34} y={58} w={70} h={7} fill={ink.brandLight} />
      <Bar x={34} y={80} w={104} />
      <Bar x={34} y={94} w={86} />
      <Bar x={34} y={108} w={96} />
      <rect x={34} y={128} width={64} height={18} rx={5} fill={ink.softer} />
      <Arrow x1={162} y1={100} x2={214} y2={100} />
      <circle cx={264} cy={70} r={18} fill={ink.softer} stroke={ink.brandLight} strokeWidth={1.5} />
      <path
        d="M238 152 a26 26 0 0 1 52 0z"
        fill={ink.softer}
        stroke={ink.brandLight}
        strokeWidth={1.5}
      />
      <Panel x={306} y={58} w={78} h={84} fill={ink.tealSoft} stroke={ink.teal} />
      <path
        d="M330 100 l9 9 18-20"
        fill="none"
        stroke={ink.teal}
        strokeWidth={2.4}
        strokeLinecap="round"
      />
    </Figure>
  );
}

/** 09 — Agent-assisted application with borrower OTP consent. */
export function AgentAssistArt({ className }: { className?: string }) {
  return (
    <Figure
      className={className}
      title="A verified agent assisting a borrower after the borrower confirms consent by one-time password"
      desc="A borrower and a verified agent are linked through a consent gate; documents stay inside a secured workspace."
      viewBox="0 0 400 210"
    >
      <circle cx={58} cy={72} r={19} fill={ink.softer} stroke={ink.brandLight} strokeWidth={1.5} />
      <path
        d="M30 132 a28 28 0 0 1 56 0z"
        fill={ink.softer}
        stroke={ink.brandLight}
        strokeWidth={1.5}
      />
      <circle cx={342} cy={72} r={19} fill={ink.tealSoft} stroke={ink.teal} strokeWidth={1.5} />
      <path d="M314 132 a28 28 0 0 1 56 0z" fill={ink.tealSoft} stroke={ink.teal} strokeWidth={1.5} />
      <circle cx={356} cy={54} r={7} fill={ink.teal} />
      <Panel x={132} y={54} w={136} h={100} fill={ink.surface} stroke={ink.brand} />
      <rect x={152} y={74} width={96} height={22} rx={6} fill={ink.card} stroke={ink.line} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={158 + i * 22} y={80} width={12} height={10} rx={2} fill={ink.brandLight} />
      ))}
      <Bar x={152} y={112} w={96} />
      <Bar x={152} y={126} w={66} />
      <Arrow x1={94} y1={100} x2={126} y2={100} />
      <Arrow x1={274} y1={100} x2={306} y2={100} color={ink.teal} />
    </Figure>
  );
}

/** 10 — Application tracking timeline. */
export function TrackingArt({ className }: { className?: string }) {
  const stages = [40, 118, 196, 274, 352];
  return (
    <Figure
      className={className}
      title="Application progress from submission to disbursal"
      desc="Five numbered stages joined along a horizontal track: submitted, documents verified, lender review, approved and disbursed."
      viewBox="0 0 400 150"
    >
      <line x1={40} y1={70} x2={352} y2={70} stroke={ink.line} strokeWidth={2} />
      <line x1={40} y1={70} x2={196} y2={70} stroke={ink.brand} strokeWidth={2} />
      {stages.map((x, i) => (
        <g key={x}>
          <Stage cx={x} cy={70} n={i + 1} />
          <rect
            x={x - 26}
            y={96}
            width={52}
            height={7}
            rx={3.5}
            fill={i <= 2 ? ink.brandLight : ink.soft}
          />
        </g>
      ))}
    </Figure>
  );
}
