import React, { useState, useEffect } from "react";
import "./ClosedPositions.css";

// const URIPositions = "http://localhost:5000/api/users/tournamentPostions/";

// const URICoins = "http://localhost:5000/api/coingecko/coin/";

function PositionList({ _coins, _closedTournamentPositions, title }) {
    // const [tournamentPositions, setTournamentPositon] = useState([
    //     _tournamentPositions,
    // ]);
   

    // const insertCoins = async () => {
    //      let arreglo = []

    //     for (let elem of tournamentPositions) {
    //         const url = URICoins + elem.coin;
    //         const data = await (await axios.get(url)).data;
    //         arreglo.push(data)
    //     }
    //     setCoins(_coins);
    // };

    // const userPositions = async () => {
    //     const data = await (
    //         await axios.post(URIPositions+ _user, {
    //             tournament: "625074cd29da7ab6d8897946",
    //         })
    //     ).data;
    //     setTournamentPositon(data);
    //     await insertCoins();

    // };

    useEffect(async () => {
        // await userPositions();
        //console.log(coins);
    }, []);

    return (
        <div className="recent-order">
            {_closedTournamentPositions.length > 0 ? (
                <div>
                    <h2>{title}</h2>
                    <table className="table-container__table">
                        <thead>
                            <tr>
                                <th>Coin</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Entry Price</th>
                                <th>Close Price</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {_closedTournamentPositions.map(
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
                                                : "Short"}
                                        </td>

                                        <th> {_position.position.quantity}</th>
                                        <th>
                                            {" "}
                                            ${_position.position.entryPrice}
                                        </th>
                                        <th>
                                            {" "}
                                            ${_position.position.closePrice}
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
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h1>This tournament has no positions</h1>
            )}
        </div>
    );
}

export default PositionList;
