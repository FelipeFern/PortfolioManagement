import React, { Fragment, useState, useEffect } from "react";
import "./coins.css";
import Table from "../Table/Table";
import axios from "axios";

const URI2 = "https://final-iaw.herokuapp.com/api/coingecko/coinsAPI";
const URI = "http://localhost:5000/api/coingecko/coinsAPI";

const Coins = () => {
    const [driversData, setDriversData] = useState([]);

    const fetchData = async () => {
        const data = await axios.get(URI2);
        console.log(data)
        if (data.data.length > 2) {
            setDriversData(data.data);
            console.log("Actualice");
            console.log(data.data[0].market_data.current_price.usd);
            console.log(data.data[1].market_data.current_price.usd);
            console.log(data.data[3].market_data.current_price.usd);
            console.log("\n");
        }
    };

    useEffect(() => {
        setDriversData([]);
        fetchData();
        const coinsData = setInterval(() => {
            fetchData();           
        }, 10000);

        return () => {
            clearInterval(coinsData);
        };
    }, []);

    return (
        <Fragment>
            <Table
                tableData={driversData}
                headingColumns={[
                    "#",
                    "Coin",
                    "Symbol",
                    "Price",
                    "24h",
                    "7d",
                    "30d",
                    "Market Cap",
                ]}
                title="Cryptocurrency Prices by Market Cap "
            ></Table>
        </Fragment>
    );
};

export default Coins;
