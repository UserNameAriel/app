const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGO_URL;
  if (!uri) throw new Error('MONGO_URL is not defined in .env');

  await mongoose.connect(uri);
  console.log('✅ MongoDB connected:', uri);
}

module.exports = { connectDB };
