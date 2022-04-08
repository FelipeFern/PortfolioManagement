const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
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
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid email of password");
    }
});

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const response = await User.findByIdAndDelete(id)
        if (response === null) { return res.status(404).json({ message: "El usuario solictado no se encuenta en la base de datos" }) }
        return res.status(200).json({ id: id })
    } catch (error) {
        return res.status(404).json({ message: 'No se ha podido eliminar al usuario' })
    }
}

const getUser = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id).exec()
        if (user === null) { return res.status(404).json({ message: `El usuario con el ID: ${id}, no existe en la base de datos!` }) }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};



module.exports = { registerUser, deleteUser,authUser, getUsers , getUser};
