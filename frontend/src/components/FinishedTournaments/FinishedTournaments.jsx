import React from "react";
import "./finishedTournaments.css";
import { AiFillTrophy } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

const URI = "http://localhost:5000/api/tournaments/";
const URIInscription = "http://localhost:5000/api/inscriptions/";

const Tournaments = ({
    openRegistedTournaments,
    openUnregistedTournaments,
}) => {
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
        const _uri = URIInscription;
        const _user = JSON.parse(user);
        const { _inscription } = await axios.post(_uri, {
            userId: _user,
            tournamentID: tournamentId,
        });
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    return (
        <section id="tournaments">
            <h2> Finished Tournaments</h2>

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
                                {openRegistedTournaments.map((tournament) => (
                                    <article
                                        className="tournament__card"
                                        key={tournament._id}
                                    >
                                        <AiFillTrophy className="tournament__icon" />
                                        <h5>{tournament.name}</h5>
                                        <div className="small">
                                            Money: {tournament.moneyAvailable}
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
                                                "/finishedTournament/" +
                                                tournament._id.toString()
                                            }
                                        >
                                            <button className="btn btn-primary">
                                                {" "}
                                                Tournaments Stats
                                            </button>
                                        </a>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="tournaments__content">
                    {openUnregistedTournaments.length === 0 ? (
                        <div className="no_open_positions">
                            <h3> You are not registed in any Finished Tournament</h3>
                        </div>
                    ) : (
                        <div>
                            <h3> Unregisteres Tournaments</h3>
                            <div className="tournaments__cards">
                                {openUnregistedTournaments.map((tournament) => (
                                    <article
                                        className="tournament__card"
                                        key={tournament._id}
                                    >
                                        <AiFillTrophy className="tournament__icon" />
                                        <h5>{tournament.name}</h5>
                                        <div className="small">
                                            Money: {tournament.moneyAvailable}
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
                                                "/finishedTournaments/" +
                                                tournament._id.toString()
                                            }
                                        >
                                            <button className="btn btn-primary">
                                                {" "}
                                                Tournaments Stats
                                            </button>
                                        </a>
                                    </article>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Tournaments;