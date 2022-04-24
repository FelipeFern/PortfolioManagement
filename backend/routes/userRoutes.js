const express = require("express");
const {
    registerUser,
    authUser,
    getUser,
    deleteUser,
    getUsers,
    getTournamentsRegistered,
    getTournamentsUnregistered,
    getPositionTournament,
    getClosedPositionsTournament,
    getOpenPositionsTournament,
    getInscription
} = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/tournaments/:id", getTournamentsRegistered);
router.get("/tournamentsUnregistered/:id", getTournamentsUnregistered); 
router.post("/tournamentPositions/:id", getPositionTournament);
router.post("/tournamentClosedPostions/:id", getClosedPositionsTournament);
router.post("/tournamentOpenPostions/:id", getOpenPositionsTournament);
router.post ("/inscription/:id", getInscription);




module.exports = router;
