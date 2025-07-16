const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const upload = require('../middleware/upload');
const path = require('path');

// Get a setting by key
router.get('/:key', settingController.getSetting);
// Update or create a setting by key
router.put('/:key', settingController.updateSetting);

// Image upload endpoint
router.post('/../upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Return the URL to access the uploaded image
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = router; 