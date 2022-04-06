import mongoose from "mongoose";

const tournamentSchema = mongoose.Schema({
    id: { type: String, required: true },
    startDate: { type: Date, required: true },
    finishDate: { type: Date, required: true },
    monetAvailable: { type: Number, required: true },
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

const tournamentModel = mongoose.model("Tournament", tournamentSchema);
module.exports = tournamentModel;
