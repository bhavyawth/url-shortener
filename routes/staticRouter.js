const express = require('express');
const router = express.Router();
const { handleHome } = require('../controllers/home');

router.get("/", handleHome);

module.exports = router;
