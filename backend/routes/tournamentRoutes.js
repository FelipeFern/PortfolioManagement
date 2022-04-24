const express = require("express");
const {
    createTournament,
    deleteTournament,
    getTournament,
    getTournaments,
    getTournamentCoins,
    getOpenTournaments,
    getClosedTournaments,
    getTournamentLeaderboard
} = require("../controllers/tournamentController.js");

const router = express.Router();

router.post("/", createTournament);
// router.route("/login", authUser);
router.get("/", getTournaments);
router.delete("/:id", deleteTournament);
router.get("/:id", getTournament);
router.get("/coins/:id", getTournamentCoins);
router.get("/open/:id", getOpenTournaments)
router.get("/closed/:id", getClosedTournaments)
router.get("/leaderboard/:id", getTournamentLeaderboard)


module.exports = router;
