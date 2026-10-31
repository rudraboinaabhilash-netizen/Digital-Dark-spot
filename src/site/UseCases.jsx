import { useState } from "react";
import Tag from "../components/Tag.jsx";
import { CATS } from "../analysis/taxonomies.js";

const LEVEL = { 3: ["Critical", { color: "var(--cf)" }], 2: ["Important", { color: "var(--wn)" }], 1: ["Helpful", { color: "var(--gr)" }] };

export default function UseCases({ onPick }) {
  const keys = Object.keys(CATS);
  const [k, setK] = useState("scholarship");
  const c = CATS[k];
  return (
    <section id="usecases" className="sec alt">
      <div className="in">
        <h2 className="h2">Built around the decisions people actually make</h2>
        <p className="sub">Each topic type checks a different set of key points. Pick one to see what the platform looks for.</p>
        <div className="tabs" role="tablist">
          {keys.map((x) => (
            <button type="button" role="tab" key={x} aria-selected={k === x} className="tab" onClick={() => setK(x)}>{CATS[x].n}</button>
          ))}
        </div>
        <div className="card" role="tabpanel">
          <ul className="plain kp">
            {c.a.map((a) => (
              <li key={a.id}><Tag style={LEVEL[a.p][1]}>{LEVEL[a.p][0]}</Tag> <b>{a.label}</b><span className="why">{a.hint}</span></li>
            ))}
          </ul>
          <div className="bar"><button type="button" className="go" onClick={() => onPick(k)}>Analyse a {c.n.toLowerCase()}</button></div>
        </div>
      </div>
    </section>
  );
}
