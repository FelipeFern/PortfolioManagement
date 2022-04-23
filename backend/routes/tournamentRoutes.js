const express = require("express");
const {
    createTournament,
    deleteTournament,
    getTournament,
    getTournaments,
    getTournamentPositions,
    getTournamentCoins,
    getOpenTournaments
} = require("../controllers/tournamentController.js");

const router = express.Router();

router.post("/", createTournament);
// router.route("/login", authUser);
router.get("/", getTournaments);
router.delete("/:id", deleteTournament);
router.get("/:id", getTournament);
router.get("/coins/:id", getTournamentCoins);
router.get("/open/:id", getOpenTournaments)

module.exports = router;
