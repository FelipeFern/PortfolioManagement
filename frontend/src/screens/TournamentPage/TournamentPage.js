import Dashboard from "../../components/Dashboard/Dashboard";
import "./TournamentPage.css";
import PositionList from "../../components/PositionList/PositionList";
import ClosedPositions from "../../components/ClosedPositions/ClosedPositions";
import RightComponent from "../../components/RightComponent/RightComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URI = "https://final-iaw.herokuapp.com/api/coingecko/coinsAPI";
const URITournamentPositions =
    "https://final-iaw.herokuapp.com/api/tournaments/leaderboard/";
const URIClosedPositions =
    "https://final-iaw.herokuapp.com/api/users/tournamentClosedPostions/";
const URIOpenPositions =
    "https://final-iaw.herokuapp.com/api/users/tournamentOpenPostions/";
const URICoinsAPIAll = "https://final-iaw.herokuapp.com/api/coingecko/coinsAPI";
const URIGetTournament = "https://final-iaw.herokuapp.com/api/tournaments/";
const URICoins =
    "https://final-iaw.herokuapp.com/api/tournaments/coins/";


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
    const [tournamentCoins, setTournamentCoins] = useState([]);
    const [userInscription, setUserInscription] = useState([]);

    const openUserPositions = async () => {
        const _user = JSON.parse(user);
        const uri = URIOpenPositions + _user;
        const { data } = await axios.post(uri, {
            tournament: id,
        });
        setOpenTournamentPositions(data);
    };

    const closedUserPositions = async () => {
        const _user = JSON.parse(user);
        const uri = URIClosedPositions + _user;
        const { data } = await axios.post(uri, {
            tournament: id,
        });
        setClosedTournamentPositions(data);
    };

    const getTournament = async () => {
        const _uri = URIGetTournament + id;
        const _tournament = await axios.get(_uri);
        setTorneo(_tournament.data);
        setTournament('"' + _tournament.data.name + '"');
    };

    const getTournamentLeaderboard = async () => {
        const _user = JSON.parse(user);
        const uri = URITournamentPositions + id;
        const { data } = await axios.get(uri);
        setTournamentLeaderboard(data);
        setUserInscription(data.find((elem) => elem.user._id == _user));
    };

    const insertCoins = async () => {
        const { data } = await axios.get(URICoinsAPIAll);
        setCoins(data);
    };

    
    const fetchCoins = async () => {
        const _uri = URICoins + id
        const data = await axios.get(_uri);
        setTournamentCoins(data.data);
    };


    useEffect(() => {
        openUserPositions();
        closedUserPositions();
        getTournament();
        getTournamentLeaderboard();
        setCoins([]);
        insertCoins();
        fetchCoins();


        const coinsData = setInterval(() => {
            insertCoins();
        }, 10000);

        return () => {
            clearInterval(coinsData);
        };
    }, []);

    return (
        <div className="container--1">
            <div className="middleDiv">
                <Dashboard
                    torneo={torneo}
                    userInscription={userInscription}
                    tournamentLeaderboard={tournamentLeaderboard}
                    title={tournament}
                />
                <PositionList
                    title="Open Positions"
                    _coins={coins}
                    _openTournamentPositions={openTournamentPositions}
                />
                <ClosedPositions
                    title="Closed Positions"
                    _closedTournamentPositions={closedTournamentPositions}
                />
            </div>

            <RightComponent
                tournamentCoins = {tournamentCoins}
                APIcoins={coins}
                createPositions={true}
                tournamentId={id}
            />
        </div>
    );
};

export default TournamentPage;
