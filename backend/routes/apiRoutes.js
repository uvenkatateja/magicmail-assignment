const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');
const classificationController = require('../controllers/classificationController');

router.post('/emails', emailController.getEmails);
router.post('/classify', classificationController.classifyEmails);

module.exports = router;
