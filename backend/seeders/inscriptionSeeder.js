const mongoose = require("mongoose");
const Tournament = require("../models/tournamentModel");

const inscriptionSeed = async () => {
    try {
        const inscription = mongoose.model("Inscription");

        const i1 = await inscription.create({
            inscriptionDate: Date.now(),
            profit: 0,
            score: 10,
            positions: [],
            tournament: "625074cd29da7ab6d8897946",
            user: "62506acceecaa7c367b162c1",
        });

        const aux1 = i1._id.toString();

        Tournament.findByIdAndUpdate("625074cd29da7ab6d8897946",{$push:{inscriptions:aux1}},{new:true}).then((docs)=>{
            if(docs) {
              console.log(' Se modifico bien')
            } else {
              console.log(' Hubo un error')
            }
         }).catch((err)=>{
            console.log(' Salimos por el carch')
         })

        const i2 = await inscription.create({
            inscriptionDate: Date.now(),
            profit: 20,
            score: 200,
            positions: [],
            tournament: "625074cd29da7ab6d8897946",
            user: "62506acceecaa7c367b162c1",
        });
        const aux = i2._id.toString();

        Tournament.findByIdAndUpdate("625074cd29da7ab6d8897946",{$push:{inscriptions:aux}},{new:true}).then((docs)=>{
            if(docs) {
              console.log(' Se modifico bien')
            } else {
              console.log(' Hubo un error')
            }
         }).catch((err)=>{
            console.log(' Salimos por el carch')
         })
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = inscriptionSeed;
/*
    inscriptionDate: { type: Date, default: new Date() },
    profit: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    positions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Position",
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    tournament: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tournament",
    },
});

 */
