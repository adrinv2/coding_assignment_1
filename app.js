//Storing dependencies into variables
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

//Storing port number and our full app
var port = 8081;
var app = express();

//STEP 1: Setting up the boilerplate and routing
app.get('/wikipedia', function(req, res){

  var url = 'https://en.wikipedia.org/wiki/Quartz';

  request(url, function(error, response, html) {
    if(!error) {
      // res.send(html);
      var $ = cheerio.load(html);
      var data = {
        articleTitle:'',
        articleImage: '',
        articleParagraph: ''
      }

      $('#content').filter(function(){
        data.articleTitle = $(this).find('#firstHeading').text();
        data.articleImage = $(this).find('img').attr('src');
        data.articleParagraph = $(this).find('p:nth-of-type(2)').first().text();
      });

      res.send(data);

      fs.writeFile('wiki-output.js', JSON.stringify(data, null, 4), function(error){
        console.log('File written on hard drive!');

      });
    }
  });
//All the web scraping magic will happen here
//  res.send('Hello World!');

});

app.get('/imdb', function(req, res){

  var url = 'https://www.imdb.com/chart/top';

  request(url, function(error, response, html) {
    if(!error) {
      // res.send(html);
      var $ = cheerio.load(html);
      var data = [];

      $('.lister-list').filter(function(){
        $(this).find('tr').each(function(i, elem){
        data[i] = "'" + $(this). find('.posterColumn').find('img').attr('src') + "'"
      });
});
      res.send(data);

      fs.writeFile('imdb-output.js', 'var imdb_list = [' + data +']', function(error){
        console.log('File written on hard drive!');

      });
    }
  });
//All the web scraping magic will happen here
//  res.send('Hello World!');

});



//All the web scraping magic will happen here
//  res.send('Hello World!');

});

app.listen(port);
console.log('Magic happens on port' + port);

exports = module.exports = app;
