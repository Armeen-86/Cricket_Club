const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    founded: { type: Number },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }]
}, { timestamps: true });

module.exports = mongoose.model("Club", ClubSchema);
