import React, { useState, useEffect, useContext } from "react";
import "./table.css";
import PropTypes from "prop-types";
import axios from "axios";

const URI = "https://final-iaw.herokuapp.com/api/coingecko/coinsAPI";

const Table = ({ tableData, headingColumns, title }) => {
    const user = localStorage.getItem("userId");

    let tableClass = "table-container__table";

    useEffect(() => {
      
    }, [tableData]);

    return (
        <div className="table_coins">
            <div className="table-container">
                <div className="table-container_title">
                    <h1>{title}</h1>
                </div>

                {tableData.length > 0 && (
                    <div>
                        <table className={tableClass}>
                            <thead>
                                <tr>
                                    {headingColumns.map((col, index) => (
                                        <td key={index} className="tittles">
                                            {col}
                                        </td>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {tableData.map((coin, index) => (
                                    <tr key={coin.id}>
                                        <th>
                                            {coin.market_data.market_cap_rank}
                                        </th>
                                        <th className="th-img-name ">
                                            <img  alt="Img-Logo" src={coin.image.small} />
                                            {coin.name}
                                        </th>

                                        <td>{coin.symbol.toUpperCase()} </td>
                                        <td>
                                            ${" "}
                                            {coin.market_data.current_price.usd}
                                        </td>
                                        <td
                                            className="div_right"
                                            style={
                                                coin.market_data
                                                    .price_change_percentage_24h >
                                                0
                                                    ? { color: "lawngreen" }
                                                    : { color: "orangered" }
                                            }
                                        >
                                            {" "}
                                            {coin.market_data.price_change_percentage_24h.toFixed(
                                                3
                                            )}
                                            %
                                        </td>
                                        <td
                                            className="div_right"
                                            style={
                                                coin.market_data
                                                    .price_change_percentage_7d >
                                                0
                                                    ? { color: "lawngreen" }
                                                    : { color: "orangered" }
                                            }
                                        >
                                            {coin.market_data.price_change_percentage_7d.toFixed(
                                                3
                                            )}
                                            %
                                        </td>
                                        <td
                                            className="div_right"
                                            style={
                                                coin.market_data
                                                    .price_change_percentage_30d >
                                                0
                                                    ? { color: "lawngreen" }
                                                    : { color: "orangered" }
                                            }
                                        >
                                            {coin.market_data.price_change_percentage_30d.toFixed(
                                                3
                                            )}
                                            %
                                        </td>

                                        <td>
                                            {" "}
                                            $
                                            {new Intl.NumberFormat(
                                                "de-DE"
                                            ).format(
                                                coin.market_data.market_cap.usd
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
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
