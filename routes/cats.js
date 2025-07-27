const express = require('express');
const router = express.Router();
const Cat = require('../models/Cat');

// Add new cat
router.post('/add', async (req, res) => {
  try {
    const { name, breed, age, microchip, sex, ownerName, ownerContact, vet } = req.body;
    const newCat = new Cat({
      name,
      breed,
      age,
      microchip,
      sex,
      ownerName,
      ownerContact,
      vet
    });
    await newCat.save();
    res.status(200).json({ message: 'Cat registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering cat', details: error.message });
  }
});

// Optional: Get all cats of a vet
router.get('/vet/:vetId', async (req, res) => {
  try {
    const cats = await Cat.find({ vet: req.params.vetId });
    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cats', details: error.message });
  }
});

module.exports = router;
