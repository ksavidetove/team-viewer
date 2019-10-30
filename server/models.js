const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var leaguesSchema = Schema({
  name : { type: String },
  sport : { type: String },
  teams: [{type: Schema.Types.ObjectId, ref: 'Teams'}]
});

var teamsSchema = Schema({
  name : String,
  thumbnail : String,
  players: [{ type: Schema.Types.ObjectId, ref: 'Players'}]
});

var playersSchema = Schema({
  name : String,
  thumbnail : String,
  position : String,
  born: Date,
  signin: {
    amount: Number,
    currency: String
  }
});

var PlayersModel = mongoose.model('Players', playersSchema);
var TeamsModel = mongoose.model('Teams', teamsSchema);
var LeaguesModel = mongoose.model('Leagues', leaguesSchema);

module.exports = {
  PlayersModel,
  TeamsModel,
  LeaguesModel
};