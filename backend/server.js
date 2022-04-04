const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require ("cors");

const userRoutes = require("./routes/userRoutes");
const binanceRoutes = require("./routes/binanceRoutes");



const Binance = require("node-binance-api");

const binance = new Binance().options({
    APIKEY: "FRWJnL0L18w1Xzd6kwcIVYOlViGc1TBavj8HVUawg9jlQnAHbxCJriX10HObv69v",
    APISECRET:
        "J0VBWUp5jHqqTGFuE3C1zQw6dbdP2PMBbgDaKqhTWLlgGOOETcY9w1g1s3HLgfm4",
});




const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/api/binance", binanceRoutes);

app.use("/api/users", userRoutes);


app.get("/message", async (req, res, next) => {
    const requestAPI = await binance.futuresPrices();
    res.status(200).json({
        prices: requestAPI,
        
    });

})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


