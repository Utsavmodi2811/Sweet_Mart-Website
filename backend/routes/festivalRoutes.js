const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');

// Public routes
router.get('/', festivalController.getAllFestivals);
router.get('/:id', festivalController.getFestivalById);

// Admin routes (add auth middleware later)
router.post('/', festivalController.createFestival);
router.put('/:id', festivalController.updateFestival);
router.delete('/:id', festivalController.deleteFestival);

module.exports = router; 