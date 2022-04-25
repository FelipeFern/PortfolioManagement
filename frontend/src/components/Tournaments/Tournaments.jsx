import React from "react";
import "./tournaments.css";
import { AiFillTrophy } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = "https://final-iaw.herokuapp.com/api/tournaments/";
const URIInscription = "https://final-iaw.herokuapp.com/api/inscriptions/";
const URITournament = "https://final-iaw.herokuapp.com/api/tournaments/";

const Tournaments = ({
    openRegistedTournaments,
    openUnregistedTournaments,
}) => {
    const navigate = useNavigate();
    const user = localStorage.getItem("userId");
    const [tournamentsState, setTournamentsState] = useState([]);

    const getCorrectDate = (_date) => {
        var date = new Date(
            _date.replace(
                /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
                "$4:$5:$6 $2/$3/$1"
            )
        );
        const toReturn = date.toLocaleDateString();
        return toReturn;
    };

    const fetchTournaments = async () => {
        const data = await (await axios.get(URI)).data;
        setTournamentsState(data);
    };

    const signUpTournament = async (tournamentId) => {
        const _tournament = await axios.get(URITournament + tournamentId);
        const _moneyAvailable = _tournament.data.moneyAvailable;
        const _uri = URIInscription;
        const _user = JSON.parse(user);

        const { _inscription } = await axios.post(URIInscription, {
            userId: _user,
            tournamentId: tournamentId,
            moneyAvailable: _moneyAvailable,
        });
        
        navigate("/tournament/" + tournamentId);
    };

    useEffect(() => {
        fetchTournaments();
        return () => {
            setTournamentsState([]);
        };
    }, []);

    return (
        <div>
            <h2 className="tournaments_title"> Open Tournaments</h2>
            <section id="tournaments">
                <div className="container tournaments__container">
                    <div className="tournaments__content">
                        {openRegistedTournaments.length === 0 ? (
                            <div className="no_open_positions">
                                <h3> You are not registed in any Tournament</h3>
                            </div>
                        ) : (
                            <div>
                                <h3> Registeres Tournaments</h3>
                                <div className="tournaments__cards">
                                    {openRegistedTournaments.map(
                                        (tournament) => (
                                            <article
                                                className="tournament__card"
                                                key={tournament._id}
                                            >
                                                <AiFillTrophy className="tournament__icon" />
                                                <h5>{tournament.name}</h5>
                                                <div className="small">
                                                    Money:{" "}
                                                    {tournament.moneyAvailable}
                                                </div>
                                                <div className="small">
                                                    {getCorrectDate(
                                                        tournament.startDate
                                                    )}{" "}
                                                    --{" "}
                                                    {getCorrectDate(
                                                        tournament.finishDate
                                                    )}
                                                </div>
                                                <a
                                                    href={
                                                        "/tournament/" +
                                                        tournament._id.toString()
                                                    }
                                                >
                                                    <button className="btn btn-primary">
                                                        {" "}
                                                        Tournaments Stats
                                                    </button>
                                                </a>
                                            </article>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="tournaments__content">
                        {openUnregistedTournaments.length === 0 ? (
                            <div className="no_open_positions">
                                <h3>
                                    {" "}
                                    You are not registed in any Open Tournament
                                </h3>
                            </div>
                        ) : (
                            <div>
                                <h3> Unregisteres Tournaments</h3>
                                <div className="tournaments__cards">
                                    {openUnregistedTournaments.map(
                                        (tournament) => (
                                            <article
                                                className="tournament__card"
                                                key={tournament._id}
                                            >
                                                <AiFillTrophy className="tournament__icon" />
                                                <h5>{tournament.name}</h5>
                                                <div className="small">
                                                    Money:{" "}
                                                    {tournament.moneyAvailable}
                                                </div>
                                                <div className="small">
                                                    {getCorrectDate(
                                                        tournament.startDate
                                                    )}{" "}
                                                    --{" "}
                                                    {getCorrectDate(
                                                        tournament.finishDate
                                                    )}
                                                </div>

                                                <a
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        signUpTournament(
                                                            tournament._id
                                                        );
                                                    }}
                                                >
                                                    <button className="btn btn-primary">
                                                        {" "}
                                                        Sign up
                                                    </button>
                                                </a>
                                            </article>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Tournaments;
