import "./App.css";
import React from "react";
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import TournamentPage from "./screens/TournamentPage/TournamentPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import PortfolioPage from "./screens/Pages/PortfolioPages";
import TournamentsPage from "./screens/TournamentsPage/TournamentsPage";
import FinishedTournamentsPage from "./screens/FinishedTournamentsPage/FinishedTournamentsPage";
import FinishedTournamentPage from "./screens/FinishedTournamentPage/FinishTournamentPage";
import Tournaments from "./components/Tournaments/Tournaments";
import Nav2 from "./components/nav/nav2";
import Coins from "./components/Coins/Coins";
import Header from "./components/Header/Header";

const App = () => {
    const user = localStorage.getItem("userId");

    return (
        <main>
            <BrowserRouter>
                <Nav2 />

                <Routes>
                    {user && (
                        <Route
                            path="/finishedTournaments"
                            element={<FinishedTournamentsPage />}
                        />
                    )}
                    {user && (
                        <Route
                            path="/tournaments"
                            element={<TournamentsPage />}
                            exact
                        />
                    )}
                    {user && (
                    <Route
                        path="/tournament/:id"
                        element={<TournamentPage />}
                    />
                    )}
                    {user && (
                        <Route
                            path="/finishedTournaments"
                            element={<FinishedTournamentsPage />}
                        />
                    )}
                    {user && (
                        <Route
                            path="/finishedTournament/:id"
                            element={<FinishedTournamentPage />}
                        />
                    )}
                    <Route path="/coins" element={<Coins />} exact />

                    <Route path="/login" element={<LoginPage />} exact />

                    <Route path="/PortfolioPage" element={<PortfolioPage />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </main>
    );
};

export default App;
