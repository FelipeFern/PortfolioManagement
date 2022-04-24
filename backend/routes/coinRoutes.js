const express = require("express");
const {
    coins,
    coinRange,
    getCoin,
    coinsAPI,
    coinAPI,
} = require("../controllers/coinController");
const router = express.Router();

router.get("/coins", coins);
router.get("/coin/range/:id", coinRange);
router.get("/coin/:id", getCoin);
router.get("/coinsAPI", coinsAPI);
router.get("/coinsAPI/:id", coinAPI);

module.exports = router;
