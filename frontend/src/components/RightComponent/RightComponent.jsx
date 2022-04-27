import React, { useState, useEffect } from "react";
import "./RightComponent.css";
import axios from "axios";

const URICreatePosition = "https://final-iaw.herokuapp.com/api/positions/";
const URICoins =
    "https://final-iaw.herokuapp.com/api/tournaments/coins/625ec361b5f1244a7d437a39";
const URIGetInscription =
    "https://final-iaw.herokuapp.com/api/users/inscription/";

function RightComponent({
    tournamentCoins,
    APIcoins,
    createPositions,
    tournamentId,
}) {
    const user = localStorage.getItem("userId");
    const [available, setAvailable] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [coin, setCoin] = useState("btc");
    const [coinPrice, setCoinPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [coins, setCoins] = useState([]);
    const [message, setMessage] = useState("Un Mensajeas");
    const [message_div, setMessageDiv] = useState("message_div_hidden");
    const [time , setTime] = useState(new Date())

    const handleSubmitPosition = async (_buyOrder) => {
        console.log(user)
        const _inscription = await axios.post(
            URIGetInscription + JSON.parse(user),
            {
                tournament: tournamentId,
            }
        );

        let _coin = coins.find((c) => c.symbol == coin);

        const { data } = await axios.post(URICreatePosition, {
            inscription: _inscription.data._id,
            coin: _coin._id,
            quantity: quantity,
            buyOrder: _buyOrder,
            entryPrice: coinPrice,
        });
        window.location.reload(true);
        showMessage("Se creo una nueva posicion ....");
    };

    const showMessage = async (msg) => {
        setMessage(msg);
        setMessageDiv("message_div");
    };

    const refreshData = async (_quantity, _coinPrice) => {
        let _total = _quantity * _coinPrice;
        let _quantityAux = _quantity;
        if (_total > available) {
            _quantityAux = (available / _coinPrice).toFixed(4);
            await setQuantity(_quantityAux);
            await setTotal(available);
        } else {
            await setTotal(_total);
        }
    };

    const handleCoinChange = async (e) => {
        await setCoin(e);
        let _asset = coins.find((element) => element.symbol === e);
        let _coinPrice = _asset.current_price;
        await setCoinPrice(parseFloat(_coinPrice));
        refreshData(quantity, _coinPrice);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
        refreshData(e.target.value, coinPrice);
    };

    const price = (_id) => {
        let toReturn = 0;

        if (APIcoins.length > 0) {
            let aux = APIcoins.find((coin) => coin.id == _id);
            if (aux !== undefined) {
                toReturn = aux.market_data.current_price.usd;
            }
        }
        return toReturn;
    };

    const setMyTime =() =>  {
       setTime(new Date());
    }

    useEffect(() => {
        const fetchInscription = async () => {
            const _inscription = await axios.post(
                URIGetInscription + JSON.parse(user),
                {
                    tournament: tournamentId,
                }
            );
            await setAvailable(_inscription.data.score);
        };

        fetchInscription();
        setCoins(tournamentCoins);

        const coinsData = setInterval(() => {
            setCoins(tournamentCoins);
            setMyTime()
        }, 3000);

        return () => {
            clearInterval(coinsData);
        };
    }, [APIcoins, tournamentCoins, time]);

    return (
        <div className="right">
            {createPositions && (
                <div>
                    <div className="create-position">
                        <h2>Create New Positoin</h2>
                        <div className="form-position">
                            <form>
                                <label className="_label_coin">
                                    Coin: &nbsp; {coin.toUpperCase()}USD
                                </label>
                                <label>
                                    Available: &nbsp; {available}{" "}
                                    <span>USD</span>
                                </label>

                                <label> Coin: &nbsp;{coin.toUpperCase()}</label>

                                <label> Price: &nbsp; {coinPrice}</label>

                                <label>
                                    Quantity:
                                    <input
                                        type="text"
                                        value={quantity}
                                        required
                                        onChange={(e) =>{
                                            e.preventDefault()
                                            handleQuantityChange(e)}
                                        }
                                    />
                                </label>

                                <label>Total: &nbsp;{total} USD</label>
                                <div className="buttons">
                                    <button
                                        className="short"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubmitPosition(false);
                                        }}
                                    >
                                        Sell Short
                                    </button>
                                    <button
                                        className="long"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleSubmitPosition(true);
                                        }}
                                    >
                                        Buy Long
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className={message_div}>
                        <span>{message}</span>
                    </div>
                </div>
            )}

            <div className="coins">
                <div className="table-container">
                    <div className="table-container_title">
                        <h2> Tournament Coins </h2>
                    </div>
                    <table className="table-container__table">
                        <thead>
                            <tr>
                                <th>Coin</th>
                                <th>Price</th>
                                <th>24h</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coins.map((_coin) => (
                                <tr
                                    key={_coin.symbol}
                                    onClick={() =>
                                        handleCoinChange(_coin.symbol)
                                    }
                                >
                                    <th className="th-img-name">
                                        <img
                                            alt="Coin-icon"
                                            src={_coin.image}
                                        />
                                        {_coin.symbol.toUpperCase()}
                                    </th>
                                    <th> $ {price(_coin.identifier)} </th>
                                    <td
                                        style={
                                            _coin.price_change_percentage_24h >
                                            0
                                                ? { color: "lawngreen" }
                                                : { color: "orangered" }
                                        }
                                    >
                                        {" "}
                                        {_coin.price_change_percentage_24h.toFixed(
                                            4
                                        )}
                                        %
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RightComponent;
