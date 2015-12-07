var express = require('express');
var path = require('path');
var Controller = require('./db/controllers');
var Model = require('./db/models');
var connection = require('./db/connection.js');
var organizations = require('./resources/organizations.js')

var IP = '127.0.0.1', PORT = 8000;

var app = express();
app.use(express.static(__dirname + '/../client'));

app.get('/organizations', function(req, res, next) {
  // Controller.Organization.retrieve(req, res, next);
  organizations.forEach(function(org) {
    Controller.Organization.create(req, res, next, org);
  });
});

app.get('/aofs', function(req, res, next) {
  Controller.AoF.retrieve(req, res, next);
});

app.get('/browse', function(req, res, next) {
  Model.Organization.find({}).then(function(orgs) {
    Model.Project.find({}).then(function(projects) {
      res.send({ status: 200, results: { orgs: orgs, projects: projects } });
    });
  });
});

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (req, res){
  res.sendFile(path.resolve(__dirname, './../client', 'index.html'))
});

app.listen(PORT, IP);
