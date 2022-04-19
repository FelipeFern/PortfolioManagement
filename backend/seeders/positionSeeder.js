const mongoose = require("mongoose");
const Inscription = require("../models/inscriptionModel");

const inscriptionId = "6250d70e57cd7709e6b92afa";

const positionSeed = async () => {
    try {
        const position = mongoose.model("Position");
        const ep = Math.floor(Math.random() * (10000 - -1000 + 1) + -1000);
        const cp = Math.floor(Math.random() * (10000 - -1000 + 1) + -1000);
        var ed = new Date();
        var cd = new Date();
        // ========================================================================== Inscripcion X  -- Torneo Y
        // =======================================
        ed.setDate(date.getDate() - 2);
        cd.setDate(date.getDate() - 2);
        ep = Math.floor(Math.random() * (10000 - -1000 + 1) + -1000);
        cp = Math.floor(Math.random() * (10000 - -1000 + 1) + -1000);
        const p1 = await position.create({
            entryPrice: ep,
            entryDate: date,
            closePrice: cp,
            closeDate: cd,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: 10,
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8deaa",
            inscription: "6250d70e57cd7709e6b92afa",
        });

        const aux1 = p1._id.toString();
        Inscription.findByIdAndUpdate(
            inscriptionId,
            { $push: { positions: aux1 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien");
                } else {
                    console.log(" Hubo un error");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch");
            });
    } catch (error) {
        console.log(error);
    }
};

module.exports = positionSeed;
