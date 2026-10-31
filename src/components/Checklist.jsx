import { useState } from "react";

const TIERS = [
  ["Do first", (p) => p >= 80],
  ["Do next", (p) => p >= 50 && p < 80],
  ["If time allows", (p) => p < 50],
];

export default function Checklist({ items, title }) {
  const [done, setDone] = useState({});
  const [label, setLabel] = useState("Copy checklist");
  const count = Object.values(done).filter(Boolean).length;
  const indexed = items.map((x, i) => ({ x, i }));

  async function copy() {
    const text =
      "Verification checklist: " + title + "\n" +
      items.map((x, i) => i + 1 + ". " + x.t + " - " + x.w).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setLabel("Copied");
    } catch {
      setLabel("Copy failed");
    }
  }

  return (
    <section>
      <h2>What to verify next</h2>
      <p className="sub">Ordered by risk to your decision.</p>
      <div className="prog"><i style={{ width: (items.length ? (100 * count) / items.length : 0) + "%" }} /></div>
      <span className="note">{count} of {items.length} checked</span>

      {items.length ? (
        TIERS.map(([name, test]) => {
          const list = indexed.filter((o) => test(o.x.p));
          if (!list.length) return null;
          return (
            <div key={name}>
              <div className="tier">{name}</div>
              {list.map((o) => (
                <label key={o.i} className={"chk" + (done[o.i] ? " done" : "")}>
                  <input type="checkbox" checked={!!done[o.i]} onChange={(e) => setDone({ ...done, [o.i]: e.target.checked })} />
                  <span className="t"><b>{o.x.t}</b><span className="why">{o.x.w}</span></span>
                </label>
              ))}
            </div>
          );
        })
      ) : (
        <p className="empty">Nothing flagged.</p>
      )}
      <div className="bar"><button type="button" onClick={copy}>{label}</button></div>
    </section>
  );
}
