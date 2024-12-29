const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.post('/send-verification-email', passwordController.sendVerificationEmail);
router.post('/change-password', passwordController.verifyAndChangePassword);

module.exports = router;