import StatsStrip from "./StatsStrip.jsx";
import SummaryCard from "./SummaryCard.jsx";
import KeyInfo from "./KeyInfo.jsx";
import CoverageMap from "./CoverageMap.jsx";
import Conflicts from "./Conflicts.jsx";
import Recency from "./Recency.jsx";
import Gaps from "./Gaps.jsx";
import Checklist from "./Checklist.jsx";

export default function Results({ r, title }) {
  return (
    <div id="out">
      <section>
        <h2>{title}</h2>
        <StatsStrip r={r} />
      </section>
      <SummaryCard r={r} />
      <KeyInfo r={r} />
      <CoverageMap r={r} />
      <Conflicts r={r} />
      <Recency r={r} />
      <Gaps r={r} />
      <Checklist items={r.items} title={title} />
    </div>
  );
}
