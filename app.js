//Storing dependencies into variables
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//Storing port number and our full app
var port = 3000;
var app = express();

//STEP 1: Setting up the boilerplate and routing
app.get('/', function(req, res){

//All the web scraping magic will happen here
  res.send('Hello World!');

});

app.listen(port);
console.log('Magic happens on port' + port);

exports = module.exports = app;
