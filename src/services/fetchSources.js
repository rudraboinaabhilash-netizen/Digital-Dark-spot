// Placeholder for the next step: collecting sources automatically.
// Browsers cannot read other websites directly (CORS), so this needs a small backend,
// for example a serverless function that fetches a URL and returns its readable text.
//
// Expected shape: POST /api/fetch { url } -> { url, title, text, publishedAt? }
export async function fetchSource(url) {
  const res = await fetch("/api/fetch", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) throw new Error("Could not fetch " + url);
  return res.json();
}
