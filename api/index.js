const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const cookieParser = require('cookie-parser');
require('dotenv/config');

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => console.log("Connected to DB!"));

// Middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes Middleware
app.use('/api', authRoute);
app.use('/post', postRoute);

app.listen(4000, () => {
    console.log("Server is running! http://localhost:4000");
});