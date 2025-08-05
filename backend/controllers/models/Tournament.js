const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    clubs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Club" }]
}, { timestamps: true });

module.exports = mongoose.model("Tournament", TournamentSchema);
