import { Signal } from "./Tag.jsx";
import { buildSummary } from "../analysis/summary.js";

export default function SummaryCard({ r }) {
  return (
    <section style={{ marginTop: 14 }}>
      <div className="card">
        <div><Signal /></div>
        {buildSummary(r).map((t, i) => (
          <p key={i} style={{ margin: "8px 0 0" }}>{t}</p>
        ))}
      </div>
    </section>
  );
}
