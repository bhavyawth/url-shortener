
function handleHome (req, res) {
  return res.render("home", {
    shortId: null,
    redirectURL: null
  });
}

module.exports = {
  handleHome,
}