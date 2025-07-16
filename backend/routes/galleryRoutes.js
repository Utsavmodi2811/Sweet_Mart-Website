const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middleware/upload');

// Public routes
router.get('/', galleryController.getAllImages);
router.get('/:id', galleryController.getImageById);

// Admin routes (add auth middleware later)
router.post('/', upload.single('image'), galleryController.uploadImage);
router.put('/:id', galleryController.updateImage);
router.delete('/:id', galleryController.deleteImage);

module.exports = router; 