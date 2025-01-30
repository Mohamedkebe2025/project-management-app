const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

console.log('Environment Variables:', {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/spaces', require('./routes/spaces'));
app.use('/api/lists', require('./routes/lists')); 
app.use('/api/tasks', require('./routes/tasks'));

// Database connection
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
