const CARDS = [
  ["Scattered", "The facts you need sit on an official page, a college blog, a news story and a PDF. No single page has them all."],
  ["Old or conflicting", "Sources quote different amounts, deadlines and documents, and many carry no date at all."],
  ["Silent on what matters", "Pages describe how great something is and skip renewal rules, fine print, or how to actually apply."],
];

export default function Problem() {
  return (
    <section id="problem" className="sec">
      <div className="in">
        <h2 className="h2">Search finds pages. It doesn’t tell you what’s missing.</h2>
        <p className="sub">People decide on scholarships, jobs, courses, public services and purchases using information that is rarely complete.</p>
        <div className="grid3">
          {CARDS.map(([t, d]) => (
            <div className="card fcard" key={t}><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
        <div className="split">
          <div className="card">
            <h3>What a student finds</h3>
            <ul className="tick">
              <li>Eligibility rules</li><li>Award amount</li><li>A general description</li>
            </ul>
          </div>
          <div className="card miss">
            <h3>What they overlook</h3>
            <ul className="tick">
              <li>Renewal conditions</li><li>The current deadline</li><li>The official document list</li><li>The official application link</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
