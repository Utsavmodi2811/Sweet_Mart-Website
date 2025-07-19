const Setting = require('../models/Setting');

// Get a setting by key
exports.getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const setting = await Setting.findOne({ key });
    if (!setting) return res.status(404).json({ error: 'Setting not found' });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update or create a setting by key
exports.updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;
    let setting = await Setting.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    res.json(setting);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get festival section title
exports.getFestivalSectionTitle = async (req, res) => {
  try {
    let setting = await Setting.findOne({ key: 'festivalSectionTitle' });
    if (!setting) {
      // Default value if not set
      setting = await Setting.create({ key: 'festivalSectionTitle', value: '' });
    }
    res.json({ value: setting.value });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update festival section title
exports.updateFestivalSectionTitle = async (req, res) => {
  try {
    const { value } = req.body;
    if (typeof value !== 'string') return res.status(400).json({ error: 'Value must be a string.' });
    const setting = await Setting.findOneAndUpdate(
      { key: 'festivalSectionTitle' },
      { value },
      { new: true, upsert: true }
    );
    res.json({ value: setting.value });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 