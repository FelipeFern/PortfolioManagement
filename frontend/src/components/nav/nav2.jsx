import React, { useState, useEffect } from "react";
import { AiOutlineTrophy, AiOutlineUser } from "react-icons/ai";
import { RiCoinsLine } from "react-icons/ri";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import "./nav2.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const URIUser = "https://final-iaw.herokuapp.com/api/users/";

function Nav2() {
    const navigate = useNavigate();
    const user = localStorage.getItem("userId");
    // const [userObject, setUserObject] = useState("");
    const [activeCoin, setActiveCoin] = useState("active");
    const [activeTournament, setActiveTournament] = useState("");
    const [activeFinishedTournament, setActiveFinishedTournament] =
        useState("");
    const [sidebarActive, setSidebarActive] = useState("sidebar nav_active");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler");
    const [name, setName] = useState([]);

    const navToggle = () => {
        sidebarActive === "sidebar"
            ? setSidebarActive("sidebar nav_active")
            : setSidebarActive("sidebar");
        toggleIcon === "nav__toggler"
            ? setToggleIcon("nav__toggler toggle")
            : setToggleIcon("nav__toggler");
    };

    const getUser = async () => {
        
        if (user !== null) {
            const _user = await axios.get(URIUser + JSON.parse(user));
            setName(_user.data.name);
        }
    };

    useEffect(() => {
getUser()
        const userData = setInterval(() => {
            if(user === null){
                getUser();
            }
        }, 5000);

        return () => {
            clearInterval(userData);
        };   
        
    }, [user]);

    const logOutButton = async () => {
        localStorage.clear();
        navigate("/login");
        return true;
    };

    return (
        <aside>
            <div className="top">
                <div onClick={navToggle} className={toggleIcon}>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
                <div className="logo" id="menu-btn">
                    <h2>LogoNuestro</h2>
                </div>
            </div>
            <div className={sidebarActive}>
                <a
                    href="/coins"
                    className={activeCoin}
                    onClick={(e) => {
                        e.preventDefault();
                        setActiveTournament("");
                        setActiveCoin("active");
                        setActiveFinishedTournament("");
                        navigate("/coins");
                    }}
                >
                    <div className="icon">
                        <RiCoinsLine />
                    </div>

                    <h3>Coins</h3>
                </a>

                {user && (
                    <a
                        href="/tournaments"
                        className={activeTournament}
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveCoin("");
                            setActiveTournament("active");
                            setActiveFinishedTournament("");
                            navigate("/tournaments");
                        }}
                    >
                        <div className="icon">
                            {" "}
                            <AiOutlineTrophy />
                        </div>

                        <h3>Open Tournaments</h3>
                    </a>
                )}

                {user && (
                    <a
                        href="/finishedTournaments"
                        className={activeFinishedTournament}
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveTournament("");
                            setActiveFinishedTournament("active");
                            setActiveCoin("");
                            navigate("/finishedTournaments");
                        }}
                    >
                        <div className="icon">
                            <AiOutlineTrophy />
                        </div>

                        <h3>Finished Tournaments</h3>
                    </a>
                )}

                {user && (
                    <a>
                        <div className="icon">
                            <AiOutlineUser />
                        </div>

                        <h3>{name}</h3>
                    </a>
                )}

                {user ? (
                    <a
                        href="/login"
                        onClick={(e) => {
                            e.preventDefault();
                            logOutButton();
                        }}
                    >
                        <div className="icon">
                            <FiLogOut />
                        </div>

                        <h3
                            onClick={(e) => {
                                e.preventDefault();
                                logOutButton();
                            }}
                        >
                            Logout{" "}
                        </h3>
                    </a>
                ) : (
                    <a href="/login">
                        <div className="icon">
                            <FiLogIn />
                        </div>

                        <h3>Log in </h3>
                    </a>
                )}
            </div>
        </aside>
    );
}

export default Nav2;
