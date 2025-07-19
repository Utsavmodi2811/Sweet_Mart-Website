const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middleware/upload');

// List all images
router.get('/', galleryController.getAllImages);
// Upload new image
router.post('/', upload.single('image'), galleryController.uploadImage);
// Update image
router.put('/:id', upload.single('image'), galleryController.updateImage);
// Delete image
router.delete('/:id', galleryController.deleteImage);
// Like an image
router.post('/:id/like', galleryController.likeImage);

module.exports = router; 