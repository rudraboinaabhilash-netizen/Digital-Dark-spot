import { buildStats } from "../analysis/summary.js";

export default function StatsStrip({ r }) {
  const s = buildStats(r);
  return (
    <div className="stats">
      <div className="stat k"><b>{s.confirmedPct}%</b><span>of key points confirmed by 2+ sources</span></div>
      <div className="stat g"><b>{s.gaps}</b><span>points no source covers</span></div>
      <div className="stat c"><b>{s.conflicts}</b><span>conflicting claims</span></div>
      <div className="stat w"><b>{s.stale}</b><span>undated or old sources</span></div>
    </div>
  );
}
