# Digital Dark Spot

A complete website for an AI-assisted information gap detection platform. Visitors learn the problem, then use the working analyser: paste text from several sources and see what none of them say, where they disagree, which are old or undated, and what to verify next.

React 18 + Vite. No backend needed.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## The website

| Section | What it does |
|---|---|
| Navbar | Sticky, anchor links, mobile menu, light/dark theme toggle (remembered in the browser) |
| Hero | Glowing holographic interface. It tilts with the mouse, scans, and lights dots in sequence. Click a row to read what the scan found. Buttons jump to the analyser or run the scholarship example |
| Problem | Why scattered, old or conflicting information hurts decisions |
| How it works | Ask, add sources, analyse, verify |
| Features | Coverage map, conflict finder, recency warnings, unanswered questions, checklist, evidence labels |
| Use cases | Tabs for 7 topic types showing the key points checked for each. "Analyse a …" selects that type in the analyser |
| Evidence labels | Filter example findings by From source, Rule-based signal and Uncertain |
| Analyser | The working tool (below) |
| FAQ | Expandable answers, including limits |
| Footer | Reminder that results are signals to check |

Responsive down to phone width, keyboard focus is visible, and animation stops for people who prefer reduced motion.

## The analyser

Click **Load sample** (or the hero button) to run the scholarship example. It produces:

- a headline summary ("Potential gap… Possible conflict…")
- key information per source, quoted
- a coverage map of key points against sources (dark rows are dark spots)
- conflicting claims with both quotes and source names
- undated, old, earlier-cycle sources and passed deadlines
- unanswered questions, missing points, single-source points
- a prioritized tick-off checklist with copy button

Every item is tagged **From source** (quoted from the pasted text) or **Rule-based signal** (computed by the tool).

## Structure

```
src/
  main.jsx, App.jsx        page assembly, theme, hero/use-case commands to the analyser
  site/                    Navbar, Hero, Problem, HowItWorks, Features, UseCases,
                           Transparency, Analyser, Faq, Footer
  components/              analyser result sections (CoverageMap, Conflicts, Checklist, ...)
  analysis/                plain JS, no React: taxonomies, extract, recency, analyse, summary, sample
  services/fetchSources.js placeholder for URL fetching (needs a backend)
  styles.css               tokens, theme, analyser styles
  site.css                 website and hero styles
```

## How the analysis works

1. Each topic type has key points (scholarship: eligibility, income limit, deadline, documents, award, how to apply, renewal, and more) matched by keyword patterns.
2. A key point is covered by a source when a sentence matches. Points no source covers are gaps; points one source covers are single-source.
3. When two sources cover the same point, numbers, dates, listed documents and required-versus-not-required wording are compared. Differences become conflicts.
4. Source dates come from the date field or phrases like "updated…". Undated sources, sources over 12 months old, deadlines already passed and earlier application cycles (for example "2024-25") are flagged.
5. Findings are scored into a checklist: expired dates, conflicts, high-priority gaps, then single-source and undated items.

## Limits

- Rule-based, not a language model. It can miss wording it has no pattern for and can raise false alarms.
- It cannot open links; paste each source's text and use the URL as its name.
- Nothing is uploaded. Analysis runs in the browser.

## Next steps

- Implement `/api/fetch` for `services/fetchSources.js` to fetch URLs and permitted search results.
- Add a language model for extraction, summaries and contradiction detection, keeping the From source / Rule-based signal labels.
- Save analyses so a checklist can be revisited.
