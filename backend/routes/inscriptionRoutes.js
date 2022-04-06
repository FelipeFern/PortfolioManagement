const express = require("express");
const {
    createInscription,
    getInscription,
} = require("../controllers/inscriptionController.js");

const router = express.Router();

router.post("/", createInscription);
// router.route("/login", authUser);
// router.get("/", getUsers);
// router.delete("/:id", deleteTournament);
 router.get("/:id", getInscription);

module.exports = router;
