const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/auth');

router.post('/login', authController.login);
router.post('/register', authController.register); // Optional, for initial setup
router.get('/me', requireAuth, authController.me);

module.exports = router; 