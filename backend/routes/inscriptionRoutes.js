const express = require("express");
const {
    createInscription,
    getInscription,
    getInscriptionPositions
} = require("../controllers/inscriptionController.js");

const router = express.Router();

router.post("/", createInscription);
// router.route("/login", authUser);
// router.get("/", getUsers);
// router.delete("/:id", deleteTournament);
 router.get("/:id", getInscription); 
router.post("/positions/:id", getInscriptionPositions)

module.exports = router;
