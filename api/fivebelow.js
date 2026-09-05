export default async function handler(req, res) {
  const query = req.query.q || "needoh";

  const url =
    "https://www.fivebelow.com/search?q=" +
    encodeURIComponent(query);

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const html = await response.text();

    const matches = [...html.matchAll(/NeeDoh[^<]{0,120}/gi)]
      .map(m => m[0].replace(/\s+/g, " ").trim())
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 20);

    res.status(200).json({
      retailer: "Five Below",
      search: query,
      found: matches.length,
      products: matches
    });
  } catch (error) {
    res.status(500).json({
      error: "Five Below search failed"
    });
  }
}
