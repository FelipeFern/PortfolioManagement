const CoinGecko = require("coingecko-api");
const coinGeckoClient = new CoinGecko();

const Coin = require("../models/coinModel.js");
const mongoose = require("mongoose");

const coinsAPI = async (req, res) => {
    try {
        const requestAPI = await coinGeckoClient.coins.all({ per_page: 100 , localization:false });
        console.log('Entre aca')
        console.log(requestAPI.data[0].market_data.current_price.usd)
        console.log(requestAPI.data[1].market_data.current_price.usd)
        console.log(requestAPI.data[3].market_data.current_price.usd)
        console.log('\n')
        return res.status(200).json(requestAPI.data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

const coinAPI = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const requestAPI = await coinGeckoClient.simple.price({
            ids: [ _id],
            vs_currencies: [ 'usd'],
        });
        return res.status(200).json(requestAPI.data);
    } catch (error) {
        res.json({ message: error.message });
    }
}; 

const coins = async (req, res) => {
    try {
        const response = await Coin.find();
        if (response === null) {
            return res.status(404).json({
                message: `Error trying to get all the coins from the DB.`,
            });
        }
        return res.status(200).json(response);
    } catch (error) {
        return res
            .status(404)
            .json({ message: "Failed to retrieve Coins from DB" });
    }
};

const getCoin = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const coin = await Coin.findById(_id);
        if (coin === null) {
            return res.status(404).json({
                message: `The coin that you trying to get, ID: ${_id} doesn't exist on the DB`,
            });
        }
        return res.status(200).json(coin);
    } catch (error) {
        return res
            .status(404)
            .json({ message: error });
    }
};

const coinRange = async (req, res) => {
    const { from: _from, to: _to, coinId: _coinId } = req.body;
    try {
        const requestAPI = await coinGeckoClient.coins.fetchMarketChartRange(
            _coinId,
            { from: _from, to: _to }
        );
        return res.status(200).json(requestAPI);
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = { coins, coinRange, getCoin, coinsAPI, coinAPI };
