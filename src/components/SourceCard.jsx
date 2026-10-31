export default function SourceCard({ s, onChange, onRemove }) {
  return (
    <div className="card src">
      <div className="head">
        <div>
          <label>Source name or link</label>
          <input value={s.l} placeholder="example.org/page" onChange={(e) => onChange(s.id, "l", e.target.value)} />
        </div>
        <div>
          <label>Date on page (optional)</label>
          <input type="date" value={s.d} onChange={(e) => onChange(s.id, "d", e.target.value)} />
        </div>
        <button type="button" onClick={onRemove}>Remove</button>
      </div>
      <label>Pasted text</label>
      <textarea value={s.t} placeholder="Paste the relevant text from this source" onChange={(e) => onChange(s.id, "t", e.target.value)} />
    </div>
  );
}
