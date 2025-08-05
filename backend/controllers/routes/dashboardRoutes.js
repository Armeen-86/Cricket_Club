const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const Player = require('../models/Player');
const Match = require('../models/Match');
const Tournament = require('../models/Tournament');
const Ticket = require('../models/Ticket');

router.get('/counts', async (req, res) => {
  try {
    const clubs = await Club.countDocuments();
    const players = await Player.countDocuments();
    const matches = await Match.countDocuments();
    const tournaments = await Tournament.countDocuments();
    const tickets = await Ticket.countDocuments();
    res.json({ clubs, players, matches, tournaments, tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
