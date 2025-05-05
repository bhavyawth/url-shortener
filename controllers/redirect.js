const URL = require('../models/url');

async function handleRedirect(req, res) {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "shortId is required" });
    }

    const entry = await URL.findOneAndUpdate(
      { shortId: id },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // This ensures you get the updated document
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.redirect(entry.redirectURL);
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleRedirect,
};
