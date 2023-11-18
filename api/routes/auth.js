const UserModel = require('../models/user');
const router = require("express").Router();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validation');
require('dotenv/config');


// register router
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Check valid data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if the user already exists
    const emailExist = await UserModel.findOne({ email: email });
    if (emailExist) return res.status(400).send({ message: "Email already exists" });

    // hash the password 
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)

    // Crete a new user
    const user = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
    });

    // Create and assign a token
    const token = JWT.sign({ name: user.name, userId: user._id }, process.env.JWT_SECRET);

    // add the user to the database
    try {
        const userSaved = await user.save();
        res.cookie('token', token).status(200).json({ userId: user._id });
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
});

// log in router
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check valid data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Check if the user already exists
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(400).send({ message: "Email or Passord is wrong!" });

    // Check if the password is correct
    const hashedPassword = bcrypt.compareSync(password, user.password)
    if (!hashedPassword) return res.status(400).send({ message: "Email or Passord is wrong!" });

    // Create and assign a token
    const token = JWT.sign({ name: user.name, userId: user._id }, process.env.JWT_SECRET);

    try {
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000, sameSite: 'None', secure: true });

        res.status(200).json({
            name: user.name,
            userId: user._id
        });
    }
    catch (err) {
        res.status(400).send({ message: err });
    }
});

// profile router
router.get("/profile", async (req, res) => {
    const token = req.cookies.token; // Corrected this line
    console.log('Token from cookies:', token);

    if (token) {
        const { token } = req.cookies;
        const info = JWT.verify(token, process.env.JWT_SECRET);
        return res.json(info);
    }

    res.json(null);
});

// logout router
router.post("/logout", async (req, res) => {
    res.cookie('token', '').status(200).json({ message: 'ok' });
});

module.exports = router;