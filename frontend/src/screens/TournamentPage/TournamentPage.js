import Dashboard from "../../components/Dashboard/Dashboard";
import "./TournamentPage.css";
import PositionList from "../../components/PositionList/PositionList";
import ClosedPositions from "../../components/ClosedPositions/ClosedPositions";
import RightComponent from "../../components/RightComponent/RightComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URIPositions = "http://localhost:5000/api/users/tournamentPositions/";
const URIClosedPositions =
    "http://localhost:5000/api/users/tournamentClosedPostions/";
const URIOpenPositions =
    "http://localhost:5000/api/users/tournamentOpenPostions/";
const URICoins = "http://localhost:5000/api/coingecko/coin/";
const URICoinsAPIAll = "http://localhost:5000/api/coingecko/coinsAPI";
const URIGetTournament = "http://localhost:5000/api/tournaments/"

const TournamentPage = () => {
    const { id } = useParams();
    const [tournament, setTournament] = useState();
    const user = localStorage.getItem("userId");
    const [tournamentPositions, setTournamentPositions] = useState([]);
    const [closedTournamentPositions, setClosedTournamentPositions] = useState(
        []
    );
    const [openTournamentPositions, setOpenTournamentPositions] = useState([]);
    const [coins, setCoins] = useState([]);

    const insertCoins = async (_array) => {
        const { data } = await axios.get(URICoinsAPIAll);
        setCoins(data)
    };

    const openUserPositions = async () => {
        const _user = JSON.parse(user);
        const uri = URIOpenPositions + _user;
        const { data } = await axios.post(uri, {
            tournament: id,
        });
        setOpenTournamentPositions(data);
        await insertCoins(data);
    };

    const closedUserPositions = async () => {
        const _user = JSON.parse(user);
        const uri = URIClosedPositions + _user;
        const { data } = await axios.post(uri, {
            tournament: id,
        });
        setClosedTournamentPositions(data);
        
        await insertCoins(data);
    };

    const userPositions = async () => {
        const _user = JSON.parse(user);
        const uri = URIOpenPositions + _user;
        const { data } = await axios.post(uri, {
            tournament: id,
        });
        setTournamentPositions(data);
        await insertCoins(data);
    };

    const getTournament = async () => {
        const {tournament} = await  axios.get(URIGetTournament + id);
        setTournament(tournament.name)
    }

    useEffect(() => {
        openUserPositions();
        closedUserPositions();
        getTournament();
    }, []);

    return (
        <div className="container--1">
            <div className="middleDiv">
                <Dashboard  title = {tournament}/>
                <PositionList
                    title="Open Positions"
                    _coins={coins}
                    _tournamentPositions={tournamentPositions}
                    _openTournamentPositions={openTournamentPositions}
                    _closedTournamentPositions={closedTournamentPositions}
                />
                <ClosedPositions
                    title="Closed Positions"
                    _coins={coins}
                    _tournamentPositions={tournamentPositions}
                    _closedTournamentPositions={closedTournamentPositions}
                />
            </div>

            <RightComponent tournamentId= {id}/>
        </div>
    );
};

export default TournamentPage;
