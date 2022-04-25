import React, { useState } from "react";
import "./header.css";

const Header = () => {
    const [active, setActive] = useState("nav__menu");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler");

    const navToggle = () => {
        active === "nav__menu"
            ? setActive("nav__menu nav__active")
            : setActive("nav__menu");
        //Toggler Icon
        toggleIcon === "nav__toggler"
            ? setToggleIcon("nav__toggler toggle")
            : setToggleIcon("nav__toggler");
    };

    return (
        <nav className="nav">
            <a href="/coins" className="nav__brand">
                {" "}
                Nombre de Nosotros
            </a>

            <ul className={active}>
                <li key="Home" className="nav__item">
                    <a href="/login" className="nav__link">
                        Home
                    </a>
                </li>
                <li key="Tournaments" className="nav__item">
                    <a href="tournamens" className="nav__link">
                        Tournaments
                    </a>
                </li>
                <li key="Inscriptions" className="nav__item">
                    <a href="Inscriptions" className="nav__link">
                        Inscriptions
                    </a>
                </li>
                <li key="Coins" className="nav__item">
                    <a href="Coins" className="nav__link">
                        Coins
                    </a>
                </li>
                <li key="LogOut" className="nav__item">
                    <a href="LogOut" className="nav__link">
                        LogOut
                    </a>
                </li>
            </ul>

            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    );
};

export default Header;
