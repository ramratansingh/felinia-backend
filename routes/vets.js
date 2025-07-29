const express = require('express');
const router = express.Router();

// Get vet profile by ID
router.get('/:id', async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id).select('-password');
    if (!vet) return res.status(404).json({ message: 'Vet not found' });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update vet profile
router.put('/:id', async (req, res) => {
  try {
    const { name, email, phone, clinic } = req.body;
    const vet = await Vet.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, clinic },
      { new: true }
    ).select('-password');
    res.json({ message: 'Profile updated', vet });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
