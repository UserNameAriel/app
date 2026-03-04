require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db/connect');
const healthRouter  = require('./routes/health');
const configRouter  = require('./routes/config');
const actionsRouter = require('./routes/actions');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Allow frontend on localhost:3000
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN || 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// Routes
app.use('/', healthRouter);
app.use('/', configRouter);
app.use('/', actionsRouter);

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`   GET http://localhost:${PORT}/health`);
    console.log(`   GET http://localhost:${PORT}/config?appId=600`);
  });
}

bootstrap().catch(err => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});
