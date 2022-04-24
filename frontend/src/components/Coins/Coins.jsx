import React, { Fragment, useContext, useState, useEffect } from "react";
import "./coins.css";
import Table from "../Table/Table" ;
import axios from "axios";

const URI = "http://localhost:5000/api/coingecko/coinsAPI";

const Coins = () => {
    const user = localStorage.getItem('userId')
    const [driversData, setDriversData] = useState([]);

    const fetchData = async () => {
        const data = await (await axios.get(URI)).data;
        setDriversData(data);
    };
    

    useEffect(() => {
        const coinsData = setInterval(() => {
            fetchData();
        }, 10000);

        return () => {
            clearInterval(coinsData);
        };
    }, [driversData ]);

    return (
        <Fragment>
            <Table
                tableData={driversData}
                headingColumns={["#", "Coin","Symbol" ,"Price", "24h", "7d" ,"30d", "Market Cap"]}
                title="Cryptocurrency Prices by Market Cap "
            ></Table>
        </Fragment>
    );
};

export default Coins;
