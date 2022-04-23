const express = require("express");
const {
    createInscription,
    getInscription,
    getInscriptionPositions
} = require("../controllers/inscriptionController.js");

const router = express.Router();

router.post("/", createInscription);
 router.get("/:id", getInscription); 
// router.post("/positions/:id", getInscriptionPositions)

module.exports = router;
