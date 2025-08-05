const Match = require("../models/Match");

exports.createMatch = async (req, res) => {
    try {
        const match = new Match(req.body);
        await match.save();
        res.status(201).json(match);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMatches = async (req, res) => {
    try {
        const matches = await Match.find()
            .populate("club1")
            .populate("club2")
            .populate("tournament");
        res.json(matches);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getMatchById = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id)
            .populate("club1")
            .populate("club2")
            .populate("tournament");
        if (!match) return res.status(404).json({ message: "Match not found" });
        res.json(match);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateMatch = async (req, res) => {
    try {
        const updated = await Match.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteMatch = async (req, res) => {
    try {
        await Match.findByIdAndDelete(req.params.id);
        res.json({ message: "Match deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
