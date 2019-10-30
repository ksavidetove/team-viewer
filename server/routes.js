const mongoose = require('mongoose');
const express = require('express');
const { PlayersModel, TeamsModel, LeaguesModel } = require('./models');


const router = express.Router();

router.get('/league/:leagueName', async(req, res) => {
  try {
    const league = await LeaguesModel.findOne({ name: req.params.leagueName }).populate('teams').exec();

    res.json(league ? league.teams : []);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get('/team/:teamName', async(req, res) => {
  try {
    const team = await TeamsModel.findOne({ name: req.params.teamName }).populate('players').exec();

    res.json(team ? team.players : []);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;