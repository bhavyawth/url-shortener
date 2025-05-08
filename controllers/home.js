const URL = require('../models/url');

async function handleHome (req, res) {
  const userUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    shortId: null,
    redirectURL: null,
    urls: userUrls,
  });
}

module.exports = {
  handleHome,
}