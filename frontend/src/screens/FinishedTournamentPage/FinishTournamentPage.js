import Dashboard from "../../components/Dashboard/Dashboard";
import "./FinishedTournamentPage.css";
import PositionList from "../../components/PositionList/PositionList";
import ClosedPositions from "../../components/ClosedPositions/ClosedPositions";
import RightComponent from "../../components/RightComponent/RightComponent";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const URICoins =
    "https://final-iaw.herokuapp.com/api/tournaments/coins/";
const URIClosedPositions =
    "https://final-iaw.herokuapp.com/api/users/tournamentClosedPostions/";
//const URIOpenPositions =
//    "http://localhost:5000/api/users/tournamentOpenPostions/";
const URITournamentPositions =
    "https://final-iaw.herokuapp.com/api/tournaments/leaderboard/";
const URICoinsAPIAll = "https://final-iaw.herokuapp.com/api/coingecko/coinsAPI";
const URIGetTournament = "https://final-iaw.herokuapp.com/api/tournaments/";

const TournamentPage = () => {
    const { id } = useParams();
    const user = localStorage.getItem("userId");
    const [tournament, setTournament] = useState();
    const [tournamentLeaderboard, setTournamentLeaderboard] = useState([]);
    const [closedTournamentPositions, setClosedTournamentPositions] = useState(
        []
    );
    const [torneo, setTorneo] = useState([]);
    const [coins, setCoins] = useState([]);
    const [userInscription, setUserInscription] = useState([]);
    const [tournamentCoins, setTournamentCoins] = useState([]);

    const insertCoins = async (_array) => {
        const { data } = await axios.get(URICoinsAPIAll);
        setCoins(data);
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

    const fetchCoins = async () => {
        const _uri = URICoins + id
        console.log(_uri)
        const data = await axios.get(_uri);
        setTournamentCoins(data.data);
    };

    useEffect(() => {
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
                {userInscription !== "No" && (
                    <Dashboard
                        torneo={torneo}
                        userInscription={userInscription}
                        tournamentLeaderboard={tournamentLeaderboard}
                        title={tournament}
                    />
                )}

                <ClosedPositions
                    title="Closed Positions"
                    _closedTournamentPositions={closedTournamentPositions}
                />
            </div>

            <RightComponent
                tournamentCoins={tournamentCoins}
                APIcoins={coins}
                createPositions={false}
                tournamentId={id}
            />
        </div>
    );
};

export default TournamentPage;
