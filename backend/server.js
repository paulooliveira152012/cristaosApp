// import express
const express = require('express')
const cors = require('cors')

// initialize Express app
const app = express()

// put cors to use
app.use(cors())
// allow JSON parsing
app.use(express.json())


app.post('/login', (req, res) => {
    res.json({ message: 'Welcome to the API' })
    console.log("api reached")
})

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


