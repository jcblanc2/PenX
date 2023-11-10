const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv/config');

// Connect to DB
// mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => console.log("Connected to DB!"));

// Middleware
app.use(express.json());
app.use(cors());

app.post("/register", (request, response) => {
    const { name, email, password } = request.body;
    response.send({ requestData: { name, email, password } });
});

app.post("/login", (request, response) => {
    const { email, password } = request.body;
    response.send({ requestData: { email, password } });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running! http://localhost:4000");
});