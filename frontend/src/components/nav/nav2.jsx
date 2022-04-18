import React from "react";
import { AiOutlineClose, AiOutlineTrophy } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import { RiCoinsLine } from "react-icons/ri";
import { MdOutlineCreate } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import "./nav2.css";

function nav2() {
    return (
        <aside>
            <div className="top">
                <div className="logo">
                    <h2>LogoNuestro</h2>
                </div>
                <div className="close" id="close-btn">
                    <AiOutlineClose />
                </div>
            </div>
            <div className="sidebar">
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
                <a href="">
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
                <a href="">
                    <div className="icon">
                        <FiLogOut />
                    </div>

                    <h3>Logout </h3>
                </a>
            </div>
        </aside>
    );
}

export default nav2;
