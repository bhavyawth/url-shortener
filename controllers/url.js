const { nanoid } = require('nanoid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required!" });
  }
  const shortId = nanoid(8);
  console.log(req.user._id);
  await URL.create({
    shortId,
    redirectURL: url,
    visitHistory: [],
    createdBy: req.user.userId,
  });
  const userUrls = await URL.find({ createdBy: req.user.userId });
  if (!userUrls) {
    return res.status(404).json({ error: "No URLs found!" });
  }
  return res.render("home", {
    shortId,
    redirectURL: url,
    urls: userUrls,
  });
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