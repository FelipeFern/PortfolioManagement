const Binance = require("node-binance-api");
const dotenv = require("dotenv");
dotenv.config();

const binance = new Binance().options({
    APIKEY: "FRWJnL0L18w1Xzd6kwcIVYOlViGc1TBavj8HVUawg9jlQnAHbxCJriX10HObv69v",
    APISECRET:
        "J0VBWUp5jHqqTGFuE3C1zQw6dbdP2PMBbgDaKqhTWLlgGOOETcY9w1g1s3HLgfm4",
});

// -----------------------------------------------------------------------------------------------
const http = require("http");
const port = process.env.PORTSOCKET || 8080;
const express = require("express");
const WebSocket = require("ws");
const server = http.createServer(express);

const wss = new WebSocket.Server({ server });

const url = "ws://localhost:8080";

//const clients = new Set();

const sendMessage = (message) => {};

wss.on("connection", function connection(websocket) {
    console.log("New client connected");

    // const clientRef = {
    //     socket: websocket,
    // };

    // clients.add(clientRef);

    websocket.on("message", (message) => {
        wss.clients.forEach(function each(client) {
            if (client !== websocket && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    websocket.on("close", (code, reason) => {
        console.log(
            `Client disconnected with code ${code} and reason ${reason}`
        );
        // clients.delete(clientRef);
    });
});

server.listen(port, function () {
    console.log(`Server is listening on ${port}`);
});

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

const prevDay = asyncHandler(async (req, res) => {
    try {
        const connection = new WebSocket(url);
        connection.onopen = () => {
            console.log("PrevDay Socket initialized from server");
        };

        await binance.balance(async (error, balances) => {
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

                                //connection.send(JSON.stringify(message));
                                //console.log(message);
                                //console.log("Mensaje" +message);
                                //filtered[k] = message;
                                //console.log(JSON.stringify(message));
                            }
                        );
                    }
                    //console.log('Llegue');
                    //   console.log({coin: k, balance: balances[k].available} )
                    //   connection.send({coin: k, balance: balances[k].available})
                }
            }

            console.log(filtered);
            connection.send(JSON.stringify("un mensaje"));
            connection.send(JSON.stringify(filtered));
            connection.send(JSON.stringify("Un mensaje nuevo"));
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

// const getUniqueID = () => {
//     const s4 = () =>
//         Math.floor((1 + Math.random()) * 0x10000)
//             .toString(16)
//             .substring(1);
//     return s4() + s4() + "-" + s4();
// };

// wss.on("request", function (request) {
//     var userID = getUniqueID();
//     console.log(
//         new Date() +
//             "Recieved a new connection from origin" +
//             request.origin +
//             "."
//     );

//     // aca capaz tendría que agregar código para aceptar solo los request from allowed origin
//     // En el tuto hacen asi:
//     const connection = request.accept(null, request.origin);
//     clients[userID] = connection;
//     console.log(
//         "connected: " + userID + "in" + Object.getOwnPropertyNames(clients)
//     );
// });
