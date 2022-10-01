const express = require('express');
const app = express();


const PORT = process.env.PORT || 5000;

// Init Middleware to get body
app.use(express.json({ extended: false }));


// API Routes
const apiRoutes = require('./routes');
app.use('/api/', apiRoutes);

app.listen(PORT, (res, err) => {
    if (err) console.log(`ERROR IN LISTENING ON PORT ${PORT}`)
    console.log(`SERVER LISTENING ON PORT ${PORT}`)
})  