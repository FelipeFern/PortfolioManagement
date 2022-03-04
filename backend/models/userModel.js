// Definimos la estructura que van a tener los usuarios.
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        binanceAPI: {
            type: String,
            required: true,
            default: "APIPorDefecto",
        },
    },
    {
        // Para agregar una columna sobre la fecha y hora en que se creo/ modificaron los datos.
        timestamps: true,
    }
);

// Encriptamos la contraseña
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Desencriptamos la contraseña, para ver si la ingresada es la misma.
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
