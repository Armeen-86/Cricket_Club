const Tournament = require("../models/Tournament");

exports.createTournament = async (req, res) => {
    try {
        const tournament = new Tournament(req.body);
        await tournament.save();
        res.status(201).json(tournament);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTournaments = async (req, res) => {
    try {
        const tournaments = await Tournament.find().populate("clubs");
        res.json(tournaments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTournamentById = async (req, res) => {
    try {
        const tournament = await Tournament.findById(req.params.id).populate("clubs");
        if (!tournament) return res.status(404).json({ message: "Tournament not found" });
        res.json(tournament);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTournament = async (req, res) => {
    try {
        const updated = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTournament = async (req, res) => {
    try {
        await Tournament.findByIdAndDelete(req.params.id);
        res.json({ message: "Tournament deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
