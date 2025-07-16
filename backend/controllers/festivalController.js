const Festival = require('../models/Festival');

// Get all festivals
exports.getAllFestivals = async (req, res) => {
  try {
    const festivals = await Festival.find();
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
    console.log('Creating festival with body:', req.body);
    const festival = new Festival(req.body);
    await festival.save();
    console.log('Festival saved:', festival);
    res.status(201).json(festival);
  } catch (err) {
    console.error('Error creating festival:', err);
    res.status(400).json({ error: err.message });
  }
};

// Update a festival
exports.updateFestival = async (req, res) => {
  try {
    const festival = await Festival.findByIdAndUpdate(req.params.id, req.body, { new: true });
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