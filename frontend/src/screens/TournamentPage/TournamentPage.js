import Dashboard from "../../components/Dashboard/Dashboard";
import "./TournamentPage.css";
import PositionList from "../../components/PositionList/PositionList";
import ClosedPositions from "../../components/ClosedPositions/ClosedPositions";
import RightComponent from "../../components/RightComponent/RightComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URITournamentPositions = "http://localhost:5000/api/tournaments/leaderboard/";
const URIClosedPositions =
    "http://localhost:5000/api/users/tournamentClosedPostions/";
const URIOpenPositions =
    "http://localhost:5000/api/users/tournamentOpenPostions/";
const URICoinsAPIAll = "http://localhost:5000/api/coingecko/coinsAPI";
const URIGetTournament = "http://localhost:5000/api/tournaments/"

const TournamentPage = () => {
    const { id } = useParams();
    const [tournament, setTournament] = useState();
    const user = localStorage.getItem("userId");
    const [tournamentLeaderboard, setTournamentLeaderboard] = useState([]);
    const [closedTournamentPositions, setClosedTournamentPositions] = useState(
        []
    );
    const [openTournamentPositions, setOpenTournamentPositions] = useState([]);
    const [torneo, setTorneo] = useState([]);
    const [coins, setCoins] = useState([]);
    const [userInscription, setUserInscription] = useState([]);

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

    const getTournament = async () => {
        const _uri = URIGetTournament + id;
        const _tournament = await axios.get(_uri);
        setTorneo(_tournament.data)
        setTournament(  '"'+_tournament.data.name +'"')
    }

    const getTournamentLeaderboard = async () => {
        const _user = JSON.parse(user);
        const uri = URITournamentPositions + id;
        const { data } = await axios.get(uri);
        setTournamentLeaderboard(data); 
        setUserInscription(data.find((elem) => elem.user._id == _user))
        await insertCoins(data);
    }

    useEffect(() => {
        openUserPositions();
        closedUserPositions();
        getTournament();
        getTournamentLeaderboard()
    }, []);

    return (
        <div className="container--1">
            <div className="middleDiv">
                <Dashboard   torneo = {torneo} userInscription = {userInscription}  tournamentLeaderboard = {tournamentLeaderboard} title = {tournament}/>
                <PositionList
                    title="Open Positions"
                    _coins={coins}
                    _openTournamentPositions={openTournamentPositions}
                    _closedTournamentPositions={closedTournamentPositions}
                />
                <ClosedPositions
                    title="Closed Positions"
                    _coins={coins}
                    _closedTournamentPositions={closedTournamentPositions}
                />
            </div>

            <RightComponent createPositions={true} tournamentId= {id}/>
        </div>
    );
};

export default TournamentPage;
