const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, binanceAPI } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        binanceAPI,
    });
    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            binanceAPI: user.binanceAPI,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Error Ocurred on created new user");
    }

    res.json({
        name,
        email,
    });
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            binanceAPI: user.binanceAPI,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid email of password");
    }
});

module.exports = { registerUser, authUser };
