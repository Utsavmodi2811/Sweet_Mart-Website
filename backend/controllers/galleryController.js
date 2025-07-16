const GalleryImage = require('../models/GalleryImage');

// Get all gallery images
exports.getAllImages = async (req, res) => {
  try {
    const images = await GalleryImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single image by ID
exports.getImageById = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Upload a new image
exports.uploadImage = async (req, res) => {
  try {
    const { alt, altGu, category } = req.body;
    const src = req.file ? req.file.path : null;
    if (!src) return res.status(400).json({ error: 'Image upload failed' });
    const image = new GalleryImage({ src, alt, altGu, category });
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an image
exports.updateImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json(image);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an image
exports.deleteImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ error: 'Image not found' });
    res.json({ message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 