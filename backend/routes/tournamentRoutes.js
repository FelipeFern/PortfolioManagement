const express = require("express");
const {
    createTournament,
    deleteTournament,
    getTournament,
    getTournaments,
} = require("../controllers/tournamentController.js");

const router = express.Router();

router.post("/", createTournament);
// router.route("/login", authUser);
router.get("/", getTournaments);
router.delete("/:id", deleteTournament);
router.get("/:id", getTournament);

module.exports = router;
