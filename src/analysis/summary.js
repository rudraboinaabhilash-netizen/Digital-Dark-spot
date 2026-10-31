// Derived text for the dashboard: headline summary, open questions, headline numbers.
export function buildSummary(r) {
  const { S, gaps, cf } = r;
  const sm = [];
  if (gaps.length) sm.push("Potential gap: " + gaps.slice(0, 3).map((x) => x.a.label.toLowerCase()).join(", ") + " not found in the sources reviewed.");
  cf.slice(0, 2).forEach((c) => sm.push("Possible conflict on " + c.a.label.toLowerCase() + ": " + S[c.i].l + " and " + S[c.j].l + " differ."));
  S.forEach((s) => { if (s.cyc && s.cyc.old) sm.push("Possible earlier cycle: " + s.l + " refers to " + s.cyc.txt + "."); });
  sm.push("Verify using the latest official " + (r.off ? "notice" : "source") + ".");
  return sm;
}

export function buildQuestions(r) {
  const { S, gaps, cf, single } = r;
  return [
    ...gaps.map((x) => ({ t: "Where is the answer on " + x.a.label.toLowerCase() + "?", w: "No source says." })),
    ...cf.map((c) => ({ t: "Which source is right about " + c.a.label.toLowerCase() + "?", w: S[c.i].l + " vs " + S[c.j].l })),
    ...single.map((x) => ({ t: "Can " + x.a.label.toLowerCase() + " be confirmed by a second source?", w: "Only one source covers it." })),
  ];
}

export function buildStats(r) {
  const covered = (x) => x.h.filter((m) => m.length).length;
  const two = r.cov.filter((x) => covered(x) > 1).length;
  return {
    confirmedPct: Math.round((100 * two) / r.cov.length),
    gaps: r.gaps.length,
    conflicts: r.cf.length,
    stale: r.S.filter((s) => !s.dt || s.age > 12).length,
  };
}
