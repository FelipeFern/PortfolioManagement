import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import InitialPage from "./screens/Pages/CoinsPage";
import LoginPage from "./screens/LoginPage/LoginPage";
import RegisterPage from "./screens/RegisterPage/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PortfolioPage from "./screens/Pages/PortfolioPages";
import Tournaments from "./components/Tournaments/Tournaments";
import Nav from "./components/nav/Nav";

const App = () => (
    <>
        <Header />
        <Tournaments/>
        <Nav/>
        <main>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} exact />
                    <Route path="/login" element={<LoginPage />} exact />
                    <Route path="/register" element={<RegisterPage />} exact />
                    <Route path="/InitialPage" element={<InitialPage />} />
                    <Route path="/PortfolioPage" element={<PortfolioPage />} />
                </Routes>
            </BrowserRouter>
        </main>

        <Footer />
    </>
);

export default App;
