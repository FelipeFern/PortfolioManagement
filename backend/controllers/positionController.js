const asyncHandler = require("express-async-handler");
const Position = require("../models/positionModel");
const Inscription = require("../models/inscriptionModel");
const Coin = require("../models/coinModel");

const createPosition = asyncHandler(async (req, res) => {
    const {
        entryPrice,
        coin,
        inscription,
        quantity,
        buyOrder,
    } = req.body;

    const position = await Position.create({
        entryPrice,
        entryDate: Date.now(),
        coin,
        inscription,
        quantity,
        buyOrder
    });
    if (position) {
        Inscription.findOne(
            { _id: inscription },
            function (err, inscriptiona) {
                if (err) return res.status(404).json(err);
                if (!inscriptiona) return res.status(404).json(err);

                inscriptiona.positions.push(position._id.toString());

                inscriptiona.save(function (err) {
                    if (err) return res.status(400).json(err);
                    console.log("Se actualizo bien");
                });
            }
        );

        res.status(200).json(position);
    } else {
        return res.status(404).json({
            message:
                "Can not create the position in the inscription from params.",
        });
    }
});

const closePosition = asyncHandler(async (req, res) => {
    const { id} = req.params;
    const { closePrice: _closePrice, closeDate: _closeDate } = req.body;
    try {
        console.log(_closePrice, _closeDate)
        const position = await Position.findById(id);
        let difference = 0;
        if (position.buyOrder) {
            difference = position.closePrice - position.entryPrice;
        } else {
            difference = position.entryPrice - position.closePrice;
        }
        let _profit = position.quantity * difference;
        await Position.findByIdAndUpdate(id, {
            closePrice: _closePrice,
            closeDate: _closeDate,
            _profit: _profit,
        });


        Position.findOne(
            { _id: id },
            function (err, _position) {
                if (err) return res.status(404).json(err);
                if (!_position) return res.status(404).json(err);

                _position.closePrice =_closePrice;
                _position.closeDate = _closeDate;
                _position._profit = _profit

                _position.save(function (err) {
                    if (err) return res.status(400).json(err);
                    console.log("Se actualizo bien");
                });
            }
        );

        res.status(200).json({position, _profit, _closeDate, _closePrice});
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
