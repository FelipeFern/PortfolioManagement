const asyncHandler = require("express-async-handler");
const Inscription = require("../models/inscriptionModel");
const Tournament = require("../models/tournamentModel");
const Position = require("../models/positionModel");
const User = require("../models/userModel");
const res = require("express/lib/response");

const createInscription = asyncHandler(async (req, res) => {
    const { userId: _userId, tournamentId: _tournamentId , moneyAvailable: _moneyAvailable} = req.body;
    try {
        const inscription = await Inscription.create({
            user: _userId,
            tournament: _tournamentId,
            score: _moneyAvailable
        });


        if (inscription === null) {
            return res.status(404).json({
                message: `The inscription that you trying to get, ID: ${_id} doesn't exist on the DB`,
            });
        }
         await updateModels(_userId, _tournamentId, inscription._id.toString())
        return res.status(200).json(inscription);
    } catch (error) {
        return res.status(404).json({
            message: "Can not create the insctiption on the tournament",
        });
    }
});

const updateModels = async (_userId, _tournamentId, _inscriptionId) => {
     Tournament.findOne({_id: _tournamentId}, function(err, tournament){
        if(err) return res.status(404).json(err);
        if(!tournament) return res.status(404).json(err);

        tournament.inscriptions.push(_inscriptionId);

        tournament.save(function(err) {
            if (err) return res.status(400).json(err)
            console.log('Se actualizo bien')
        })
    })
   
    User.findOne({_id: _userId}, function(err, user){
        if(err) return res.status(404).json(err);
        if(!user) return res.status(404).json(err);

        user.inscriptions.push(_inscriptionId);

        user.save(function(err) {
            if (err) return res.status(400).json(err)
            console.log('Se actualizo bien')
        })
    })
};

const getInscription = asyncHandler(async (req, res) => {
    const { id: _id } = req.params;
    try {
        const inscription = await Inscription.findById(_id).exec();
        if (inscription === null) {
            return res.status(404).json({
                message: `The inscription that you trying to get, ID: ${_id} doesn't exist on the DB`,
            });
        }

        const _user = await User.findById(inscription.user.toString()).exec();
        const toReturn = {
            inscription: inscription,
            user: _user,
        };

        return res.status(200).json(toReturn);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Can not get the inscription, it's not valid" });
    }
});

// NO creo que funciones, por cuando pido la Inscirpion (73) - Ni tampoco cuando pido la posicion.
const getInscriptionPositions = asyncHandler(async (req, res) => {
    const { _user: user, _tournament: tournament } = req.body;
    try {
        let toReturn = [];
        const _inscription = await Inscription.findOne({
            user: _user,
            tournament: _tournament,
        });
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
});

module.exports = { createInscription, getInscription };
