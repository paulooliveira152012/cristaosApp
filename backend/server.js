// import express
const express = require('express')
const cors = require('cors')

// initialize Express app
const app = express()

// put cors to use
app.use(cors())
// allow JSON parsing
app.use(express.json())

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


