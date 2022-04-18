import React, { Fragment } from "react";
import "./coins.css";
import Table from "../Table/Table";
import { useState, useEffect } from "react";
import axios from "axios";

const URI = "http://localhost:5000/api/coingecko/coinsAPI";

const Coins = () => {

    const fetchData = async () => {
        const data = await (await axios.get(URI)).data;
        setDriversData(data);
    };
    const [driversData, setDriversData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Fragment>
            <Table
                tableData={driversData}
                headingColumns={["Coin", "Symbol", "Last", "Change", "Change %", ""]}
                title="Monedas de por ahí. "
            ></Table>
        </Fragment>
    );
};

export default Coins;
