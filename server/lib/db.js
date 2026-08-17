const mongoose = require('mongoose');

// Serverless functions can be invoked many times per minute, each in a fresh
// execution context. Without caching, every request would open a brand new
// MongoDB connection — this reuses one across invocations when possible.
let cached = global._pitstopMongooseCache;
if (!cached) {
  cached = global._pitstopMongooseCache = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = connectDB;
