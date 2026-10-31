const STEPS = [
  ["Ask", "Enter your question and pick the kind of decision: scholarship, job, course, public service, research or business."],
  ["Add sources", "Paste the text of each page or document you found, with its link as the name and its date if you know it."],
  ["Analyse", "The platform maps which key points each source covers, compares them, and checks dates and application cycles."],
  ["Verify", "Work through a prioritized checklist, starting with expired dates and conflicts, and tick items off as you confirm them."],
];

export default function HowItWorks() {
  return (
    <section id="how" className="sec alt">
      <div className="in">
        <h2 className="h2">From question to checklist in four steps</h2>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li className="card" key={t}><b className="num">{i + 1}</b><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
