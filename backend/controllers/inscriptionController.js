const asyncHandler = require("express-async-handler");
const Inscription = require("../models/inscriptionModel");
const Tournament = require("../models/tournamentModel");
const Position = require("../models/positionModel");
const User = require("../models/userModel");

const createInscription = asyncHandler(async (req, res) => {
    const { userId: _userId, tournamentId: _tournamentId } = req.body;

    // No se si estaran bien como los agregue, capaz hay que castear algo. O capaz se tiene que guardar solo los ID, y no el objeto completo.
    const inscription = await Inscription.create({
        user: _userId,
        tournament: _tournamentId,
    });
    if (inscription) {
        Tournament.findByIdAndUpdate(
            _tournamentId,
            { $push: { inscriptions: inscription } }
        );

        User.findByIdAndUpdate(
            _userId,
            { $push: { inscriptions: inscription } }
        );

        res.status(200).json({
            _id: inscription.id,
            inscriptionDate: inscription.inscriptionDate,
            tournament: inscription.tournament,
            user: inscription.user,
            profit: inscription.profit,
            score: inscription.score,
        });
    } else {
        return res.status(404).json({
            message: "Can not create the insctiption on the tournament",
        });
    }
});

const getInscription = asyncHandler(async (req, res) => {
    const { _id } = req.params;
    try {
        const inscription = await Inscription.findById(_id).exec();
        if (inscription === null) {
            return res.status(404).json({
                message: `The inscription that you trying to get, ID: ${_id} doesn't exist on the DB`,
            });
        }

        const _user = await User.findById(
            inscription.user.toString()
        ).exec();

        const toReturn = {
            inscription: inscription,
            user: _user
        }

        return res.status(200).json(toReturn);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Can not get the inscription, it's not valid" });
    }
});

// NO creo que funciones, por cuando pido la Inscirpion (73) - Ni tampoco cuando pido la posicion. 
const getInscriptionPositions = asyncHandler(async (req, res) => {
    const {_user: user, _tournament: tournament} = req.body;
    try {
        let toReturn = [];
        const _inscription = await Inscription.findOne({user: _user, tournament: _tournament});
        if (_inscription === null) {
            return res.status(404).json({
                message: `The inscription that you trying to get, UserID: ${user} doesn't exist on the DB`,
            });
        }

        for (let _positionId of _inscription.positions) {
            let _id = _positionId.toString();
            const _position = await Position.findById(_id).exec();
            toReturn.push(_position);
        }
        return res.status(200).json(toReturn);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Can not get the inscription, it's not valid" });
    }



})


module.exports = { createInscription, getInscription };
