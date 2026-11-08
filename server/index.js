import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import enquiries from './routes/enquiries.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_req, res) => res.json({
  status: 'ok',
  service: 'brandora-api',
  database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
}));
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  const valid = email === process.env.ADMIN_EMAIL && await bcrypt.compare(password || '', await bcrypt.hash(process.env.ADMIN_PASSWORD || '', 10));
  if (!valid) return res.status(401).json({ message: 'Invalid credentials.' });
  res.json({ token: jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '8h' }) });
});
app.use('/api/enquiries', enquiries);
app.use((error, _req, res, _next) => res.status(error.status || 500).json({ message: error.message || 'Internal server error.' }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Brandora API listening on ${port}`));

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection failed:', error.message));
} else {
  console.warn('MONGODB_URI is not configured; enquiry storage is disabled.');
}
