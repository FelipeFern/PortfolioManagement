import Nav2 from "../../components/nav/nav2";
import Dashboard from "../../components/Dashboard/Dashboard";
import "./TournamentPage.css";
import PositionList from "../../components/PositionList/PositionList";
import RightComponent from "../../components/RightComponent/RightComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";

const URIPositions =
    "http://localhost:5000/api/users/tournamentPostions/62506acceecaa7c367b162c1";

const URICoins = "http://localhost:5000/api/coingecko/coin/";

const TournamentPage = () => {
    let tournamentPositions = [];
    let coins = [];

    const insertCoins = async (_array) => {
        let arreglo = [];
        for (let elem of _array) {
            const url = URICoins + elem.coin;
            const dat = await axios.get(url);
            arreglo.push(dat.data);
        }
        coins = arreglo;
    };

    const userPositions = async () => {
        const data = await (
            await axios.post(URIPositions, {
                tournament: "625074cd29da7ab6d8897946",
            })
        ).data;
        tournamentPositions = data;
        await insertCoins(data);
    };

    useEffect(async () => {
        await userPositions();
    }, [coins, tournamentPositions]);

    return (
        <div className="container--1">
            <div className="middleDiv">
                <Dashboard />
                <PositionList
                    _coins={coins}
                    _tournamentPositions={tournamentPositions}
                />
            </div>

            <RightComponent />
        </div>
    );
};

export default TournamentPage;
