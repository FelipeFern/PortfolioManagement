const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const coinController = require("./routes/coinRoutes");
const tournamentController = require("./routes/tournamentRoutes");

const app = express();
connectDB();

// app.get("/", function (req, res) {
//     try {
//         require("./models/positionModel");
//         const positionSeed = require("./seeders/positionSeeder");
//         positionSeed();
//         return res.status(200).send(" Se ejecutaron los seeders");
//     } catch (error) {
//         return res.status(404).send("No se pudieron ejecutar los seeders")
//     }
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/api/users", userRoutes);
app.use("/api/coingecko", coinController);
app.use("/api/tournaments", tournamentController);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
