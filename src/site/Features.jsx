const F = [
  ["Coverage map", "A grid of key points against sources. Lit dots show what is covered. Dark rows are dark spots no source answers.", "var(--gp)"],
  ["Conflict finder", "Flags different numbers, dates and document lists, or one source saying required where another says not, with both quotes.", "var(--cf)"],
  ["Recency warnings", "Marks undated sources, sources older than a year, deadlines already passed, and pages about an earlier cycle such as 2024-25.", "var(--wn)"],
  ["Unanswered questions", "Turns gaps, conflicts and single-source claims into plain questions you still need answered.", "var(--ac)"],
  ["Verification checklist", "Ordered by risk to your decision, with progress tracking and one-click copy.", "var(--gr)"],
  ["Evidence labels", "Every item says whether it is quoted from a source or computed by the tool, so facts and guesses never blur.", "var(--mu)"],
];

export default function Features() {
  return (
    <section id="features" className="sec">
      <div className="in">
        <h2 className="h2">What you get</h2>
        <div className="grid3">
          {F.map(([t, d, c]) => (
            <div className="card fcard" style={{ borderTopColor: c }} key={t}><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}
