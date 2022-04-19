const mongoose = require("mongoose");
const Tournament = require("../models/tournamentModel");
const User = require("../models/userModel");

const inscriptionSeed = async () => {
    try {
        const inscription = mongoose.model("Inscription");

        var d = new Date();
        d.setDate(d.getDate() - 4);

        const i1 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a39", //1
            user: "625eb58e2f8447c6dac912f4", //Maggie
        });

        const aux1 = i1._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a39",
            { $push: { inscriptions: aux1 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f4",
            { $push: { inscriptions: aux1 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });
        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 2);
        const i4 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a39",
            user: "625eb58e2f8447c6dac912f8",
        });

        const aux4 = i4._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a39",
            { $push: { inscriptions: aux4 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f8",
            { $push: { inscriptions: aux4 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 4);
        const i5 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a39",
            user: "625eb58e2f8447c6dac912f2",
        });

        const aux5 = i5._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a39",
            { $push: { inscriptions: aux5 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f2",
            { $push: { inscriptions: aux5 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 1);
        const i10 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a39",
            user: "625eb58e2f8447c6dac912fb",
        });

        const aux10 = i10._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a39",
            { $push: { inscriptions: aux10 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912fb",
            { $push: { inscriptions: aux10 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 1);
        const i11 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a39",
            user: "625eb58e2f8447c6dac912f3",
        });

        const aux11 = i11._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a39",
            { $push: { inscriptions: aux11 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f3",
            { $push: { inscriptions: aux11 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // ========================================================================== SEGUNDO TORNEO

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 9);
        const i12 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a38",
            user: "625eb58e2f8447c6dac912f3",
        });

        const aux12 = i12._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a38",
            { $push: { inscriptions: aux12 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f3",
            { $push: { inscriptions: aux12 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 8);
        const i13 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a38",
            user: "625eb58e2f8447c6dac912f2",
        });

        const aux13 = i13._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a38",
            { $push: { inscriptions: aux13 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f2",
            { $push: { inscriptions: aux13 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 7);
        const i14 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a38",
            user: "625eb58e2f8447c6dac912f5",
        });

        const aux14 = i14._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a38",
            { $push: { inscriptions: aux14 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f5",
            { $push: { inscriptions: aux14 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 6);
        const i15 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a38",
            user: "625eb58e2f8447c6dac912f7",
        });

        const aux15 = i15._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a38",
            { $push: { inscriptions: aux15 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f7",
            { $push: { inscriptions: aux15 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // ========================================================================== Quinto TORNEO

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 35);
        const i51 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a3b",
            user: "625eb58e2f8447c6dac912f3",
        });

        const aux51 = i51._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a3b",
            { $push: { inscriptions: aux51 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f3",
            { $push: { inscriptions: aux51 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 30);
        const i52 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a3b",
            user: "625eb58e2f8447c6dac912f8",
        });

        const aux52 = i52._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a3b",
            { $push: { inscriptions: aux52 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f8",
            { $push: { inscriptions: aux52 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 28);
        const i53 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a3b",
            user: "625eb58e2f8447c6dac912f2",
        });

        const aux53 = i53._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a3b",
            { $push: { inscriptions: aux53 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo" + aux53);
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f2",
            { $push: { inscriptions: aux53 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User" + aux53);
            });

        // ========================================================================== Cuarto TORNEO

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 25);
        const i41 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a3a",
            user: "625eb58e2f8447c6dac912f2",
        });

        const aux41 = i41._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a3a",
            { $push: { inscriptions: aux41 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f2",
            { $push: { inscriptions: aux41 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });

        // =======================================
        d = new Date();
        d.setDate(d.getDate() - 8);
        const i42 = await inscription.create({
            inscriptionDate: d,
            profit: Math.floor(Math.random() * (10000 - -1000 + 1) + -1000),
            score: 10,
            positions: [],
            tournament: "625ec361b5f1244a7d437a3a",
            user: "625eb58e2f8447c6dac912f4",
        });

        const aux42 = i42._id.toString();

        Tournament.findByIdAndUpdate(
            "625ec361b5f1244a7d437a3a",
            { $push: { inscriptions: aux42 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien el torneo");
                } else {
                    console.log(" Hubo un error el torneo");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch Torneo");
            });

        User.findByIdAndUpdate(
            "625eb58e2f8447c6dac912f2",
            { $push: { inscriptions: aux42 } },
            { new: true }
        )
            .then((docs) => {
                if (docs) {
                    console.log(" Se modifico bien al usuario");
                } else {
                    console.log(" Hubo un error actualizando al usuario");
                }
            })
            .catch((err) => {
                console.log(" Salimos por el carch User");
            });
    } catch (error) {
        console.log("Error Seeder Inscription");
    }
};

module.exports = inscriptionSeed;
