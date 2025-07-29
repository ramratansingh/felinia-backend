const express = require("express");
const router = express.Router();
const Record = require("../models/Record");

// POST /api/records
router.post("/", async (req, res) => {
  try {
    const { vet, cat, records } = req.body;

    // records: Array of pathologies and data
    const savedRecords = await Record.insertMany(
      records.map((r) => ({
        vet,
        cat,
        ...r,
      }))
    );

    res.status(201).json(savedRecords);
  } catch (error) {
    res.status(500).json({ message: "Error saving pathology records", error });
  }
});

module.exports = router;
