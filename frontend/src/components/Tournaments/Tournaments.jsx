import React from "react";
import "./tournaments.css";
import { AiFillTrophy } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URI = "http://localhost:5000/api/tournaments/";
const URIInscription = "http://localhost:5000/api/inscriptions/";

const Tournaments = ({
    openRegistedTournaments,
    openUnregistedTournaments,
}) => {
    const user = localStorage.getItem("userId");
    const navigate = useNavigate();
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
        const _uri = URIInscription ;
        console.log(_uri);
        const _user =  JSON.parse(user);
        console.log(JSON.parse(user), tournamentId)
        console.log({_user, tournamentId})
        const { _inscription } = await axios.post(_uri, {
            userId: _user,
            tournamentID: tournamentId,
        });
        console.log(_inscription);
        navigate("/tournament/" + tournamentId);
    };

    useEffect(() => {
        fetchTournaments();
    }, []);

    return (
        <section id="tournaments">
            <h2> OpenTournaments</h2>

            <div className="container tournaments__container">
                <div className="tournaments__content">
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
                                    {getCorrectDate(tournament.startDate)} --{" "}
                                    {getCorrectDate(tournament.finishDate)}
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
                        ))}
                        <article className="tournament__card">
                            <AiFillTrophy className="tournament__icon" />
                            <h5>Torneo</h5>
                            <small> Info del torneo</small>
                            <br />
                            <button className="btn btn-primary">
                                {" "}
                                Tournaments Stats
                            </button>
                        </article>
                    </div>
                </div>

                <div className="tournaments__content">
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
                                    {getCorrectDate(tournament.startDate)} --{" "}
                                    {getCorrectDate(tournament.finishDate)}
                                </div>

                                <a
                                    onClick={(e) => {
                                        e.preventDefault();
                                        signUpTournament(tournament._id);
                                    }}
                                >
                                    <button className="btn btn-primary">
                                        {" "}
                                        Sign up
                                    </button>
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tournaments;
