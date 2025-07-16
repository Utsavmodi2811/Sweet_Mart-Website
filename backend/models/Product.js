const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameGu: { type: String },
  description: { type: String },
  descriptionGu: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // URL or Cloudinary public_id
  category: { type: String, enum: ['sweets', 'namkeen', 'bakery'], required: true },
  subcategory: { type: String },
  isPopular: { type: Boolean, default: false },
  stock: { type: Number, default: 0 },
  salesCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema); 