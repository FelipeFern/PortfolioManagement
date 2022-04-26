import "./TournamentsPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Tournaments from "../../components/Tournaments/Tournaments";

const URIOpenTournaments = "https://final-iaw.herokuapp.com/api/tournaments/open/";

const TournamentsPage = () => {
    const user = localStorage.getItem("userId");
    const URIOpen = URIOpenTournaments.concat(JSON.parse(user));

    const [openRegistedTournaments, setOpenRegistedTournaments] = useState([]);
    const [openUnregistedTournaments, setOpenUnregistedTournaments] = useState(
        []
    );

    const openTournaments = async () => {
        const { data } = await axios.get(URIOpen);
        setOpenRegistedTournaments(data.registedTournaments);
        setOpenUnregistedTournaments(data.unregistedTournaments);
    };

    useEffect( () => {
         openTournaments();
    }, [user]);

    return (
        <div className="tournaments_page">
            <div className="container--1">
                <Tournaments
                    openRegistedTournaments={openRegistedTournaments}
                    openUnregistedTournaments={openUnregistedTournaments}
                />
            </div>
        </div>
    );
};

export default TournamentsPage;
