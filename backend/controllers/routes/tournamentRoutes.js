const express = require("express");
const router = express.Router();
const {
    createTournament,
    getTournaments,
    getTournamentById,
    updateTournament,
    deleteTournament
} = require("../controllers/tournamentController");

router.post("/", createTournament);
router.get("/", getTournaments);
router.get("/:id", getTournamentById);
router.put("/:id", updateTournament);
router.delete("/:id", deleteTournament);

module.exports = router;
