const GalleryImage = require('../models/GalleryImage');
const path = require('path');

// Get all gallery images
exports.getAllImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Upload a new gallery image
exports.uploadImage = async (req, res) => {
  try {
    const { category, description } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image is required.' });
    if (!category) return res.status(400).json({ error: 'Category is required.' });
    const imagePath = '/uploads/' + path.basename(req.file.path);
    const image = new GalleryImage({
      image: imagePath,
      category,
      description,
    });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a gallery image
exports.updateImage = async (req, res) => {
  try {
    const { category, description } = req.body;
    const updateData = { category, description };
    if (req.file) {
      updateData.image = '/uploads/' + path.basename(req.file.path);
    }
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a gallery image
exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 