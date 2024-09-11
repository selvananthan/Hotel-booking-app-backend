const express = require('express');
const Hotel = require('../models/Hotel');
const router = express.Router();
//helath check

router.get('/health',async(req,res)=>{

  res.status(201).json({ message: 'server is healthy' });
})
// Get all hotels
router.get('/', async (req, res) => {
  const { filter = 'all', sortBy = 'priceAsc' } = req.query;
  const query = {};

  // Apply filter
  if (filter !== 'all') {
    query.amenities = filter;
  }

  // Apply sorting
  let sort = {};
  if (sortBy === 'priceAsc') {
    sort.price = 1;
  } else if (sortBy === 'priceDesc') {
    sort.price = -1;
  } else if (sortBy === 'rating') {
    sort.rating = -1;
  }

  try {
    const hotels = await Hotel.find(query).sort(sort);
    res.json(hotels);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching hotels', error: err.message });
  }
});

// Add a new hotel
router.post('/', async (req, res) => {
  const { name, price, location, amenities, image } = req.body;

  try {
    const hotel = new Hotel({ name, price, location, amenities, image });
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ message: 'Error adding hotel', error: err.message });
  }
});

module.exports = router;
