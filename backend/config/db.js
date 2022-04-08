const mongoose = require("mongoose");
const db = process.env.DBURI;

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        
        console.log(`MongoDB id Connected: ${connect.connection.host} `);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
