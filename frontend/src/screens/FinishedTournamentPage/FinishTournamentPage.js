import Dashboard from "../../components/Dashboard/Dashboard";
import "./FinishedTournamentPage.css";
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
const URITournamentPositions =
    "http://localhost:5000/api/tournaments/leaderboard/";
const URICoinsAPIAll = "http://localhost:5000/api/coingecko/coinsAPI";
const URIGetTournament = "http://localhost:5000/api/tournaments/";

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

    const getTournamentPositions = async () => {
        console.log("Entre");
        const _user = JSON.parse(user);
        const uri = URITournamentPositions + id;
        const { data } = await axios.get(uri);
        const _data = data.find((elem) => elem.user._id == _user);
        console.log(_data);
        if (_data === undefined) {
            setUserInscription("No");
            console.log('=======================')
        } else {
            setUserInscription(data.find((elem) => elem.user._id == _user));
        }
        setTournamentLeaderboard(data);

        await insertCoins(data);
    };

    useEffect(() => {
        closedUserPositions();
        getTournamentPositions();
        getTournament();
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
                    _coins={coins}
                    _closedTournamentPositions={closedTournamentPositions}
                />
            </div>

            <RightComponent createPositions={false} tournamentId={id} />
        </div>
    );
};

export default TournamentPage;
