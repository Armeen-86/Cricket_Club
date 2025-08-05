const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    venue: { type: String },
    club1: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
    club2: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
    tournament: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament" },
    result: { type: String, default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Match", MatchSchema);
