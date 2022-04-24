import React, { useState } from "react";
import "./dashboard.css";
import axios from "axios";
import { SiCashapp } from "react-icons/si";
import { MdLeaderboard, MdDonutLarge } from "react-icons/md";
import {BsTrophyFill} from 'react-icons/bs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const URITournamentPositions =
    "http://localhost:5000/api/tournaments/positions/625074cd29da7ab6d8897946";

function Dashboard({ title}) {
    const [tournamentPositions, setTournamentPositon] = useState([]);

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

    const getTournamentPositions = async () => {
        const data = await (await axios.post(URITournamentPositions)).data;
        setTournamentPositon(data);
    };

    return (
        <div className="main-dash">
            <h1>{title}</h1>


            <div className="insights">
                <div className="div-1">
                <div className="logos">
                    <span>
                        <MdLeaderboard />
                    </span>
                </div>
                    <div className="middle">
                        <div className="left">
                            <h3>Profits algo </h3>
                            <h1>$213</h1>
                        </div>
                        <div className="progress">
                            <div className="graphic">
                                <Doughnut data={data1} />
                            </div>

                            <div className="number">
                                <p>81%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-2">
                    <div className="logos">
                        <span>
                            <SiCashapp />
                        </span>
                        <span>
                            <BsTrophyFill />
                        </span>
                    </div>

                    <div className="middle">
                        <div className="left">
                            <h3>Money Available</h3>
                            <h1>$213</h1>
                        </div>
                        <div className="b">
                            <h3>Current Position</h3>
                            <h1>2°</h1>
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
                                    {tournamentPositions.map((rank, index) => (
                                        <tr key={rank._id}>
                                            <th>{index + 1} °</th>
                                            <th>{rank.user.name}</th>
                                            <th>${rank.inscription.profit}</th>
                                        </tr>
                                    ))}
                                    <tr>
                                        <th> 1° </th>
                                        <th>Felipe</th>
                                        <th>$400</th>
                                    </tr>
                                    <tr>
                                        <th> 1° </th>
                                        <th>Felipe</th>
                                        <th>$400</th>
                                    </tr>
                                    <tr>
                                        <th> 1° </th>
                                        <th>Felipe</th>
                                        <th>$400</th>
                                    </tr>
                                    <tr>
                                        <th> 1° </th>
                                        <th>Felipe</th>
                                        <th>$400</th>
                                    </tr>
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
