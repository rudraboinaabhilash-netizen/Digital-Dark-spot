import { useState, useEffect } from "react";
import Navbar from "./site/Navbar.jsx";
import Hero from "./site/Hero.jsx";
import Problem from "./site/Problem.jsx";
import HowItWorks from "./site/HowItWorks.jsx";
import Features from "./site/Features.jsx";
import UseCases from "./site/UseCases.jsx";
import Transparency from "./site/Transparency.jsx";
import Analyser from "./site/Analyser.jsx";
import Faq from "./site/Faq.jsx";
import Footer from "./site/Footer.jsx";

function readTheme() {
  try { return localStorage.getItem("dds-theme") || ""; } catch { return ""; }
}

export default function App() {
  const [theme, setTheme] = useState(readTheme);
  const [cmd, setCmd] = useState(null);

  useEffect(() => {
    const el = document.documentElement;
    if (theme) el.setAttribute("data-theme", theme); else el.removeAttribute("data-theme");
    try { theme ? localStorage.setItem("dds-theme", theme) : localStorage.removeItem("dds-theme"); } catch { /* storage unavailable */ }
  }, [theme]);

  const isDark = () =>
    theme ? theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  const toggleTheme = () => setTheme(isDark() ? "light" : "dark");

  const toAnalyser = () => document.getElementById("analyser")?.scrollIntoView({ behavior: "smooth" });
  const runSample = () => { setCmd({ type: "sample", k: Date.now() }); };
  const pickType = (cat) => { setCmd({ type: "cat", cat, k: Date.now() }); toAnalyser(); };

  return (
    <>
      <Navbar onToggleTheme={toggleTheme} dark={isDark()} />
      <Hero onTry={toAnalyser} onSample={runSample} />
      <Problem />
      <HowItWorks />
      <Features />
      <UseCases onPick={pickType} />
      <Transparency />
      <section id="analyser" className="sec">
        <div className="in">
          <h2 className="h2">Try it on your own sources</h2>
          <p className="sub">Choose a topic, paste text from two or more sources, and find the dark spots. Or load the scholarship example.</p>
        </div>
        <Analyser cmd={cmd} />
      </section>
      <Faq />
      <Footer />
    </>
  );
}
