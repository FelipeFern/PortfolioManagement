import React, { useState, useEffect } from "react";
import "./PositionList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const URIPositions = "http://localhost:5000/api/users/tournamentPostions/";

const URICoinsAPIAll = "https://final-iaw.herokuapp.com/api/coingecko/coinsAPI";
// const URICoinsAPI = "http://localhost:5000/api/coingecko/coinsAPI/";
const URIClosePosition = "https://final-iaw.herokuapp.com/api/positions/close/";

function PositionList({
    tournamentId,
    _coins,
    _openTournamentPositions,
    _closedTournamentPositions,
    title,
}) {
    // const [openTournamentPositions, setopenTournamentPositions] = useState(
    //     _openTournamentPositions
    // );
    const navigate = useNavigate();
    const [coins, setCoins] = useState([_coins]);

    //TO-DO que funcione
    const closePosition = async (_positionId, coin, price) => {
        const closeDate = Date.now();
        const closePrice = price;
        const _uri = URIClosePosition + _positionId;
        const data = await axios.post(_uri, {
            closePrice,
            closeDate,
        });
        window.location.reload(true);
    };

    const getCurrentProfit = (_buyOrder, _entryPrice, _quantity, _coinId) => {
        let toReturn = 0;
        const _price = price(_coinId);

        _buyOrder
            ? (toReturn = (_price - _entryPrice) * _quantity)
            : (toReturn = (_entryPrice - _price) * _quantity);

        return toReturn.toFixed(2);
    };

    const refreshCoins = async () => {
        const data = await (await axios.get(URICoinsAPIAll)).data;
        setCoins(data);
    };

    const price = (_id) => {
        let toReturn = 0;

        if (coins.length > 0) {
            let aux = coins.find((coin) => coin.id == _id);
            if (aux !== undefined) {
                toReturn = aux.market_data.current_price.usd;
            }
        }
        return toReturn;
    };

    useEffect(() => {
        const coinsData = setInterval(() => {
            refreshCoins();
        }, 4000);

        return () => {
            clearInterval(coinsData);
        };
    }, [coins]);

    return (
        <div className="recent-order">
            {_openTournamentPositions.length === 0 ? (
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
                                    <tr key={_position.position._id}>
                                        <th className="th-img-name">
                                            <img
                                                alt="Logo-IMG"
                                                src={_position.coin.image}
                                            />
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
                                                : "Short"}
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
                                                getCurrentProfit(
                                                    _position.position.buyOrder,
                                                    _position.position
                                                        .entryPrice,
                                                    _position.position.quantity,
                                                    _position.coin.identifier
                                                ) > 0
                                                    ? { color: "lawngreen" }
                                                    : { color: "orangered" }
                                            }
                                        >
                                            {" "}
                                            $
                                            {getCurrentProfit(
                                                _position.position.buyOrder,
                                                _position.position.entryPrice,
                                                _position.position.quantity,
                                                _position.coin.identifier
                                            )}
                                        </td>
                                        <th>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    closePosition(
                                                        _position.position._id,
                                                        _position.coin
                                                            .identifier,
                                                        price(
                                                            _position.coin
                                                                .identifier
                                                        )
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
