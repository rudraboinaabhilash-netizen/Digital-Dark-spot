import Tag from "./Tag.jsx";
import { fmt, quote } from "../analysis/extract.js";

const warn = { color: "var(--wn)" };
const bad = { color: "var(--cf)" };

export default function Recency({ r }) {
  const { S, exp } = r;
  return (
    <section>
      <h2>Recency</h2>
      <p className="sub">Source dates and deadlines that may have passed.</p>
      <ul className="plain">
        {S.map((s, i) => (
          <li key={i}>
            <b>{s.l}</b><br />
            {!s.dt ? (
              <><Tag style={warn}>undated</Tag> No date given or found.</>
            ) : s.age > 12 ? (
              <><Tag style={warn}>old</Tag> {fmt(s.dt.d)} ({s.dt.how}), about {Math.round(s.age)} months ago.</>
            ) : (
              <><Tag k="k">recent</Tag> {fmt(s.dt.d)} ({s.dt.how}).</>
            )}
            {s.cyc && s.cyc.old && <> <Tag style={warn}>earlier cycle</Tag> Mentions {s.cyc.txt}.</>}
          </li>
        ))}
        {exp.map((x, i) => (
          <li key={"e" + i}>
            <Tag style={bad}>date passed</Tag> <b>{S[x.i].l}</b> mentions {x.txt}: {quote(x.q)}
          </li>
        ))}
      </ul>
    </section>
  );
}
