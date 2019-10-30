const http = require('http');
const express = require('express');
const cluster = require('cluster');

const app = express();
const mongoose = require('mongoose');


let numCores = require('os').cpus().length;
let workers = [];

const router = require('./routes');


/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
  console.log('Master cluster setting up ' + numCores + ' workers');

  for(let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());

    workers[i].on('message', function(message) {
      console.log(message);
    });
  }

  cluster.on('online', function(worker) {
    console.log('Worker ' + worker.process.pid + ' is listening');
  });

  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');

    workers.push(cluster.fork());

    workers[workers.length-1].on('message', function(message) {
      console.log(message);
    });
  });
};

const setUpExpress = () => {
  app.server = http.createServer(app);

  app.use(express.json());

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



  app.use('/', router);

  app.server.listen('8000', () => {
    console.log(`Started server on => http://localhost:${app.server.address().port} for Process Id ${process.pid}`);
  });

  mongoose.connect('mongodb://localhost:27017/team-viewer', { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on('error', err => {
    console.log(err);
  });

  app.on('error', (appErr, appCtx) => {
    console.error('app error', appErr.stack);
    console.error('on url', appCtx.req.url);
    console.error('with headers', appCtx.req.headers);
  });
};

/**
 * Setup server either with clustering or without it
 * @constructor
 */
const setupServer = () => {

  // if it is a master process then call setting up worker process
  if(cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    // to setup server configurations and share port address for incoming requests
    setUpExpress();
  }
};

setupServer();

module.exports = app;
