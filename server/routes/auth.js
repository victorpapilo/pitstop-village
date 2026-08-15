const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// POST /api/auth/setup
// One-time route to create your first admin account. Protected by a secret
// key from your .env so strangers can't create accounts on your live site.
// Delete or comment this route out after you've created your account.
router.post('/setup', async (req, res) => {
  const { email, password, setupKey } = req.body;

  if (setupKey !== process.env.ADMIN_SETUP_KEY) {
    return res.status(403).json({ error: 'Invalid setup key.' });
  }
  if (!email || !password || password.length < 8) {
    return res.status(400).json({ error: 'Email and an 8+ character password are required.' });
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await Admin.create({ email: email.toLowerCase(), passwordHash });
  res.status(201).json({ message: 'Admin account created. You can now log in.' });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: (email || '').toLowerCase() });

  if (!admin) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const valid = await bcrypt.compare(password || '', admin.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.json({ token, email: admin.email });
});

module.exports = router;
