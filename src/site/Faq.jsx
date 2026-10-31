const Q = [
  ["Does it read websites for me?", "Not in this version. A browser page can’t read other sites, so you paste each source’s text and use its link as the name. The services folder holds a placeholder for a backend that fetches links and permitted search results."],
  ["Is the analysis done by AI?", "It uses keyword and pattern rules in your browser. Those findings are labelled as rule-based signals. A language model could be added behind the same labels for richer summaries and contradiction checks."],
  ["Can it tell me which source is right?", "No. It shows where sources differ and what to check, then points you to the latest official source. Treat results as things to verify, not verdicts."],
  ["Is my text sent anywhere?", "No. The analysis runs in your browser and nothing is uploaded."],
  ["What does it miss?", "Wording it has no pattern for, and conflicts that don’t involve numbers, dates, documents or required-versus-not-required wording. Read your sources as well."],
];

export default function Faq() {
  return (
    <section id="faq" className="sec alt">
      <div className="in narrow">
        <h2 className="h2">Questions</h2>
        {Q.map(([q, a]) => (
          <details key={q} className="faq"><summary>{q}</summary><p>{a}</p></details>
        ))}
      </div>
    </section>
  );
}
