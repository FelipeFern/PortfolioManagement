const mongoose = require("mongoose");
const Inscription = require("../models/inscriptionModel");


const positionSeed = async () => {
    try {
        const position = mongoose.model("Position");
        var ep = Math.floor(Math.random() * (10000 - -1000 + 1) + -1000);
        var cp = Math.floor(Math.random() * (10000 - -1000 + 1) + -1000);

        // Add a day
        var ed = new Date();
        var cd = new Date();
        // ========================================================================== Inscripcion Brt  -- Torneo 3
        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 30);
        cd.setDate(cd.getDate() - 27);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p1 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: cd,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8deaf",
            inscription: "625ed5514a70879ded1f4dc5",
        });

        const aux1 = p1._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4dc5",
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 28);
        cd.setDate(cd.getDate() - 27);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p2 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: null,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8dead",
            inscription: "625ed5514a70879ded1f4dc5",
        });

        const aux2 = p2._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4dc5",
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 29);
        cd.setDate(cd.getDate() - 25);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p3 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: cd,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8debb",
            inscription: "625ed5514a70879ded1f4dc5",
        });

        const aux3 = p3._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4dc5",
            { $push: { positions: aux3 } },
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 32);
        cd.setDate(cd.getDate() - 30);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p4 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: null,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8deb3",
            inscription: "625ed5514a70879ded1f4dc5",
        });

        const aux4 = p4._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4dc5",
            { $push: { positions: aux4 } },
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 27);
        cd.setDate(cd.getDate() - 25);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p5 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: cd,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8debb",
            inscription: "625ed5514a70879ded1f4dc5",
        });

        const aux5 = p5._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4dc5",
            { $push: { positions: aux5 } },
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
/*
        // ========================================================================== Inscripcion Brt  -- Torneo 2
        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 10);
        cd.setDate(cd.getDate() - 9);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p11 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: cd,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8deaa",
            inscription: "625ed5514a70879ded1f4db1",
        });

        const aux11 = p11._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4db1",
            { $push: { positions: aux11 } },
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 9);
        cd.setDate(cd.getDate() - 8);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p21 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: null,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8dead",
            inscription: "625ed5514a70879ded1f4db1",
        });

        const aux21 = p21._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4db1",
            { $push: { positions: aux21 } },
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 2);
        cd.setDate(cd.getDate());
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p31 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: cd,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8deac",
            inscription: "625ed5514a70879ded1f4db1",
        });

        const aux31 = p31._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4db1",
            { $push: { positions: aux31 } },
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 2);
        cd.setDate(cd.getDate());
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p41 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: null,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8deb5",
            inscription: "625ed5514a70879ded1f4db1",
        });

        const aux41 = p41._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4db1",
            { $push: { positions: aux41 } },
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

        // =======================================
        ed = new Date();
        cd = new Date();
        ed.setDate(ed.getDate() - 2);
        cd.setDate(cd.getDate() - 1);
        ep = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        cp = Math.floor(Math.random() * (10000 - -0 + 1) + -0);
        const p51 = await position.create({
            entryPrice: ep,
            entryDate: ed,
            closePrice: cp,
            closeDate: cd,
            profit: Math.floor(Math.random() * (1000 - -1000 + 1) + -1000),
            quantity: Math.floor(Math.random() * (30 - 0 + 1) + 0),
            buyOrder: Math.random() < 0.5,
            coin: "624da9ba3732602baca8deb4",
            inscription: "625ed5514a70879ded1f4db1",
        });

        const aux51 = p51._id.toString();
        Inscription.findByIdAndUpdate(
            "625ed5514a70879ded1f4db1",
            { $push: { positions: aux51 } },
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
            */
    } catch (error) {
        console.log(error);
    }
    
};

module.exports = positionSeed;
