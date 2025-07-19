const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL or file path
  category: { type: String, enum: ['all', 'shop', 'sweets', 'packaging', 'festival'], required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('GalleryImage', galleryImageSchema); 