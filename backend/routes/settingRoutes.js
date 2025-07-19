const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

// Festival section title
router.get('/festivalSectionTitle', settingController.getFestivalSectionTitle);
router.put('/festivalSectionTitle', settingController.updateFestivalSectionTitle);

module.exports = router; 