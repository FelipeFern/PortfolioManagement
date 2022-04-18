const express = require("express");
const {
    createTournament,
    deleteTournament,
    getTournament,
    getTournaments,
    getTournamentPositions
} = require("../controllers/tournamentController.js");

const router = express.Router();

router.post("/", createTournament);
// router.route("/login", authUser);
router.get("/", getTournaments);
router.delete("/:id", deleteTournament);
router.get("/:id", getTournament);
router.get("/positions/:id", getTournamentPositions)

module.exports = router;
