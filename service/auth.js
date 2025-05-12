const jwt = require('jsonwebtoken');
require('dotenv').config(); 

function setUser (user) {
  const userId = user._id;
  const userName = user.name;
  const email = user.email;

  // Create a JWT token
  const token = jwt.sign({ userId, userName, email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
}

function getUser (token) {
  // Verify the JWT token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
}