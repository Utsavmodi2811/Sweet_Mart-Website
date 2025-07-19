const Festival = require('../models/Festival');
const path = require('path');

// Get all festivals
exports.getAllFestivals = async (req, res) => {
  try {
    // Sort by createdAt descending
    const festivals = await Festival.find().sort({ createdAt: -1 });
    console.log('Fetched festivals:', festivals);
    res.json(festivals);
  } catch (err) {
    console.error('Error fetching festivals:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single festival by ID
exports.getFestivalById = async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) return res.status(404).json({ error: 'Festival not found' });
    res.json(festival);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new festival
exports.createFestival = async (req, res) => {
  try {
    let { sectionTitle, name, description } = req.body;
    // Validate required fields
    if (!sectionTitle || !sectionTitle.trim()) sectionTitle = 'Festival Specials';
    if (!name) {
      return res.status(400).json({ error: 'Section title and item name are required.' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required.' });
    }
    // Save image path (relative to /uploads)
    const imagePath = '/uploads/' + path.basename(req.file.path);
    const festival = new Festival({
      sectionTitle,
      name,
      description,
      image: imagePath,
    });
    await festival.save();
    res.status(201).json(festival);
  } catch (err) {
    console.error('Error creating festival:', err);
    res.status(400).json({ error: err.message });
  }
};

// Update a festival
exports.updateFestival = async (req, res) => {
  try {
    let { sectionTitle, name, description } = req.body;
    if (!sectionTitle || !sectionTitle.trim()) sectionTitle = 'Festival Specials';
    if (!name) {
      return res.status(400).json({ error: 'Section title and item name are required.' });
    }
    const updateData = { sectionTitle, name, description };
    if (req.file) {
      // Save new image path
      updateData.image = '/uploads/' + path.basename(req.file.path);
    }
    const festival = await Festival.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!festival) return res.status(404).json({ error: 'Festival not found' });
    res.json(festival);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a festival
exports.deleteFestival = async (req, res) => {
  try {
    const festival = await Festival.findByIdAndDelete(req.params.id);
    if (!festival) return res.status(404).json({ error: 'Festival not found' });
    res.json({ message: 'Festival deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete all festivals (for deleting a festival section)
exports.deleteAllFestivals = async (req, res) => {
  try {
    await Festival.deleteMany({});
    res.json({ message: 'All festival items deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 