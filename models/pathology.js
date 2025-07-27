const mongoose = require('mongoose');

const pathologySchema = new mongoose.Schema({
  name: String,
  mainSymptoms: String,
  clinicalParameters: String,
  differentialDiagnosis: String,
  treatment: String,
  followUpDate: Date,
  notes: String,
  cat: { type: mongoose.Schema.Types.ObjectId, ref: 'Cat' },
  vet: { type: mongoose.Schema.Types.ObjectId, ref: 'Vet' }
}, { timestamps: true });

module.exports = mongoose.model("Pathology", pathologySchema, "pathology");
