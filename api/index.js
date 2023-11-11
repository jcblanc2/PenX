const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const cookieParser = require('cookie-parser');
require('dotenv/config');

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => console.log("Connected to DB!"));

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

// Routes Middleware
app.use('/api', authRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running! http://localhost:4000");
});