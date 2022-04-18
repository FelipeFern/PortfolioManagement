const mongoose = require("mongoose");

const positionSchema = mongoose.Schema({
    entryPrice: { type: Number, required: true },
    entryDate: { type: Date, default: new Date() },
    closePrice: { type: Number },
    closeDate: { type: Date },
    profit: { type: Number },
    quantity: { type: Number, required: true },
    buyOrder: { type: Boolean, required: true },
    coin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coin",
    },
    inscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inscription",
    },
});

module.exports = mongoose.model("Position", positionSchema);
