const express = require('express');
const router = express.Router();
const { handleHome } = require('../controllers/home');
const { handleSignup } = require('../controllers/signup');
const { handleLogin } = require('../controllers/login');

router.get('/', handleHome);
router.get('/signup', handleSignup);
router.get('/login', handleLogin);

module.exports = router;
