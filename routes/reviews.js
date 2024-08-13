const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Get reviews for a specific hotel
router.get('/:hotelId', async (req, res) => {
  const { hotelId } = req.params;

  try {
    const reviews = await Review.find({ hotelId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
});

// Add a new review
router.post('/', async (req, res) => {
  const { hotelId, userId, reviewText, rating } = req.body;

  try {
    const review = new Review({ hotelId, userId, reviewText, rating });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: 'Error adding review', error: err.message });
  }
});

module.exports = router;
