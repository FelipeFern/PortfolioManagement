import React, { Fragment, useState, useEffect } from "react";
import "./coins.css";
import Table from "../Table/Table" ;
import axios from "axios";

const URI2 = "https://final-iaw.herokuapp.com/api/coingecko/coinsAPI"
const URI = "http://localhost:5000/api/coingecko/coinsAPI";

const Coins = () => {
    const [driversData, setDriversData] = useState([]);
    const [time , setTime] = useState(new Date())

    const fetchData = async () => {
        const data = await axios.get(URI2);
        setDriversData(data.data);
    };
    
    const setMyTime =() =>  {
        setTime(new Date());
     }
 

    useEffect(() => {
        setDriversData([])
        fetchData();
        const coinsData = setInterval(() => {
            fetchData();
            setMyTime()

        }, 4000);

        return () => {
            clearInterval(coinsData);
        };
    }, []);
    
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
