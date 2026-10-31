import { useState, useEffect } from "react";
import SourceCard from "../components/SourceCard.jsx";
import Results from "../components/Results.jsx";
import { CATS } from "../analysis/taxonomies.js";
import { SAMPLE } from "../analysis/sample.js";
import { analyse } from "../analysis/analyse.js";

let uid = 1;
const mk = (x) => ({ id: uid++, l: (x && x.l) || "", d: (x && x.d) || "", t: (x && x.t) || "" });

export default function Analyser({ cmd }) {
  const [cat, setCat] = useState("scholarship");
  const [q, setQ] = useState("");
  const [src, setSrc] = useState([mk(), mk()]);
  const [res, setRes] = useState(null);

  useEffect(() => {
    if (res) document.getElementById("out")?.scrollIntoView({ behavior: "smooth" });
  }, [res]);

  useEffect(() => {
    if (!cmd) return;
    if (cmd.type === "sample") loadSample();
    else if (cmd.type === "cat") setCat(cmd.cat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cmd]);

  const update = (id, key, value) =>
    setSrc((list) => list.map((s) => (s.id === id ? { ...s, [key]: value } : s)));

  function go(c, sources, question) {
    if (!sources.some((s) => s.t.trim())) {
      alert("Paste text into at least one source first.");
      return;
    }
    setRes({
      r: analyse(c, sources),
      title: question.trim() || "Results for " + CATS[c].n.toLowerCase(),
      k: Date.now(),
    });
  }

  function loadSample() {
    const sources = SAMPLE.s.map((x) => mk(x));
    setCat(SAMPLE.cat);
    setQ(SAMPLE.q);
    setSrc(sources);
    go(SAMPLE.cat, sources, SAMPLE.q);
  }

  function clearAll() {
    setSrc([mk(), mk()]);
    setQ("");
    setRes(null);
  }

  return (
    <>
      <section className="wrap" style={{ marginTop: 0 }}>
        <div className="card">
          <div className="row">
            <div>
              <label htmlFor="cat">What are you researching?</label>
              <select id="cat" value={cat} onChange={(e) => setCat(e.target.value)}>
                {Object.keys(CATS).map((k) => (
                  <option key={k} value={k}>{CATS[k].n}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="q">Your question or goal</label>
              <input id="q" value={q} placeholder="What should I verify before applying?" onChange={(e) => setQ(e.target.value)} />
            </div>
          </div>

          {src.map((s) => (
            <SourceCard key={s.id} s={s} onChange={update} onRemove={() => setSrc(src.filter((x) => x.id !== s.id))} />
          ))}

          <div className="bar">
            <button type="button" onClick={() => setSrc([...src, mk()])}>Add source</button>
            <button type="button" onClick={loadSample}>Load sample</button>
            <button type="button" onClick={clearAll}>Clear all</button>
            <button type="button" className="go" onClick={() => go(cat, src, q)}>Find the dark spots</button>
          </div>
          <p className="note">
            Runs entirely in your browser using keyword and pattern rules. It can’t open links for you, so paste
            each source’s text and use the link as its label. Results are signals to check, not verdicts.
          </p>
        </div>
      </section>

      {res && <div className="wrap"><Results key={res.k} r={res.r} title={res.title} /></div>}
    </>
  );
}
