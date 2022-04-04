const express = require("express");
const {spotBalance, futuresBalance, futuresPrices, prevDay} = require("../controllers/binanceController");

const router = express.Router();

router.route("/spotBalance").get(spotBalance);
router.route("/futuresPrices").get(futuresPrices);
router.route("/futuresBalance").get(futuresBalance);
router.route("/prevDay").get(prevDay);

module.exports = router;
