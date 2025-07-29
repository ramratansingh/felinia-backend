const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vet = require("../models/vet");

// POST /register
router.post("/register", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    licenseNumber,
    clinicName,
    clinicCity,
    clinicPhone,
  } = req.body;

  try {
    const existingVet = await Vet.findOne({ email });
    if (existingVet)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const vet = new Vet({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      licenseNumber,
      clinicName,
      clinicCity,
      clinicPhone,
    });

    await vet.save();
    res.status(201).json({ message: "Vet registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const vet = await Vet.findOne({ email: email });
    if (!vet) return res.status(404).json({ message: "Vet not found" });

    const isMatch = await bcrypt.compare(password, vet.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: vet._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token, vet: { id: vet._id, name: vet.name, email: vet.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

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
  console.log('req params',req);
  try {
    const { firstName, lastName, email, clinicPhone, clinicName } = req.body;
    const vet = await Vet.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, clinicPhone, clinicName },
      { new: true }
    ).select('-password');
    res.json({ message: 'Profile updated', vet });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

module.exports = router;
