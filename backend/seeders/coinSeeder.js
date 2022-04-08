const mongoose = require("mongoose");

const CoinGecko = require("coingecko-api");
const coinGeckoClient = new CoinGecko();

const coinSeed = async () => {
    try {
        const coin = mongoose.model("Coin");
        let response = await coinGeckoClient.coins.all({ per_page: 100 });
        for (coinJson of response.data) {
            coin.create({
                identifier: coinJson.id,
                symbol: coinJson.symbol,
                name: coinJson.name,
                image: coinJson.image.small,
            });
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = coinSeed;
