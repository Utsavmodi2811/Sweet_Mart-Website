const mongoose = require('mongoose');

const festivalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameGu: { type: String },
  image: { type: String }, // URL or Cloudinary public_id
  description: { type: String },
  descriptionGu: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Festival', festivalSchema); 