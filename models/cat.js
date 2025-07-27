const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: String,
  breed: String,
  age: Number,
  sex: String,
  microchip: String,
  ownerName: String,
  ownerContact: String,
  vet: { type: mongoose.Schema.Types.ObjectId, ref: 'Vet' }
}, { timestamps: true });

module.exports = mongoose.model("Cat", catSchema, "cat");
