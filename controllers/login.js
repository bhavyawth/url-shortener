function handleLogin (req, res) {
  return res.render("login", {
    error: null,
  });
}

module.exports = {
  handleLogin,
}