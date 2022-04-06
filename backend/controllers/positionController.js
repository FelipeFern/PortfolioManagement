const asyncHandler = require("express-async-handler");
const Position = require("../models/positionModel");
const Inscription = require("../models/inscriptionModel");
const Coin = require("../models/coinModel");

const createPosition = asyncHandler(async (req, res) => {
    const {
        entryPrice: _entryPrice,
        buyOrder: _buyOrder,
        coin: _coinId,
        inscription: _inscriptionId,
    } = req.body;

    const position = await Inscription.create({});
    if (position) {
        Inscription.findByIdAndUpdate(_inscriptionId, {
            $push: { positions: position },
        });

        res.status(200).json({
            _id: position.id,
            entryPrice: position.entryPrice,
            entryDate: position.entryDate,
            buyOrder: position.buyOrder,
            coin: position.coin,
            inscription: position.inscription,
        });
    } else {
        return res.status(404).json({
            message:
                "Can not create the position in the inscription from params.",
        });
    }
});

const closePosition = asyncHandler(async (req, res) => {
    const { id: _id } = req.params;
    const { closePrice: _closePrice, closeDate: _closeDate } = req.body;
    try {
        const position = await Position.findById(_id);
        let difference = 0;
        if (position.buyOrder) {
            difference = position.closePrice - position.entryPrice;
        } else {
            difference = position.entryPrice - position.closePrice;
        }
        let _profit = position.quantity * difference;
        await Position.findByIdAndUpdate(_id, {
            closePrice: _closePrice,
            closeDate: _closeDate,
            _profit: _profit,
        });
        res.status(200).json(position);
    } catch (error) {}
});

const getPosition = asyncHandler(async (req, res) => {
    const { id: _id } = req.params;
    try {
        const position = await Inscription.findById(_id).exec();
        if (position === null) {
            return res.status(404).json({
                message: `The position that you trying to get, ID: ${_id} doesn't exist on the DB`,
            });
        }
        return res.status(200).json(position);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Can not get the position, it's not valid" });
    }
});

module.exports = { createPosition, getPosition, closePosition };
