const mongoose = require("mongoose");

const userSeed = async () => {
    try {
        const user = mongoose.model("User");
        user.create({
            name: 'Bart Simpsons ',
            email: 'bart@gmail.com',
            password: '12345678',
            isAdmin: false,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Lisa Simpsons',
            email: 'lisa@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: ' Maggie Simpsons',
            email: 'maggie@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });


        user.create({
            name: 'Homero Simpsons',
            email: 'homero@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Marge Simpsons',
            email: 'marge@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Abraham Simpson',
            email: 'abraham@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Milhouse Van Houten',
            email: 'milhouse@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Todd Flanders',
            email: 'todd@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Rod Flanders',
            email: 'rod@gmail.com',
            password: '12345678',
            isAdmin: true,
            createdAt: Date.now(),
            inscriptions: [],
        });

        user.create({
            name: 'Ned Flanders',
            email: 'ned@gmail.com',
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
