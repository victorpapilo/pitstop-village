const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  code: { type: String, required: true },
  guestName: { type: String, required: true },
  phone: { type: String, required: true },
  partySize: { type: Number, required: true, min: 1 },
  bookingDate: { type: String, required: true }, // stored as 'YYYY-MM-DD'
  bookingTime: { type: String, required: true }, // stored as 'HH:mm'
  notes: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
