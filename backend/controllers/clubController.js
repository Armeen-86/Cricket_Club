const Club = require("../models/Club");

// ✅ Create a new club
exports.createClub = async (req, res) => {
    try {
        const newClub = new Club(req.body);
        await newClub.save();
        res.status(201).json(newClub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get all clubs
exports.getClubs = async (req, res) => {
    try {
        const clubs = await Club.find();
        res.status(200).json(clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get a single club by ID
exports.getClubById = async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);
        if (!club) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(200).json(club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update a club
exports.updateClub = async (req, res) => {
    try {
        const updatedClub = await Club.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedClub) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(200).json(updatedClub);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete a club
exports.deleteClub = async (req, res) => {
    try {
        const deletedClub = await Club.findByIdAndDelete(req.params.id);
        if (!deletedClub) {
            return res.status(404).json({ message: "Club not found" });
        }
        res.status(200).json({ message: "Club deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
