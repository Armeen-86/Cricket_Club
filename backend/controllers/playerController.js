const Player = require("../models/Player");

// Create Player
exports.createPlayer = async (req, res) => {
    try {
        const player = new Player(req.body);
        await player.save();
        res.status(201).json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get All Players
exports.getPlayers = async (req, res) => {
    try {
        const players = await Player.find().populate("club");
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get Player by ID
exports.getPlayerById = async (req, res) => {
    try {
        const player = await Player.findById(req.params.id).populate("club");
        if (!player) return res.status(404).json({ message: "Player not found" });
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update Player
exports.updatePlayer = async (req, res) => {
    try {
        const updated = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete Player
exports.deletePlayer = async (req, res) => {
    try {
        await Player.findByIdAndDelete(req.params.id);
        res.json({ message: "Player deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
