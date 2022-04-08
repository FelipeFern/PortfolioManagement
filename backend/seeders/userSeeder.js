const mongoose = require("mongoose");

const userSeed = async () => {
    try {
        const user = mongoose.model("User");
        user.create({
            name: 'Felipe Fernandez',
            email: 'mail@gmail.com',
            password: '12345678',
            isAdmin: false,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Manuel Fernandez',
            email: 'mail2@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = userSeed;
