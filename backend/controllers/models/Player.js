const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ["Batsman", "Bowler", "All-rounder", "Wicket-keeper"] },
    age: Number,
    club: { type: mongoose.Schema.Types.ObjectId, ref: "Club" }
}, { timestamps: true });

module.exports = mongoose.model("Player", PlayerSchema);
