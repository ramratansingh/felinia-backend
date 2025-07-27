const mongoose = require('mongoose');

const vetSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  licenseNumber: { type: String, required: true },
  clinicName:    { type: String, required: true },
  clinicCity:    { type: String, required: true },
  clinicPhone:   { type: String, required: true },
  specialization: { type: String, default: 'General Feline Medicine' }
}, { timestamps: true });

module.exports = mongoose.model("Vet", vetSchema, "vet"); 

