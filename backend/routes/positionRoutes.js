const express = require("express");
const {
    createPosition,
    closePosition,
    getPosition,
} = require("../controllers/positionController.js");

const router = express.Router();

router.post("/", createPosition);
// router.route("/login", authUser);
router.post("/close/:id", closePosition);
//router.delete("/:id", deleteTournament);
router.get("/:id", getPosition);

module.exports = router;
