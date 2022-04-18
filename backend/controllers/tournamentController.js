const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");
const Inscription = require("../models/inscriptionModel");
const User = require("../models/userModel");
const InscriptionController = require("../controllers/inscriptionController");

const createTournament = asyncHandler(async (req, res) => {
    const { startDate, finishDate, moneyAvailable, coins } = req.body;

    const tournament = await Tournament.create({
        startDate,
        finishDate,
        moneyAvailable,
        coins,
    });
    if (tournament) {
        res.status(200).json({
            _id: tournament.id,
            startDate: tournament.startDate,
            finishDate: tournament.finishDate,
            coins: tournament,
            moneyAvailable: tournament.moneyAvailable,
        });
    } else {
        return res
            .status(404)
            .json({ message: "Can not create the tournament" });
    }
});

const deleteTournament = asyncHandler(async (req, res) => {
    const { id: _id } = req.params;
    try {
        const tournament = await Tournament.findOne({ _id });
        const responseTournament = await tournament.remove();
        const responseInscriptions = await Inscription.updateMany(
            { _id: tournament.inscriptions },
            { $pull: { tournament: tournament._id } }
        );
        if (responseTournament === null) {
            return res.status(404).json({
                message: `The tournament that you're trying to delete, ID: ${id} doesn't exist on the DB`,
            });
        }
        if (responseInscriptions === null) {
            return res.status(404).json({
                message: `The inscriptions that you're trying to delete, ID: ${id} doesn't exist on the DB`,
            });
        }
        return res.status(200).json({ id: id });
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Can not delete the tournament" });
    }
});

const getTournament = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const tournament = await Tournament.findById(id).exec();
        if (tournament === null) {
            return res.status(404).json({
                message: `The tournament that you trying to get, ID: ${id} doesn't exist on the DB`,
            });
        }
        return res.status(200).json(tournament);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Can not get the tournamenet, it's not valid" });
    }
});

const getTournaments = asyncHandler(async (req, res) => {
    try {
        let toReturn = [];
        const response = await Tournament.find();
        if (response === null) {
            return res.status(404).json({
                message: `Error trying to get all the tournaments from the DB.`,
            });
        }

        for (let _tournament of response) {
            let _inscriptionsToReturn = [];
            for (let _inscriptionId of _tournament.inscriptions) {
                let _id = _inscriptionId.toString();
                const _inscription = await Inscription.findById(_id).exec();
                _inscriptionsToReturn.push(_inscription);
            }
            const toInsert = {
                tournament: _tournament,
                inscriptions: _inscriptionsToReturn,
            };
            toReturn.push(toInsert);
        }

        return res.status(200).json(toReturn);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Failed to retrieve Tournaments from DB" });
    }
});


//ME TIRA ERROR PORQUE LOS DATOS DE LOS SEEDERS NO SON VALIDOS.
// Pero para mi esta bien, debería andar, === Lo unico que podría tirarme problemas es el toReturn, POR SI LEE STOY AGREGANDO MAL LOS DATOS AL JSON
// Capaz lo tengo que parsear a JSON para que funcione.
const getTournamentPositions = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        let toReturn = [];
        const tournament = await Tournament.findById(id).exec();
        if (tournament === null) {
            return res.status(404).json({
                message: `The tournament that you trying to get, ID: ${id} doesn't exist on the DB`,
            });
        }

        for (let _inscriptionId of tournament.inscriptions) {
            let _id = _inscriptionId.toString();
            const _inscription = await Inscription.findById(_id).exec();
            const _user = await User.findById(
                _inscription.user.toString()
            ).exec();
            const toInsert = {
                user: _user,
                inscription: _inscription,
            };
            toReturn.push(toInsert);
        }
        toReturn.sort((a, b) => {
            return a.inscription.profit - b.inscription.profit;
        });
        return res.status(200).json(toReturn);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Can not get the tournamenet, it's not valid" });
    }
});

module.exports = {
    createTournament,
    deleteTournament,
    getTournament,
    getTournaments,
    getTournamentPositions,
};
