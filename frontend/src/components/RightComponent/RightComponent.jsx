import React, { useState, useEffect } from "react";
import "./RightComponent.css";
import profilePicture from "../../images/profile-1.jpg";
import { MdMenu } from "react-icons/md";
import axios from "axios";

const URICoins = "http://localhost:5000/api/coingecko/coinsAPI";
const URITournamentPositions =
    "http://localhost:5000/api/tournaments/positions/625074cd29da7ab6d8897946";

function RightComponent() {
    const [available, setAvailable] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [coin, setCoin] = useState("btc");
    const [coinPrice, setCoinPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [coins, setCoins] = useState([]);
    const [tournamentPositions, setTournamentPositon] = useState([]);

    const handleSubmitDraft = (data) => {
        console.log(`
            available: ${available}
            quantity: ${quantity}
            coin: ${coin}
            Total: ${total}
            `);
    };

    const handleSubmitPreview = (data) => {
        console.log(`
        available: ${available} 
        quantity: ${quantity}
        coin: ${coin}
        Total: ${total}
        `);
    };

    const refreshData = async (_quantity, _coinPrice) => {
        let _total = _quantity * _coinPrice;
        await setTotal(_total);
    };

    const handleCoinChange = async (e) => {
        await setCoin(e.target.value);
        let _asset = coins.find((element) => element.symbol === e.target.value);
        let _coinPrice = _asset.market_data.current_price.usd;
        await setCoinPrice(parseFloat(_coinPrice).toFixed(4));
        refreshData(quantity, _coinPrice);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
        refreshData(e.target.value, coinPrice);
    };

    const fetchCoins = async () => {
        const data = await (await axios.get(URICoins)).data;
        setCoins(data);
    };

    const getTournamentPositions = async () => {
        const data = await (await axios.post(URITournamentPositions)).data;
        setTournamentPositon(data);
    };

    useEffect(() => {
        const coinsData = setInterval(() => {
            fetchCoins();
        }, 1000);

        //getTournamentPositions();

        return () => {
            clearInterval(coinsData);
        };
    }, [coins, coin, coinPrice]);

  
    return (
        <div className="right">
            

            <div className="create-position">
                <h2>Create New Positoin</h2>
                <div className="form-position">
                    <form>
                        <label>
                            Coin
                            <select
                                value={coin}
                                onChange={(e) => handleCoinChange(e)}
                            >
                                {coins.map((asset) => (
                                    <option
                                        key={asset.symbol}
                                        value={asset.symbol}
                                    >
                                        {asset.symbol.toUpperCase()}USDT
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Disponible: {available} <span>USD</span>
                        </label>

                        <label> Coin: {coin.toUpperCase()}</label>

                        <label> Price: {coinPrice} USD</label>

                        <label>
                            Quantity:
                            <input
                                type="text"
                                value={quantity}
                                required
                                onChange={(e) => handleQuantityChange(e)}
                            />
                        </label>

                        <label>Total $: {total}</label>
                        <div className="buttons">
                            <button
                                className="short"
                                onClick={handleSubmitPreview}
                            >
                                Sell Short
                            </button>
                            <button
                                className="long"
                                onClick={handleSubmitDraft}
                            >
                                Buy Long
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="leaderboard">
                <div className="table-container">
                    <div className="table-container_title">
                        <h2> Leaderboard </h2>
                    </div>
                    <table className="table-container__table">
                        <thead>
                            <tr>
                                <th> Pos</th>
                                <th>Name</th>
                                <th>Profit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {tournamentPositions.map((rank, index) => (
                                <tr key={rank._id}>
                                    <th>{index + 1} °</th>
                                    <th>{rank.user.name}</th>
                                    <th>${rank.inscription.profit}</th>
                                </tr>
                            ))} */}
                            <tr >
                                <th> 1° </th>
                                <th>Felipe</th>
                                <th>$400</th>
                            </tr>
                            <tr >
                                <th> 1° </th>
                                <th>Felipe</th>
                                <th>$400</th>
                            </tr>
                            <tr >
                                <th> 1° </th>
                                <th>Felipe</th>
                                <th>$400</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* {tournamentPositions.map((position) => (
                                    <div
                                    key={position._id}
                                    >
                                        {}USDT
                                    </div> 
                                ))} */}
        </div>
    );
}

export default RightComponent;
