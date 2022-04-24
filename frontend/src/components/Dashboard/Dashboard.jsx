import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { SiCashapp } from "react-icons/si";
import { MdLeaderboard } from "react-icons/md";
import { BsTrophyFill } from "react-icons/bs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ tournamentLeaderboard, title, userInscription }) {
    const [tournamentPositions, setTournamentPositon] = useState([]);
    const [_userInscription, setUserInscription] = useState("")

    const data1 = {
        labels: [],
        datasets: [
            {
                label: "# of Votes",
                data: [20, 80],
                backgroundColor: [
                    "var(--color-primary)",
                    "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["var(--color-primary)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const setLeadedrboard = async () => {
        setTournamentPositon(tournamentLeaderboard);
        setUserInscription(userInscription)
    };

    useEffect(() => {
        setLeadedrboard();
    }, []);

    return (
        <div className="main-dash">
            <h1>{title}</h1>

            <div className="insights">
                <div className="div-1">
                    <div className="middle">
                        <div className="left">
                            <h3>Profits </h3>
                            <h1> $
                            {_userInscription != "" ?
                            userInscription.inscription.profit : 0  
                        }
                            </h1>
                        </div>
                        <div className="left">
                            <h3>Money Available </h3>
                            <h1> $
                            {_userInscription != "" ?
                            userInscription.inscription.score : 0   
                        }
                            </h1>
                        </div>
                        <div className="left">
                            <h3>Current Position </h3>
                            <h1> $
                            {_userInscription !== "" ?
                            userInscription.inscription.profit : 0   
                        }
                            </h1>
                        </div>
                        
                    </div>
                </div>
             
                <div className="div-3">
                    <div className="leaderboard">
                        <div className="table-container">
                            <div className="table-container_title">
                                <h3> Leaderboard </h3>
                            </div>
                            <table className="table-container__table">
                                <thead>
                                    <tr>
                                        <th> Pos</th>
                                        <th>Name</th>
                                        <th>Profit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tournamentLeaderboard.length !== 0 &&
                                        tournamentLeaderboard.map(
                                            (rank, index) => (
                                                <tr key={rank.inscription._id}>
                                                    <td>{index + 1} °</td>
                                                    <td>{rank.user.name}</td>
                                                    <td>
                                                        $
                                                        {
                                                            rank.inscription
                                                                .profit
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
