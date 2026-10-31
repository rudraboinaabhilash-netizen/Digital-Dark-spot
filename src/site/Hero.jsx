import { useState } from "react";

const ROWS = [
  { label: "Eligibility", cells: [1, 1, 1], note: "Covered by all 3 sources. You can cross-check it." },
  { label: "Application deadline", cells: [1, 0, 1], flag: "conflict", note: "Conflict: 15 Mar 2025 in the official notice, 30 Nov 2026 in the news report. One date has passed." },
  { label: "Documents required", cells: [1, 1, 1], flag: "conflict", note: "Conflict: the sources list different documents, and one says a certificate is not required." },
  { label: "Renewal conditions", cells: [0, 0, 0], flag: "dark", note: "Dark spot: none of the sources mention renewal. Ask the scholarship office." },
  { label: "Official application link", cells: [1, 0, 1], note: "Only 2 of 3 sources say where to apply. Confirm the link on the official site." },
];

export default function Hero({ onTry, onSample }) {
  const [sel, setSel] = useState(3);
  const [tilt, setTilt] = useState({ x: 4, y: -8 });

  function move(e) {
    const b = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    setTilt({ x: 4 - py * 10, y: -8 + px * 14 });
  }

  return (
    <header className="hero" id="top">
      <div className="hero-in">
        <div>
          <h1>Find what your sources leave out.</h1>
          <p>
            Search shows you pages and summaries shorten them. Digital Dark Spot shows what is missing, where sources
            disagree, which ones are out of date, and what to verify before you decide.
          </p>
          <div className="bar">
            <button type="button" className="btn-glow" onClick={onTry}>Try the analyser</button>
            <button type="button" className="btn-ghost" onClick={onSample}>Run the scholarship example</button>
          </div>
        </div>

        <div className="holo-wrap" onMouseMove={move} onMouseLeave={() => setTilt({ x: 4, y: -8 })}>
          <div className="holo" style={{ "--rx": tilt.x + "deg", "--ry": tilt.y + "deg" }}>
            <div className="holo-top"><i className="pulse" aria-hidden="true" />Scanning 3 sources about one scholarship</div>
            <div className="holo-cols" aria-hidden="true"><span /><span>Official</span><span>Blog</span><span>News</span></div>
            {ROWS.map((r, ri) => (
              <button
                type="button"
                key={r.label}
                className={"holo-row" + (sel === ri ? " sel" : "") + (r.flag === "dark" ? " darkrow" : "")}
                onClick={() => setSel(ri)}
                aria-pressed={sel === ri}
              >
                <span className="lab">{r.label}</span>
                {r.cells.map((c, ci) => (
                  <i key={ci} className={"hd" + (c ? " on" : "")} style={{ "--i": ri * 3 + ci }} />
                ))}
              </button>
            ))}
            <p className="holo-read" aria-live="polite">{ROWS[sel].note}</p>
          </div>
          <span className="chip c1">Possible conflict: documents</span>
          <span className="chip c2">Dark spot: renewal</span>
        </div>
      </div>
    </header>
  );
}
