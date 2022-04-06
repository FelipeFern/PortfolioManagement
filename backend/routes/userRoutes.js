const express = require("express");
const {
    registerUser,
    authUser,
    getUser,
    deleteUser,
    getUsers,
} = require("../controllers/userControllers.js");

const router = express.Router();

router.post("/", registerUser);
router.route("/login", authUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

module.exports = router;
