import "./App.css";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import InitialPage from "./screens/Pages/CoinsPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import TournamentPage from "./screens/TournamentPage/TournamentPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioPage from "./screens/Pages/PortfolioPages";
import Tournaments from "./components/Tournaments/Tournaments";
import Nav from "./components/nav/Nav";
import Coins from "./components/Coins/Coins";

const App = () => (
    <>
        {/* <Header /> */}
        {/* <Tournaments/> */}
        {/* <Nav /> */}
        <main>
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
                    <Route path="/register" element={<RegisterPage />} exact />
                    <Route path="/InitialPage" element={<InitialPage />} />
                    <Route path="/PortfolioPage" element={<PortfolioPage />} />
                    <Route path="/torneo" element={<TournamentPage />} />
                </Routes>
            </BrowserRouter>
        </main>
    </>
);

export default App;
