// import express
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// initialize Express app
const app = express()

// Load environment variables from .env file
dotenv.config();

// put cors to use
app.use(cors())
// allow JSON parsing
app.use(express.json())

const authRoutes = require('./routes/auth')
const usersRoute = require('./routes/users')
const roomRoutes = require('./routes/rooms')
const listingRoutes = require('./routes/listings')
const groupRoutes = require('./routes/groups')
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoute)
app.use('/api/rooms', roomRoutes)
app.use('/api/listings', listingRoutes)
app.use('/api/groups', groupRoutes)


// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true, // This option is set by default
  })
    .then(() => {
      console.log('MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err);
    });


// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});