const express = require("express");
const router = express.Router();
const {
    createClub,
    getClubs,
    getClubById,
    updateClub,
    deleteClub
} = require("../controllers/clubController");

router.post("/", createClub);       // Create a club
router.get("/", getClubs);          // Get all clubs
router.get("/:id", getClubById);    // Get club by ID
router.put("/:id", updateClub);     // Update club
router.delete("/:id", deleteClub);  // Delete club

module.exports = router;
