import { useState } from "react";

const LINKS = [
  ["problem", "Problem"],
  ["how", "How it works"],
  ["features", "Features"],
  ["usecases", "Use cases"],
  ["trust", "Evidence labels"],
  ["faq", "FAQ"],
];

export default function Navbar({ onToggleTheme, dark }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav" aria-label="Main">
      <div className="nav-in">
        <a className="brand" href="#top" onClick={() => setOpen(false)}>
          <span className="orb" aria-hidden="true" />Digital Dark Spot
        </a>
        <button type="button" className="burger" aria-expanded={open} aria-controls="navlinks" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"}
        </button>
        <div id="navlinks" className={"links" + (open ? " open" : "")}>
          {LINKS.map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <button type="button" onClick={onToggleTheme} aria-label="Switch colour theme">{dark ? "Light mode" : "Dark mode"}</button>
          <a className="navcta" href="#analyser" onClick={() => setOpen(false)}>Try the analyser</a>
        </div>
      </div>
    </nav>
  );
}
