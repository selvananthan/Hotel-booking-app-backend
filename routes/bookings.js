const express = require('express');
const Booking = require('../models/Booking');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
const router = express.Router();

// Get all bookings for a user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await Booking.find({ userId }).populate('hotelId', 'name location').populate('userId', 'username');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Create a new booking
router.post('/newbook', async (req, res) => {
  const { guestname,phoneNumber,hotelId, userId, startDate, endDate, totalPrice } = req.body;
  try {
    const booking = new Booking({ guestname,phoneNumber, hotelId, userId, startDate, endDate, totalPrice });
    await booking.save();
    res.status(201).json({ message: 'booking saved successfully' ,data :booking});
  } catch (err) {
    res.status(400).json({ message: 'Error creating booking', error: err.message });
  }
});

// Get booking by ID
router.get('/getbookings', async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ message: 'user ID is required' });
    }

    const bookings = await Booking.find({ userId }).populate('userId', 'name location');
    if (bookings.length === 0) {
      return res.status(404).json({ message: 'No bookings found for this hotel' });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Cancel a booking
router.delete('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
});

module.exports = router;
