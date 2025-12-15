require('dotenv').config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

// Production optimizations (install these packages: npm install compression helmet express-rate-limit)
// const compression = require('compression');
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'https://your-project.vercel.app', // Replace with your actual Vercel URL
    /\.vercel\.app$/ // Allow all Vercel preview deployments
  ],
  credentials: true
}));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Routes
const authRoutes = require('./routes/auth');
const sweetRoutes = require('./routes/sweet');

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for debugging
app.post("/api/test", (req, res) => {
  console.log("Test endpoint hit with body:", req.body);
  res.json({
    success: true,
    message: "Test endpoint working",
    receivedData: req.body
  });
});



// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

module.exports = app;
