const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const reviewRoutes = require('./routes/reviews');
const bookingRoutes = require('./routes/bookings');

const app = express();
const port = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Frontend URL
  methods: 'GET,POST,PUT,DELETE',  // Allowed HTTP methods
  allowedHeaders: 'Content-Type,Authorization' // Allowed headers
};

// Middleware
app.use(cors(corsOptions));  // Enables CORS with specific options
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes); 

// Connect to MongoDB
mongoose.connect('mongodb+srv://selvagoogly:Mars%401992@cluster0.k3rqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
