const mongoose= require ("mongoose");

const coinSchema = mongoose.Schema({
    id: { type: String, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },

    // TO DO:
    //  No se si tendría que guardar las relaciones sobre
});

const coinModel = mongoose.model("Coin", coinSchema);
module.export =  {coinModel};
