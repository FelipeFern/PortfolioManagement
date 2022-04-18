import React from "react";
import "./table.css";
import PropTypes from "prop-types";

const Table = ({ tableData, headingColumns, title }) => {
    let tableClass = "table-container__table";

    return (
        <div className="table-container">
            <div className="table-container_title">
                <h2>{title}</h2>
            </div>
            <table className={tableClass}>
                <thead>
                    <tr>
                        {headingColumns.map((col, index) => (
                            <th key={index} className="tittles">{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((coin, index) => (
                        <tr key={coin.id}>
                            <th className="th-img-name">
                                <img src={coin.image.small} />
                                {coin.name}
                            </th>
                            <td><input type='checkbox' name='delete' value={coin.id}/></td>
                            <td>{coin.symbol.toUpperCase()} </td>
                            <td>{coin.market_data.current_price.usd}</td>
                            <td
                                style={
                                    coin.market_data.price_change_24h > 0
                                        ? { color: "lawngreen" }
                                        : { color: "orangered" }
                                }
                            >
                                {" "}
                                {coin.market_data.price_change_24h.toFixed(4)}
                            </td>
                            <td
                                style={
                                    coin.market_data
                                        .price_change_percentage_24h > 0
                                        ? { color: "lawngreen" }
                                        : { color: "orangered" }
                                }
                            >
                                {coin.market_data.price_change_percentage_24h.toFixed(
                                    4
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

Table.propTypes = {
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
    headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
};

export default Table;
