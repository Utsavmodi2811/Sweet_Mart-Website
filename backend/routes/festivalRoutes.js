const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');
const upload = require('../middleware/upload');

// Public routes
router.get('/', festivalController.getAllFestivals);
router.get('/:id', festivalController.getFestivalById);

// Admin routes (add auth middleware later)
router.post('/', upload.single('image'), festivalController.createFestival);
router.put('/:id', upload.single('image'), festivalController.updateFestival);
router.delete('/:id', festivalController.deleteFestival);
router.delete('/', festivalController.deleteAllFestivals);

module.exports = router; 