const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  vet: { type: mongoose.Schema.Types.ObjectId, ref: "Vet", required: true },
  cat: { type: mongoose.Schema.Types.ObjectId, ref: "Cat", required: true },
  pathology: { type: String, required: true },
  symptoms: String,
  clinicalParameters: String,
  differentialDiagnosis: String,
  treatment: String,
  followUpDate: Date,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema, "record");