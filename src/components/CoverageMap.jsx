import { useState } from "react";
import Tag, { FromSource, Signal } from "./Tag.jsx";
import { quote } from "../analysis/extract.js";

export default function CoverageMap({ r }) {
  const { S, cov } = r;
  const [ev, setEv] = useState(null);

  return (
    <section>
      <div className="panel">
        <h2>Coverage map</h2>
        <p className="sub">
          Each row is something a decision-maker needs. A lit dot means that source mentions it. Dark rows are
          dark spots. Select a dot to read the evidence.
        </p>
        <table className="m">
          <thead>
            <tr>
              <th></th>
              {S.map((s, i) => (
                <th key={i}>{i + 1 + ". " + (s.l.length > 26 ? s.l.slice(0, 24) + "…" : s.l)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cov.map((x, ri) => {
              const dark = !x.h.some((m) => m.length);
              return (
                <tr key={ri} className={dark ? "dark" : ""}>
                  <td>{x.a.label}{dark && <> <Tag k="s">dark spot</Tag></>}</td>
                  {x.h.map((m, si) => (
                    <td key={si}>
                      <button
                        type="button"
                        className={"cell" + (m.length ? " lit" : "")}
                        aria-label={x.a.label + " in source " + (si + 1) + ": " + (m.length ? "mentioned" : "not mentioned")}
                        onClick={() => setEv({ x, si, m })}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <p id="ev" aria-live="polite">
          {ev
            ? ev.m.length
              ? <><FromSource /> <b>{S[ev.si].l}</b>: {quote(ev.m[0])}</>
              : <><Signal /> <b>{S[ev.si].l}</b> does not appear to mention {ev.x.a.label.toLowerCase()}.</>
            : "Select a dot to see the source sentence."}
        </p>
        <p className="legend">
          <Tag k="k">From source</Tag> quoted from your text <Tag k="s">Rule-based signal</Tag> computed by this tool
        </p>
      </div>
    </section>
  );
}
