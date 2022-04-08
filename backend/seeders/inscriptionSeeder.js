const mongoose = require("mongoose");

const inscriptionSeed = async () => {
    try {
        const inscription = mongoose.model("Inscription");
        inscription.create({
            inscriptionDate: Date.now(),
            profit: 0,
            score: 10,
            positions: [],
            tournament: "6250671ec20e98f482a76cc5",
            user: "62506acceecaa7c367b162c2",
        });

        inscription.create({
            inscriptionDate: Date.now(),
            profit: 20,
            score: 200,
            positions: [],
            tournament: "6250671ec20e98f482a76cc5",
            user: "62506acceecaa7c367b162c1",
        });

    } catch (error) {
        console.log(error);
    }
};

module.exports = inscriptionSeed;
/*
    inscriptionDate: { type: Date, default: new Date() },
    profit: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
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

 */
