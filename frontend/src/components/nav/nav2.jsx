import React, { useState,  useEffect } from "react";
import { AiOutlineTrophy } from "react-icons/ai";
import { RiCoinsLine } from "react-icons/ri";
import { MdOutlineCreate } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import "./nav2.css";

function Nav2() {
    const user = localStorage.getItem("userId");
    const [sidebarActive, setSidebarActive] = useState("sidebar nav_active");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler");

    const navToggle = () => {
        sidebarActive === "sidebar"
            ? setSidebarActive("sidebar nav_active")
            : setSidebarActive("sidebar");
        toggleIcon === "nav__toggler"
            ? setToggleIcon("nav__toggler toggle")
            : setToggleIcon("nav__toggler");
    };

    useEffect(() => {}, [user]);

    const logOutButton = async () => {
        console.log('Entre a borrar userID')
        localStorage.clear();
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
                {/* <a href="/coins" className="active">
                    <div className="icon">
                        <BsGrid />
                    </div>
                    <h3>Menu</h3>
                </a> */}
                <a href="/coins">
                    <div className="icon">
                        <RiCoinsLine />
                    </div>

                    <h3>Coins</h3>
                </a>
                <a href="/tournaments">
                    <div className="icon">
                        {" "}
                        <AiOutlineTrophy />
                    </div>

                    <h3>Open Tournaments</h3>
                </a>
                <a href="/finishedTournaments">
                    <div className="icon">
                        <AiOutlineTrophy />
                    </div>

                    <h3>Finished Tournaments</h3>
                </a>
                <a href="/tournament/ias">
                    <div className="icon">
                        <MdOutlineCreate />
                    </div>

                    <h3>Create Tournament</h3>
                </a>

                {user ? (
                    <a href="/login" onClick={(e) => {
                        e.preventDefault();
                        logOutButton();
                    }}>
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
                    <a href="/login" >
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
