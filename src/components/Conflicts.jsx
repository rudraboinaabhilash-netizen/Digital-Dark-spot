import { FromSource, Signal } from "./Tag.jsx";
import { quote } from "../analysis/extract.js";

export default function Conflicts({ r }) {
  const { S, cf } = r;
  return (
    <section>
      <h2>Conflicting claims</h2>
      <p className="sub">Sources that discuss the same point but give different numbers, dates, or requirements.</p>
      {cf.length ? (
        cf.map((c, i) => (
          <div className="card item" key={i}>
            <h3>{c.a.label} <Signal /></h3>
            <p className="sub" style={{ margin: "4px 0 0" }}>{c.why}</p>
            <div className="pair">
              <blockquote>{quote(c.qi)}<small><FromSource /> {S[c.i].l}</small></blockquote>
              <blockquote>{quote(c.qj)}<small><FromSource /> {S[c.j].l}</small></blockquote>
            </div>
          </div>
        ))
      ) : (
        <p className="empty">No conflicts found. This only checks numbers, dates, documents, and required versus not required, so read the sources too.</p>
      )}
    </section>
  );
}
