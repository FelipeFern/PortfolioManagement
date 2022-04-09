const mongoose = require("mongoose");

const tournamentSeed = async () => {
    try {
        const tournament = mongoose.model("Tournament");
        tournament.create({
            name: 'Primer  Torneo',
            startDate: Date.now(),
            finishDate: new Date("5/1/22"),
            moneyAvailable: 100,
            inscriptions: [],
            coins: [
                "624da9ba3732602baca8deaa",
                "624da9ba3732602baca8dead",
                "624da9ba3732602baca8deac",
            ],
        });

        tournament.create({
            name: 'Segundo Torneo',
            startDate: Date.now(),
            finishDate: new Date("5/2/22"),
            moneyAvailable: 200,
            inscriptions: [],
            coins: [
                "624da9ba3732602baca8deaa",
                "624da9ba3732602baca8dead",
                "624da9ba3732602baca8deac",
            ],
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = tournamentSeed;


