import "./TournamentsPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Tournaments from "../../components/Tournaments/Tournaments";
import { useParams } from "react-router-dom";

const URIOpenTournaments = "http://localhost:5000/api/tournaments/open/";

const TournamentsPage = () => {
    const { id } = useParams();
    const user = localStorage.getItem("userId");
    const URIOpen = URIOpenTournaments.concat(JSON.parse(user));

    const [openRegistedTournaments, setOpenRegistedTournaments] = useState([]);
    const [openUnregistedTournaments, setOpenUnregistedTournaments] = useState(
        []
    );

    const openTournaments = async () => {
        const { data } = await await axios.get(URIOpen);
        setOpenRegistedTournaments(data.registedTournaments);
        setOpenUnregistedTournaments(data.unregistedTournaments);
    };

    useEffect( () => {
         openTournaments();
    }, [user,]);

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
