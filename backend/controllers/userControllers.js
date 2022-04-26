const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Tournament = require("../models/tournamentModel");
const Inscription = require("../models/inscriptionModel");
const Position = require("../models/positionModel");
const Coin = require("../models/coinModel");
const generateToken = require("../utils/generateToken");
const CoinGecko = require("coingecko-api/lib/CoinGecko");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Error Ocurred on created new user");
    }

    res.json({
        name,
        email,
    });
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    try {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } catch (error) {
        return res.status(400).json(error)
    }
   console.log()
});

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await User.findByIdAndDelete(id);
        if (response === null) {
            return res.status(404).json({
                message:
                    "El usuario solictado no se encuenta en la base de datos",
            });
        }
        return res.status(200).json({ id: id });
    } catch (error) {
        return res
            .status(404)
            .json({ message: "No se ha podido eliminar al usuario" });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id).exec();
        if (user === null) {
            return res.status(404).json({
                message: `El usuario con el ID: ${id}, no existe en la base de datos!`,
            });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

const getTournamentsRegistered = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        //const user = req.user;
        //console.log(user);

        const response = await Inscription.find({ user: id });
        const inscriptionsArray = [];
        for (insciption of response) {
            inscriptionsArray.push(insciption._id);
        }
        const tournaments = await Tournament.find({
            inscriptions: { $in: inscriptionsArray },
        });
        res.status(200).json(tournaments);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

const getTournamentsUnregistered = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        //const user = req.user;
        //console.log(user);

        const response = await Inscription.find({ user: id });
        const inscriptionsArray = [];
        for (insciption of response) {
            inscriptionsArray.push(insciption._id);
        }
        const tournaments = await Tournament.find({
            inscriptions: { $not: { $in: inscriptionsArray } },
        });
        res.status(200).json(tournaments);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

// Checked
const getPositionTournament = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { tournament } = req.body;
    try {
        const toReturn =[]
        const response = await Inscription.findOne({
            user: id,
            tournament: tournament,
        });
        const positions = await Position.find({
            _id: { $in: response.positions },
        });

        for (let _position of positions) {
            let _inscriptionId = _position.inscription.toString();
            let _inscription = await Inscription.findById(_inscriptionId).exec();
            let _userId = _inscription.user.toString();
            let _user = await User.findById(_userId).exec();
            let toInsert = {
                position: _position,
                user: _user,
            };
            toReturn.push(toInsert);
        }

        toReturn.sort(function(a, b) {
            return b.position.profit - a.position.profit;
          });

        res.status(200).json(toReturn);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});


// Checked
const getClosedPositionsTournament = asyncHandler(
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { tournament } = req.body;
        const toReturn = [];
        try {
            const response = await Inscription.findOne({
                user: id,
                tournament: tournament,
            });

            const positions = await Position.find({
                _id: { $in: response.positions },
                closeDate: { $lte: Date.now() },
            });

            for (let _position of positions) {
                let _coinId = _position.coin.toString();
                let _coin = await Coin.findById(_coinId).exec();
                let toInsert = {
                    position: _position,
                    coin: _coin,
                };
                toReturn.push(toInsert);
            }

            res.status(200).json(toReturn);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    })
);

const getOpenPositionsTournament = asyncHandler(
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { tournament } = req.body;
        let toReturn = [];
        try {
            const response = await Inscription.findOne({
                user: id,
                tournament: tournament,
            });
            const positions = await Position.find({
                _id: { $in: response.positions },
                closeDate: { $not: { $exists: true } }, // Esto nose si esta bien, pero hasta no crear el seeder, no lo voy a poder probar.
            });

            for (let _position of positions) {
                let _coinId = _position.coin.toString();
                let _coin = await Coin.findById(_coinId).exec();
                let toInsert = {
                    position: _position,
                    coin: _coin,
                };
                toReturn.push(toInsert);
            }

            return res.status(200).json(toReturn);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    })
);

const getInscription = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { tournament } = req.body;
    try {
        const response = await Inscription.findOne({
            user: id,
            tournament: tournament,
        });
      
        res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});

module.exports = {
    registerUser,
    deleteUser,
    authUser,
    getUsers,
    getUser,
    getTournamentsRegistered,
    getTournamentsUnregistered,
    getPositionTournament,
    getClosedPositionsTournament,
    getOpenPositionsTournament,
    getInscription,
};
