// routes/payment.js

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: 'your_key_id',  // Replace with your Razorpay Key ID
  key_secret: 'your_key_secret'  // Replace with your Razorpay Key Secret
});

// Payment initiation route
router.post('/', async (req, res) => {
  const { amount, currency } = req.body; // Amount in smallest currency unit (e.g., 100 for INR 1.00)

  const options = {
    amount: amount * 100, // amount in smallest currency unit
    currency,
    receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`, // Unique receipt ID
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
});

// Payment verification route
router.post('/verify', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const generated_signature = crypto.createHmac('sha256', 'your_key_secret')
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid signature, payment failed' });
  }
});

module.exports = router;
