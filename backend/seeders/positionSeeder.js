const mongoose = require("mongoose");
const Inscription = require("../models/inscriptionModel");

const inscriptionId = "6250d70e57cd7709e6b92afa";

const positionSeed = async () => {
    try {
        const position = mongoose.model("Position");
        var date = new Date();

        // add a day
        date.setDate(date.getDate() - 2);
        const p1 = await position.create({
            entryPrice: 1,
            entryDate: date,
            closePrice: 2,
            closeDate: new Date(),
            profit: 10,
            quantity: 10,
            buyOrder: true,
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

        // add a day
        date.setDate(date.getDate() - 3);
        const p2 = await position.create({
            entryPrice: 1.5,
            entryDate: date,
            closePrice: 2,
            closeDate: new Date(),
            profit: 50,
            quantity: 100,
            buyOrder: true,
            coin: "624da9ba3732602baca8deab", // ETH
            inscription: "6250d70e57cd7709e6b92afa",
        });

        const aux2 = p2._id.toString();

        Inscription.findByIdAndUpdate(
            inscriptionId,
            { $push: { positions: aux2 } },
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
