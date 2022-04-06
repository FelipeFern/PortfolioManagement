import mongoose from "mongoose";

const insctiptionSchema = mongoose.Schema({
    inscriptionDate: { type: Date, default: new Date() },
    profit: { type: Number, default: 0 },
    score: {type: Number, default: 0},
    positions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position",
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
    },
});

const insctiptionModel = mongoose.model("Insctiption", insctiptionSchema);
module.exports = insctiptionModel;
