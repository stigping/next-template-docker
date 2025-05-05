process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('🔥 Unhandled Rejection:', reason);
});

const express = require('express');
const { connectToMongo, getDb } = require('./mongo');

const app = express();
const PORT = process.env.PORT || 4000;

const cors = require('cors');
const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

// Apply rate limiting middleware to all requests
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(apiLimiter);

app.use(cors());
app.use(helmet());

app.use(express.json());

app.get('/api/ping', async (req, res) => {
  try {
    const db = getDb();
    const pong = await db.collection('pings').insertOne({ at: new Date() });
    res.json({ message: 'pong from Mongo!', id: pong.insertedId });
  } catch (err) {
    console.error('❌ Ping route error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend API ready on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  });

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', db: !!getDb() });
});

app.use((err, req, res, next) => {
  console.error('❌ Uncaught error:', err);
  res.status(500).json({ error: 'Internal server error' });
});
