const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true }, // Title for the festival section
  name: { type: String, required: true },
  nameGu: { type: String },
  image: { type: String, required: true }, // URL or Cloudinary public_id, now required
  description: { type: String },
  descriptionGu: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Festival', festivalSchema); 