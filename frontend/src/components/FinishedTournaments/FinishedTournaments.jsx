import React from "react";
import "./finishedTournaments.css";
import { AiFillTrophy } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

const URI = "https://final-iaw.herokuapp.com/api/tournaments/";
const URIInscription = "https://final-iaw.herokuapp.com/api/inscriptions/";

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

    useEffect(() => {
        fetchTournaments();
    }, []);

    return (
        <div>
            <h2 className="tournaments_title"> Finished Tournaments</h2>

            <section id="tournaments">
                <div className="container tournaments__container">
                    <div className="tournaments__content">
                        {openRegistedTournaments.length === 0 ? (
                            <h3> You are not registed in any Tournament</h3>
                        ) : (
                            <div>
                                <h3> Registered Tournaments</h3>
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
                                    You are not registed in any Finished
                                    Tournament
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
