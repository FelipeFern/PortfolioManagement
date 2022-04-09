const express = require("express");
const {
    registerUser,
    authUser,
    getUser,
    deleteUser,
    getUsers,
    getTournamentsRegistered,
    getTournamentsUnregistered,
    getPositionTournament
} = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/", registerUser);
router.route("/login", authUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/tournaments/:id", getTournamentsRegistered);
router.get("/tournamentsUnregistered/:id", getTournamentsUnregistered); 
router.get("/tournamentPostions/:id", getPositionTournament);

module.exports = router;
