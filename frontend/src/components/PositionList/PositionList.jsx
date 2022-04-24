import React, { useState, useEffect } from "react";
import "./PositionList.css";
import axios from "axios";
import { element } from "prop-types";
import { useNavigate } from "react-router-dom";

const URIPositions = "http://localhost:5000/api/users/tournamentPostions/";

const URICoinsAPIAll = "http://localhost:5000/api/coingecko/coinsAPI";
const URICoinsAPI = "http://localhost:5000/api/coingecko/coinsAPI/";
const URIClosePosition = "http://localhost:5000/api/positions/close/";

function PositionList({
    _coins,
    _openTournamentPositions,
    _closedTournamentPositions,
    title,
}) {
    const navigate = useNavigate();
    const [openTournamentPositions, setopenTournamentPositions] = useState(
        _openTournamentPositions
    );
    const [coins, setCoins] = useState([_coins]);

    const closePosition = async (_positionId, coin, price) => {
        const closeDate = Date.now();
        const closePrice = price;
        const data = await (
            await axios.post(URIClosePosition + _positionId, {
                closePrice,
                closeDate
            })
        ).data;
    };

    const refreshCoins = async () => {
        const data = await (await axios.get(URICoinsAPIAll)).data;
        setCoins(data);
    };

    const price = (_id) => {
        let toReturn = 0;

        if (coins.length > 0) {
            let aux = coins.find((coin) => (coin.id == _id));
            if (aux !== undefined) {               
                toReturn = aux.market_data.current_price.usd;
            }
        }
        return toReturn;
    };

    useEffect(() => {
        const coinsData = setInterval(() => {
            refreshCoins();
        }, 10000);

        return () => {
            clearInterval(coinsData);
        };
    }, [coins]);

    return (
        <div className="recent-order">
            {    _openTournamentPositions.length === 0 ? (
                <h2>Currently no Open Positions</h2>
            ) : (
                <>
                    <h2>{title}</h2>
                    <table className="table-container__table">
                        <thead>
                            <tr>
                                <th>Coin</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Entry Price</th>
                                <th>Price</th>
                                <th>Profit</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {_openTournamentPositions.map(
                                (_position, index) => (
                                    <tr key={_position.coin.symbol}>
                                        <th className="th-img-name">
                                            <img src={_position.coin.image} />
                                            {_position.coin.symbol.toUpperCase()}
                                        </th>
                                        <td
                                            style={
                                                _position.position.buyOrder
                                                    ? { color: "lawngreen" }
                                                    : { color: "orangered" }
                                            }
                                        >
                                            {" "}
                                            {_position.position.buyOrder
                                                ? "Long"
                                                : "Long"}
                                        </td>

                                        <th> {_position.position.quantity}</th>
                                        <th>
                                            {" "}
                                            ${_position.position.entryPrice}
                                        </th>
                                        <th>
                                            {" "}
                                            ${price(_position.coin.identifier)}
                                        </th>
                                        <td
                                            style={
                                                _position.position.profit > 0
                                                    ? { color: "lawngreen" }
                                                    : { color: "orangered" }
                                            }
                                        >
                                            {" "}
                                            ${_position.position.profit}
                                        </td>
                                        <th>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    closePosition(
                                                        _position._id,
                                                        _position.coin
                                                            .identifier,
                                                            price(_position.coin.identifier)   
                                                    );
                                                }}
                                            >
                                                {" "}
                                                Close Position
                                            </button>
                                        </th>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default PositionList;
