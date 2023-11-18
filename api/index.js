const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
const cookieParser = require('cookie-parser');
require('dotenv/config');

const PORT = process.env.PORT || 4000

// Connect to DB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Middleware
app.use(express.json());
// app.use(cors({ credentials: true, origin: "https://tricky-vest-pike.cyclic.app/" }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// Routes Middleware
app.use('/api', authRoute);
app.use('/post', postRoute);

app.get('/', (req, res) => {
    res.json('Hello World!')
});

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})