import React from "react";
import "./nav.css";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";

import { useState } from "react";

function Nav() {
    const [activeNav, setActiveNav] = useState("#");

    return (
        <div className="nav1">
            <a
                href="#"
                onClick={() => setActiveNav("#")}
                className={activeNav === "#" ? "active" : ""}
            >
                <AiOutlineHome />
            </a>

            <a
                href="#tournaments"
                onClick={() => setActiveNav("#tournaments")}
                className={activeNav === "#tournaments" ? "active" : ""}
            >
                <AiOutlineUnorderedList />
            </a>

            <a href="#createPosition">
                <MdAttachMoney />
            </a>
        </div>
    );
}

export default Nav;
