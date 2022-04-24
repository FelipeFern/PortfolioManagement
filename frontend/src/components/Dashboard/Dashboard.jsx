import React from "react";
import "./dashboard.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard({ tournamentLeaderboard, title, userInscription }) {
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

  
    return (
        <div className="main-dash">
            <h1>{title}</h1>

            <div className="insights">
                <div className="div-1">
                    <div className="middle">
                        <div className="left">
                            <h3>Profits </h3>
                            <h1> $
                            {userInscription.length !== 0 ?
                            userInscription.inscription.profit : 0  
                        }
                            </h1>
                        </div>
                        <div className="left">
                            <h3>Money Available </h3>
                            <h1> $
                            {userInscription.length !== 0 ?
                            userInscription.inscription.score : 0   
                        }
                            </h1>
                        </div>
                        <div className="left">
                            <h3>Current Position </h3>
                            <h1> $
                            {userInscription.length !== 0 ?
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
