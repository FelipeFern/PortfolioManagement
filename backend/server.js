const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const coinRoutes = require("./routes/coinRoutes");
const tournamentRoutes = require("./routes/tournamentRoutes");
const inscriptionRoutes = require("./routes/inscriptionRoutes");
const positionRoutes = require("./routes/positionRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));

app.use("/api/inscriptions", inscriptionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/coingecko", coinRoutes);
app.use("/api/tournaments", tournamentRoutes);
app.use("/api/positions", positionRoutes);

// app.use(notFound);
// app.use(errorHandler);

// DEPLOYMENT ----------------

// const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.get("*", (req, res) => {
        res.sendFile(
            path.resolve(__dirname, "../frontend", "build", "index.html")
        );
    });
}

// app.get("/", function (req, res) {
//     try {
//         require("./models/tournamentModel");
//         const positionSeed = require("./seeders/positionSeeder");
//         positionSeed();
//         return res.status(200).send(" Se ejecutaron los seeders");
//     } catch (error) {
//         return res.status(404).send("No se pudieron ejecutar los seeders")
//     }
// });

// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })

app.listen(port, () => console.log(`Server started on port ${port}`));
