import React, { useState, useEffect } from "react";
import "./ClosedPositions.css";

function PositionList({  _closedTournamentPositions, title }) {
    

    useEffect(async () => {
        
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
                                    <tr key={_position.position._id}>
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
                <h2>This tournament has no closed positions</h2>
            )}
        </div>
    );
}

export default PositionList;
