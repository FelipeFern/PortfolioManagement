import mongoose from "mongoose";

const positionSchema = mongoose.Schema({
    id: { type: String, required: true },
    entryPrice: { type: Number, required: true },
    entryDate: { type: Date, default: new Date() },
    closePrice: { type: Number },
    closeDate: { type: Date },
    profit: { type: Number },
    quantity: {type: Number, required: true},
    buyOrder: { type: Boolean, required: true },
    coin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coin",
    },
    insctiption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inscription",
    },
});

const positionModel = mongoose.model("Position", positionSchema);
module.exports = positionModel;
