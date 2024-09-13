const express = require("express");
const Razorpay = require("razorpay");
const bodyParser = require("body-parser");
const router = express.Router();

const app = express();
app.use(bodyParser.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: 'rzp_live_62NyqXvRsbAeVy', // Replace with your Razorpay key ID
    key_secret: '6TicL1TH2tamOrDCcaq0R6ly' // Replace with your Razorpay key secret
});

// Create an order
router.post("/create-order", async (req, res) => {
    const amount = req.body.amount;
    const options = {
        amount: amount * 100, // amount in paise
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
module.exports = router;