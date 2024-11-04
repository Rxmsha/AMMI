const express = require('express');
const router = express.Router();
const Result = require('../models/Result'); // Import the Result model

// Endpoint to fetch results by question ID
router.get('/:questionId', async (req, res) => {
  const { questionId } = req.params;
  try {
    const result = await Result.findById(questionId); // Use findById to fetch by _id
    if (!result) {
      return res.status(404).json({ message: "Results not found." });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching results:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Endpoint to insert new results
router.post('/', async (req, res) => {
  const resultData = req.body;
  try {
    const newResult = new Result(resultData);
    await newResult.save();
    res.status(201).json({ message: "Result inserted successfully", data: newResult });
  } catch (error) {
    console.error("Error inserting result:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;