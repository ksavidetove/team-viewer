#!/bin/bash

mongorestore -d team-viewer -c leagues ./database/leagues.bson
mongorestore -d team-viewer -c teams ./database/teams.bson
mongorestore -d team-viewer -c players ./database/players.bson
