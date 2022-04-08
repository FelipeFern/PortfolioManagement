const mongoose = require("mongoose");

const tournamentSchema = mongoose.Schema({
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    moneyAvailable: { type: Number, required: true },
    inscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inscription",
        },
    ],
    coins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Coin",
        },
    ],
});

module.exports = mongoose.model("Tournament", tournamentSchema);