import React from "react";
import "./dashboard.css";
import { AiFillSignal } from "react-icons/ai";
import { MdLeaderboard, MdDonutLarge } from "react-icons/md";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
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
            <h1>Dashboard</h1>

            <div className="date">
                <input type="date" />
            </div>

            <div className="insights">
                <div className="div-1">
                    <span>
                        <MdLeaderboard />
                    </span>
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
                    <small className="text-muted"> Last 24 hs</small>
                </div>
                <div className="div-2">
                    <span>
                        <MdLeaderboard />
                    </span>
                    <div className="middle">
                        <div className="left">
                            <h3>Money Available</h3>
                            <h1>$213</h1>
                        </div>
                        <div className="progress">
                            <div>
                                <Doughnut data={data1} />
                            </div>

                            <div className="number">
                                <p>81%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted"> Last 24 hs</small>
                </div>

                <div className="div-3">
                    <span>
                        <MdLeaderboard />
                    </span>
                    <div className="middle">
                        <div className="left">
                            <h3>Tournament Position</h3>
                            <h1>$213</h1>
                        </div>
                        <div className="progress">
                            <div>
                                <Doughnut data={data1} />
                            </div>

                            <div className="number">
                                <p>81%</p>
                            </div>
                        </div>
                    </div>
                    <small className="text-muted"> Last 24 hs</small>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
