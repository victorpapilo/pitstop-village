const express = require('express');
const Booking = require('../models/Booking');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

function genCode() {
  return 'PV-' + Math.random().toString(36).slice(2, 7).toUpperCase();
}

// POST /api/bookings — public, anyone visiting the site can request a table
router.post('/', async (req, res) => {
  const { guestName, phone, partySize, bookingDate, bookingTime, notes } = req.body;

  if (!guestName || !phone || !partySize || !bookingDate || !bookingTime) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }

  const booking = await Booking.create({
    code: genCode(),
    guestName,
    phone,
    partySize,
    bookingDate,
    bookingTime,
    notes,
    status: 'pending',
  });

  res.status(201).json(booking);
});

// GET /api/bookings — staff only
router.get('/', requireAuth, async (req, res) => {
  const bookings = await Booking.find().sort({ bookingDate: 1, bookingTime: 1 });
  res.json(bookings);
});

// PATCH /api/bookings/:id — staff only, update status
router.patch('/:id', requireAuth, async (req, res) => {
  const { status } = req.body;
  if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status.' });
  }
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!booking) return res.status(404).json({ error: 'Booking not found.' });
  res.json(booking);
});

module.exports = router;
