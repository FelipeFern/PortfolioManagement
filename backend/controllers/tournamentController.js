const asyncHandler = require("express-async-handler");
const Tournament = require("../models/tournamentModel");
const Inscription = require("../models/inscriptionModel");

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

module.exports = { createTournament, deleteTournament, getTournament };
