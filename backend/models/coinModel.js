const mongoose= require ("mongoose");

const coinSchema = mongoose.Schema({
    identifier: { type: String, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },

    // TO DO:
    //  No se si tendría que guardar las relaciones sobre
});
    
module.exports = mongoose.model("Coin", coinSchema);
