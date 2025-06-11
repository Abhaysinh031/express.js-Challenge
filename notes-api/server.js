// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

mongoose.connect("mongodb://localhost:27017/notesdb")
  .then(() => {
    app.listen(5000, () =>
      console.log(`Server running on port ${5000}`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
