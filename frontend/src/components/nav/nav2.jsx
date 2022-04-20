import React, { useRef, useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import { AiOutlineClose, AiOutlineTrophy } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { RiCoinsLine } from "react-icons/ri";
import { MdOutlineCreate } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import "./nav2.css";
import { MdMenu } from "react-icons/md";

function Nav2() {
    const { user, setUser } = useContext(UserContext);
    const [sidebarActive, setSidebarActive] = useState("sidebar nav_active");
    const [toggleIcon, setToggleIcon] = useState("nav__toggler");

    const navToggle = () => {
        sidebarActive === "sidebar"
            ? setSidebarActive("sidebar nav_active")
            : setSidebarActive("sidebar");
        console.log(sidebarActive);
        toggleIcon === "nav__toggler"
            ? setToggleIcon("nav__toggler toggle")
            : setToggleIcon("nav__toggler");
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
                <a href="" className="active">
                    <div className="icon">
                        <BsGrid />
                    </div>
                    <h3>Menu</h3>
                </a>
                <a href="">
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

                    <h3>My Tournaments</h3>
                </a>
                <a href="">
                    <div className="icon">
                        <AiOutlineTrophy />
                    </div>

                    <h3>Finished Tournaments</h3>
                </a>
                <a href="">
                    <div className="icon">
                        {" "}
                        <AiOutlineTrophy />
                    </div>

                    <h3>Open Tournaments</h3>
                </a>
                <a href="">
                    <div className="icon">
                        <MdOutlineCreate />
                    </div>

                    <h3>Create Tournament</h3>
                </a>
                {user == null ?
                   <div>

                    </div>
                    : 
                    <a href="/login">
                    <div className="icon">
                        <FiLogOut />
                    </div>

                    <h3
                        onClick={() => {
                            setUser(null);
                        }}
                    >
                        Logout{" "}
                    </h3>
                </a>
                }
            </div>
        </aside>
    );
}

export default Nav2;
