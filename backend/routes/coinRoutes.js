const express = require("express");
const { coins, coinRange, getCoin, coinsAPI } = require("../controllers/coinController");
const router = express.Router();

router.get("/coins", coins);
router.get("/coin/range/:id", coinRange);
router.get("/coin/:id", getCoin);
router.get("/coinsAPI", coinsAPI)

module.exports = router;
