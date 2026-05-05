const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/dashboard',require('./routes/dashboard'));
app.use('/api/students', require('./routes/students'));
app.use('/api/requests', require('./routes/requests'));

// Connect to MongoDB & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected — fynder DB');
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀  Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch(err => {
    console.error('❌  MongoDB connection error:', err.message);
    process.exit(1);
  });