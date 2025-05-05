const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required!" });
  }
  const shortId = nanoid(8);

  await URL.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
  });

  return res.json({ id: shortId }); 
}

async function handleGetAnalytics(req, res) {
  const { id } = req.params;

  try {
    const result = await URL.findOne({ shortId: id });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found!" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
}