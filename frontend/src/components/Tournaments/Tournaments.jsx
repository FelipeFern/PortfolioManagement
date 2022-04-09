import React from "react";
import "./tournaments.css";
import { AiFillTrophy } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";

const URI = "http://localhost:5000/api/tournaments/";
const Tournaments = () => {
    const [tournamentsState, setTournamentsState] = useState([]);

    const fetchTournaments = async () => {
        const data = await (await axios.get(URI)).data;
        setTournamentsState(data);
    };

    useEffect(() => {
        fetchTournaments();
        console.log(tournamentsState)
    }, []);

    return (
        <section id="tournaments">
            <h5>What are the current</h5>
            <h2>Tournaments</h2>

            <div className="container tournaments__container">
                <div className="tournaments__content">
                    <div className="tournaments__cards">
                        {tournamentsState.map((tournament) => (
                            <article className="tournament__card">
                                <AiFillTrophy className="tournament__icon" />
                                <h5>{tournament.name}</h5>
                                <small> {tournament.moneyAvailable}</small>
                                <br /> 
                                <button className="btn btn-primary">
                                    {" "}
                                   Sign up
                                </button>
                            </article>
                        ))}
                       
                    </div>
                </div>

                <div className="tournaments__content">
                    <div className="tournaments__cards">
                        <article className="tournament__card">
                            <AiFillTrophy className="tournament__icon" />
                            <h5>Torneo</h5>
                            <small> Info del torneo</small>
                            <br />
                            <button className="btn btn-primary">
                                {" "}
                                Vamos a algun lugar
                            </button>
                        </article>
                        <article className="tournament__card">
                            <AiFillTrophy className="tournament__icon" />
                            <h5>Torneo</h5>
                            <small> Info del torneo</small>
                            <br />
                            <button className="btn btn-primary">
                                {" "}
                                Vamos a algun lugar
                            </button>
                        </article>
                        <article className="tournament__card">
                            <AiFillTrophy className="tournament__icon" />
                            <h5>Torneo</h5>
                            <small> Info del torneo</small>
                            <br />
                            <button className="btn btn-primary">
                                {" "}
                                Vamos a algun lugar
                            </button>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tournaments;
