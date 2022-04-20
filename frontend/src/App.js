import "./App.css";
import React, { useState, useContext, useMemo } from "react";
import LandingPage from "./screens/LandingPage/LandingPage";
import InitialPage from "./screens/Pages/CoinsPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import TournamentPage from "./screens/TournamentPage/TournamentPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioPage from "./screens/Pages/PortfolioPages";
import Tournaments from "./components/Tournaments/Tournaments";
import Nav2 from "./components/nav/nav2";
import Coins from "./components/Coins/Coins";
import { UserContext } from "./UserContext";

const App = () => {
    const [user, setUser] = useState(null);
    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

    return (
        <main>
            <UserContext.Provider value={providerValue}>
                <Nav2 />
                <BrowserRouter>
                    <Routes>
                        <Route path="/coins" element={<Coins />} exact />
                        <Route
                            path="/tournaments"
                            element={<Tournaments />}
                            exact
                        />
                        <Route path="/" element={<LandingPage />} exact />
                        <Route path="/login" element={<LoginPage />} exact />
                        <Route
                            path="/register"
                            element={<RegisterPage />}
                            exact
                        />
                        <Route path="/InitialPage" element={<InitialPage />} />
                        <Route
                            path="/PortfolioPage"
                            element={<PortfolioPage />}
                        />
                        <Route
                            path="/tournament/:id"
                            element={<TournamentPage />}
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </main>
    );
};

export default App;
