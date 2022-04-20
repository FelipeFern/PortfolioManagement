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
    getClosedPositionsTournament
} = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);
router.get("/tournaments/:id", getTournamentsRegistered);
router.get("/tournamentsUnregistered/:id", getTournamentsUnregistered); 
router.post("/tournamentPostions/:id", getPositionTournament);
router.get("/tournamentClosedPostions/:id", getClosedPositionsTournament);




module.exports = router;
