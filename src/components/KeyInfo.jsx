import { FromSource } from "./Tag.jsx";
import { quote } from "../analysis/extract.js";

export default function KeyInfo({ r }) {
  const rows = r.cov.filter((x) => x.h.some((m) => m.length));
  return (
    <section>
      <h2>Key information found</h2>
      <p className="sub">What your sources say about each key point, and where it came from.</p>
      {rows.map((x, i) => (
        <div className="card item" key={i}>
          <h3>{x.a.label}</h3>
          <ul className="plain">
            {x.h.map((m, si) =>
              m.length ? (
                <li key={si}><FromSource /> <b>{r.S[si].l}</b>: {quote(m[0])}</li>
              ) : null
            )}
          </ul>
        </div>
      ))}
    </section>
  );
}
