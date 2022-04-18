import React, { useState, useEffect } from "react";
import "./PositionList.css";
import axios from "axios";

const URIPositions =
    "http://localhost:5000/api/users/tournamentPostions/62506acceecaa7c367b162c1";

const URICoins = "http://localhost:5000/api/coingecko/coin/";

function PositionList( { _coins, _tournamentPositions }) {
    
    const [tournamentPositions, setTournamentPositon] = useState([]);
    const [coins, setCoins] = useState([]);
 
    const insertCoins = async () => {
         let arreglo = []
        // console.log('torieno')
        // console.log(tournamentPositions)
        for (let elem of tournamentPositions) {
            const url = URICoins + elem.coin;
            const data = await (await axios.get(url)).data;
            arreglo.push(data)
        }
        //console.log(arreglo);
        setCoins(_coins);
        console.log(_coins)
        console.log(coins)
    };

    const userPositions = async () => {
        const data = await (
            await axios.post(URIPositions, {
                tournament: "625074cd29da7ab6d8897946",
            })
        ).data;
        setTournamentPositon(data);
        //console.log("Posiciones se cargaorn bien");
        await insertCoins();

    };

    useEffect(async () => {
        await userPositions();  
        //console.log(coins);
    }, []);

    return (
        <div className="recent-order">
            <h2>Tournament Positions</h2>
            <table>
                <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Quantity</th>
                        <th>Entry Price</th>
                        <th>Current Price</th>
                        <th>Profit</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tournamentPositions.map((position, index) => (
                        <tr key={position._id}>
                             <td>{ coins[index]?.symbol.toUpperCase() || 0}</td> 
                            <td>{position.quantity}</td>
                            <td>{position.entryPrice}</td>
                            <td> {coins[index]?.identifier || 0} </td> 
                            <td>{position.profit}</td>
                            <td className="primary">Close Position</td>
                        </tr>
                    ))}

                    <tr>
                        <td>Symbol</td>
                        <td>Quantity</td>
                        <td>Entry Price</td>
                        <td>Currrent Price</td>
                        <td>Profit</td>
                        <td className="primary">Close Position</td>
                    </tr>
                    <tr>
                        <td>Symbol</td>
                        <td>Quantity</td>
                        <td>Entry Price</td>
                        <td>Currrent Price</td>
                        <td>Profit</td>
                        <td className="primary">Close Position</td>
                    </tr>
                    <tr>
                        <td>Symbol</td>
                        <td>Quantity</td>
                        <td>Entry Price</td>
                        <td>Currrent Price</td>
                        <td>Profit</td>
                        <td className="primary">Close Position</td>
                    </tr>
                    <tr>
                        <td>Symbol</td>
                        <td>Quantity</td>
                        <td>Entry Price</td>
                        <td>Currrent Price</td>
                        <td>Profit</td>
                        <td className="primary">Close Position</td>
                    </tr>
                </tbody>
            </table>
            <a href="#">Show All</a>
        </div>
    );
}

export default PositionList;
