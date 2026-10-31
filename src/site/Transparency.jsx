import { useState } from "react";
import Tag from "../components/Tag.jsx";

const EX = [
  { k: "k", tag: "From source", t: "“The last date to apply is 15 March 2025.”", w: "Official notice" },
  { k: "s", tag: "Rule-based signal", t: "That deadline may have passed.", w: "Computed from today’s date" },
  { k: "k", tag: "From source", t: "“An income certificate is not required for students above 80% marks.”", w: "College blog" },
  { k: "s", tag: "Rule-based signal", t: "Possible conflict on documents with the official notice.", w: "Computed by comparing the two sources" },
  { k: "u", tag: "Uncertain", t: "The blog has no date, so its details may be out of date.", w: "No date was given or found" },
];
const FILTERS = [["all", "All"], ["k", "From source"], ["s", "Rule-based signal"], ["u", "Uncertain"]];

export default function Transparency() {
  const [f, setF] = useState("all");
  const list = EX.filter((e) => f === "all" || e.k === f);
  return (
    <section id="trust" className="sec">
      <div className="in">
        <h2 className="h2">Facts, signals and doubts stay separate</h2>
        <p className="sub">Every finding carries a label. Filter this example to see how they differ.</p>
        <div className="tabs" role="group" aria-label="Filter examples">
          {FILTERS.map(([id, label]) => (
            <button type="button" key={id} className="tab" aria-pressed={f === id} aria-selected={f === id} onClick={() => setF(id)}>{label}</button>
          ))}
        </div>
        <div className="card">
          <ul className="plain">
            {list.map((e, i) => (
              <li key={i}><Tag k={e.k}>{e.tag}</Tag> <b>{e.t}</b><span className="why">{e.w}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
