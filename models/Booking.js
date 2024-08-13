const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
guestname: { type: String, required: true },
 phoneNumber: { type: Number, required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
});
const Booking = mongoose.model('bookings', bookingSchema,'bookings');

bookingSchema.pre('save', async function(next) {
    if(!this.guestname){
        return("please enter the guest name")
    }
    if (this.isNew) {
      // Logic for new documents, e.g., logging or validation
      console.log('A new booking is being created.');
      
      // Example: Validate that the endDate is after startDate
      if (this.endDate <= this.startDate) {
        const error = new Error('End date must be after start date.');
        return next(error);
      }
    } else {
      // Logic for existing documents, e.g., update operations
      console.log('An existing booking is being updated.');
    }
  
    // Proceed with saving the document
    next();
  });
  

module.exports = mongoose.model('bookings', bookingSchema,'bookings');
