const mongoose = require("mongoose");

const tournamentSeed = async () => {
    try {
        const tournament = mongoose.model("Tournament");
        var d = new Date();
        var f = new Date();
        d.setDate(d.getDate() - 5);
        tournament.create({
            name: "Torneo Pruebas",
            startDate: d,
            finishDate: new Date("5/1/22"),
            moneyAvailable: 100,
            inscriptions: [],
            coins: [
                "624da9ba3732602baca8deaa",
                "624da9ba3732602baca8dead",
                "624da9ba3732602baca8deac",
                "624da9ba3732602baca8deab",
                "624da9ba3732602baca8deb0",
                "624da9ba3732602baca8deb2"
            ],
        });

        // f = new Date();
        // d = new Date();
        // d.setDate(d.getDate() - 10);
        // f.setDate(f.getDate() - 5);
        // tournament.create({
        //     name: "Segundo Torneo",
        //     startDate:d,
        //     finishDate: f,
        //     moneyAvailable: 200,
        //     inscriptions: [],
        //     coins: [
        //         "624da9ba3732602baca8deaa",
        //         "624da9ba3732602baca8dead",
        //         "624da9ba3732602baca8deac",
        //         "624da9ba3732602baca8deaf",
        //         "624da9ba3732602baca8deb5",
        //         "624da9ba3732602baca8deb4",
        //         "624da9ba3732602baca8deb2"
        //     ],
        // });

        // f = new Date();
        // d = new Date();
        // d.setDate(d.getDate() - 3);
        // f.setDate(f.getDate() + 10);
        // tournament.create({
        //     name: "Tercer Torneo",
        //     startDate: d,
        //     finishDate: f,
        //     moneyAvailable: 500,
        //     inscriptions: [],
        //     coins: [
        //         "624da9ba3732602baca8deaa",
        //         "624da9ba3732602baca8dead",
        //         "624da9ba3732602baca8deac",
        //         "624da9ba3732602baca8deaf",
        //         "624da9ba3732602baca8deb5",
        //         "624da9ba3732602baca8debb",
        //         "624da9ba3732602baca8deb3"
        //     ],
        // });

        // f = new Date();
        // d = new Date();
        // d.setDate(d.getDate() - 30);
        // f.setDate(f.getDate() + 25);
        // tournament.create({
        //     name: "Cuarto Torneo",
        //     startDate: Date.now(),
        //     finishDate: new Date("5/4/22"),
        //     moneyAvailable: 80000,
        //     inscriptions: [],
        //     coins: [
        //         "624da9ba3732602baca8deaa",
        //         "624da9ba3732602baca8dead",
        //         "624da9ba3732602baca8deac",
        //         "624da9ba3732602baca8deab",
        //         "624da9ba3732602baca8deb0",
        //         "624da9ba3732602baca8deb4",
        //         "624da9ba3732602baca8deaf"
        //     ],
        // });


        
        // f = new Date();
        // d = new Date();
        // d.setDate(d.getDate() - 40);
        // f.setDate(f.getDate() - 10);
        // tournament.create({
        //     name: "Quinto Torneo",
        //     startDate: d,
        //     finishDate: f,
        //     moneyAvailable: 500,
        //     inscriptions: [],
        //     coins: [
        //         "624da9ba3732602baca8deaa",
        //         "624da9ba3732602baca8dead",
        //         "624da9ba3732602baca8deac",
        //         "624da9ba3732602baca8deaf",
        //         "624da9ba3732602baca8deb5",
        //         "624da9ba3732602baca8debb",
        //         "624da9ba3732602baca8deb3"
        //     ],
        // });

        // f = new Date();
        // d = new Date();
        // d.setDate(d.getDate() - 20);
        // f.setDate(f.getDate() + 55);
        // tournament.create({
        //     name: "Sexto Torneo",
        //     startDate: Date.now(),
        //     finishDate: new Date("5/4/22"),
        //     moneyAvailable: 80000,
        //     inscriptions: [],
        //     coins: [
        //         "624da9ba3732602baca8deaa",
        //         "624da9ba3732602baca8dead",
        //         "624da9ba3732602baca8deac",
        //         "624da9ba3732602baca8deab",
        //         "624da9ba3732602baca8deb0",
        //         "624da9ba3732602baca8deb4",
        //         "624da9ba3732602baca8deaf"
        //     ],
        // });


        // f = new Date();
        // d = new Date();
        // d.setDate(d.getDate() - 8);
        // f.setDate(f.getDate() + 8);
        // tournament.create({
        //     name: "Septimo Torneo",
        //     startDate:d,
        //     finishDate: f,
        //     moneyAvailable: 200,
        //     inscriptions: [],
        //     coins: [
        //         "624da9ba3732602baca8deaa",
        //         "624da9ba3732602baca8dead",
        //         "624da9ba3732602baca8deac",
        //         "624da9ba3732602baca8deaf",
        //         "624da9ba3732602baca8deb5",
        //         "624da9ba3732602baca8deb4",
        //         "624da9ba3732602baca8deb2"
        //     ],
        // });

        // f = new Date();
        // d = new Date();
        // d.setDate(d.getDate() - 3);
        // f.setDate(f.getDate() + 30);
        // tournament.create({
        //     name: "Octavo  Torneo",
        //     startDate: d,
        //     finishDate: f,
        //     moneyAvailable: 100,
        //     inscriptions: [],
        //     coins: [
        //         "624da9ba3732602baca8deaa",
        //         "624da9ba3732602baca8dead",
        //         "624da9ba3732602baca8deac",
        //         "624da9ba3732602baca8deab",
        //         "624da9ba3732602baca8deb0",
        //         "624da9ba3732602baca8deb2"
        //     ],
        // });

    } catch (error) {
        console.log(error);
    }
};

module.exports = tournamentSeed;
