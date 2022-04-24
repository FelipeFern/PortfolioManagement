import "./App.css";
import React, { useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import LandingPage from "./screens/LandingPage/LandingPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import TournamentPage from "./screens/TournamentPage/TournamentPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioPage from "./screens/Pages/PortfolioPages";
import TournamentsPage from "./screens/TournamentsPage/TournamentsPage";
import Tournaments from "./components/Tournaments/Tournaments";
import Nav2 from "./components/nav/nav2";
import Coins from "./components/Coins/Coins";
import Header from './components/Header/Header'

const App = () => {
    return (
        <main>
                <Nav2 />
                <BrowserRouter>
                    <Routes>
                        <Route  path="/algo" element= {<Header/>}/>
                        <Route path="/coins" element={<Coins />} exact />
                        <Route
                            path="/tournaments"
                            element={<TournamentsPage />}
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
                            element={<TournamentPage  />}
                        />
                    </Routes>
                </BrowserRouter>
        </main>
    );
};

export default App;
