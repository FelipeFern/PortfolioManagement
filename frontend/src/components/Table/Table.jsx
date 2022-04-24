import React, { useState, useEffect, useContext }  from "react";
import "./table.css";
import PropTypes from "prop-types";
import axios from "axios";

const URI = "http://localhost:5000/api/coingecko/coinsAPI";

const Table = ({ tableData, headingColumns, title }) => {
    const user = localStorage.getItem('userId')

    let tableClass = "table-container__table";    
    const [coins, setCoins] = useState(tableData);

    const fetchCoins = async () => {
        const data = await (await axios.get(URI)).data;
        setCoins(data);
    };

    useEffect(() => {
        const coinsData = setInterval(() => {
            fetchCoins();
        }, 10000);

        return () => {
            clearInterval(coinsData);
        };
    }, [coins ]);

    return (
        <div className="table_coins">
            <div className="table-container">
                <div className="table-container_title">
                    <h1>{title}</h1>
                </div>
                <table className={tableClass}>
                    <thead>
                        <tr>
                            {headingColumns.map((col, index) => (
                                <th key={index} className="tittles">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin, index) => (
                            <tr key={coin.id} >
                                <th >{coin.market_data.market_cap_rank}</th>
                                <th className="th-img-name ">
                                    <img src={coin.image.small} />
                                    {coin.name}
                                </th>
                                
                                <td >{coin.symbol.toUpperCase()} </td>
                                <td >$ {coin.market_data.current_price.usd}</td>
                                <td className="div_right"
                                    style={
                                        coin.market_data.price_change_percentage_24h > 0
                                            ? { color: "lawngreen" }
                                            : { color: "orangered" }
                                    }
                                >
                                    {" "}
                                    {coin.market_data.price_change_percentage_24h.toFixed(3)
                                    }%
                                </td>
                                <td className="div_right"
                                    style={
                                        coin.market_data
                                            .price_change_percentage_7d > 0
                                            ? { color: "lawngreen" }
                                            : { color: "orangered" }
                                    }
                                >
                                    {coin.market_data.price_change_percentage_7d.toFixed(
                                        3
                                    )}%
                                </td>
                                <td className="div_right"
                                    style={
                                        coin.market_data
                                            .price_change_percentage_30d > 0
                                            ? { color: "lawngreen" }
                                            : { color: "orangered" }
                                    }
                                >
                                    {coin.market_data.price_change_percentage_30d.toFixed(
                                        3
                                    )}%
                                </td>

                        
                                <td> ${new Intl.NumberFormat('de-DE').format(coin.market_data.market_cap.usd)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

Table.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
};

export default Table;
