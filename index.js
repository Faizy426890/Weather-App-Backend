import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDB from './src/Connection/DBconnect.js';

import { clerkWebhook } from './src/routes/userRoute.js';
import { registerCoach } from './src/routes/coach.js';
import { setRole } from './src/routes/setRole.js';
import { tournament } from './src/routes/tournaments.js';
import { deepseek } from './src/routes/games.js';
import { session } from './src/routes/session.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

// Raw parser for Clerk webhook (MUST come before express.json)
app.use('/api/webhook/clerk', bodyParser.raw({ type: '*/*' }));

// JSON body parser
app.use(express.json());

// Health check on root
app.get('/', (req, res) => {
  const state = mongoose.connection.readyState;
  const statusMap = {
    0: '🔴 Disconnected',
    1: '🟢 Connected',
    2: '🟡 Connecting',
    3: '🟠 Disconnecting'
  };
  res.send(`Server is running!<br>MongoDB status: <strong>${statusMap[state]}</strong>`);
});

// API Routes
app.use('/api', setRole);
app.use('/api', tournament);
app.use('/api', registerCoach);
app.use('/api', deepseek);
app.use('/api', session);
app.use('/api', clerkWebhook);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
