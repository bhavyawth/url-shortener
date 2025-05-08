const { getUser } = require('../service/auth');

async function restrictToLoggedinUserOnly (req, res, next) 
{
  const openPaths = ['/login', '/signup'];

  // Allow unauthenticated access to login and signup
  if (openPaths.includes(req.path)) return next();
  
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect('/login');
  const user = getUser(userUid);

  if (!user) return res.redirect('/login');

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
}