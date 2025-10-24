const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/google', authController.getGoogleAuthUrl);
router.get('/google/callback', authController.handleGoogleCallback);

module.exports = router;
