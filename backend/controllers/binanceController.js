const Binance = require("node-binance-api");
const dotenv = require("dotenv");
dotenv.config();

const binance = new Binance().options({
    APIKEY: "FRWJnL0L18w1Xzd6kwcIVYOlViGc1TBavj8HVUawg9jlQnAHbxCJriX10HObv69v",
    APISECRET:
        "J0VBWUp5jHqqTGFuE3C1zQw6dbdP2PMBbgDaKqhTWLlgGOOETcY9w1g1s3HLgfm4",
});

// -----------------------------------------------------------------------------------------------




// -----------------------------------------------------------------------------------------------
const asyncHandler = require("express-async-handler");

const spotBalance = asyncHandler(async (req, res) => {
    try {
        const requestAPI = await binance.balance();
        res.status(200).json({
            spotBalance: requestAPI,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

const futuresPrices = asyncHandler(async (req, res) => {
    try {
        const requestAPI = await binance.futuresPrices();
        res.status(200).json({
            data: requestAPI,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

const futuresBalance = asyncHandler(async (req, res) => {
    try {
        const requestAPI = await binance.futuresBalance();
        res.status(200).json({
            data: requestAPI,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});

const balance = asyncHandler(async (req, res) => {
    try {
        const requestAPI = await binance.balance();
        res.status(200).json({
            data: requestAPI,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
});


const prevDay = asyncHandler(async (req, res) => {
    try {       

        const requestAPI = await binance.balance(async (error, balances) => {
            if (error) return console.error(error);
            let filtered = [];
            for (let k of Object.keys(balances)) {
                if (balances[k].available > 0) {
                    filtered.push({ coin: k, balance: balances[k] });
                    //filtered[k] = {"coin" :balances[k]};
                    let name = k;
                    if (k !== "USDT") {
                        name += "USDT";
                    }
                    if (k !== "SOLO") {
                        await binance.prevDay(
                            name,
                            (error, prevDay, symbol) => {
                                console.log("entre aca");
                                filtered.push({
                                    socketName: "balance",
                                    balance: balances[k],
                                    prevDay: prevDay,
                                    available: balances[k].available,
                                    symbol: symbol,
                                });

                            }
                        );
                    }
                   
                }
            }

            
        });

        // binance.prevDay(false, (error, response) => {
        //     for(let obj of response){
        //         let symbol = obj.symbol;
        //         console.log("Symbol = " +symbol);
        //         num ++;
        //     }
        //     console.log('Numeor = '+ num);
        //     //connection.send(JSON.stringify(response));
        // });
    } catch (error) {
        res.json({ messageError: error.message });
    }
});

module.exports = { spotBalance, futuresBalance, futuresPrices, prevDay };


