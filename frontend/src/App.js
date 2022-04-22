import "./App.css";
import React, { useState, useContext, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginPage from "./screens/LoginPage/LoginPage";
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
                        <Route path="/" element={<Coins />} exact />
                        <Route path="/login" element={<LoginPage />} exact />
                        
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
