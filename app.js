// storing dependencies in variables
var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var fs = require('fs');
var url = require('url');



//Storing port number and our full app
var port = 8081;
var app = express();

var DOWNLOAD_DIR = '/';

// //STEP 1: Setting up the boilerplate and routing
// app.get('/wikipedia', function(req, res){
//
//   var url = 'https://en.wikipedia.org/wiki/Quartz';
//
//   request(url, function(error, response, html) {
//     if(!error) {
//       // res.send(html);
//       var $ = cheerio.load(html);
//       var data = {
//         articleTitle:'',
//         articleImage: '',
//         articleParagraph: ''
//       }
//
//       $('#content').filter(function(){
//         data.articleTitle = $(this).find('#firstHeading').text();
//         data.articleImage = $(this).find('img').attr('src');
//         data.articleParagraph = $(this).find('p:nth-of-type(2)').first().text();
//       });
//
//       res.send(data);
//
//       fs.writeFile('wiki-output.js', JSON.stringify(data, null, 4), function(error){
//         console.log('File written on hard drive!');
//
//       });
//     }
//   });
// //All the web scraping magic will happen here
// //  res.send('Hello World!');
//
// });

app.get('/google', function(req, res){

  var url = 'https://www.google.com/search?rlz=1C1CHBD_csCZ736CZ736&biw=865&bih=610&tbm=isch&sxsrf=ACYBGNR3vKf4Pxtg1ZVX-UgUNg05pR2ntA%3A1570977896409&sa=1&ei=aDijXdfYGKyJk74PxbeGgAE&q=el+expolio+el+greco&oq=el+expolio+el+greco&gs_l=img.3...0.0..4919902...0.0..0.0.0.......0......gws-wiz-img.e9ESRPMR1lE&ved=0ahUKEwjXrNzbvJnlAhWsxMQBHcWbARAQ4dUDCAc&uact=5';

  request(url, function(error, response, html) {
    if(!error) {
      // res.send(html);
      var $ = cheerio.load(html);
      var google_data = [];

      // $(this).find("img").each(function(){
      //   google_data.push($(this).attr('src'));
      // });

      $('#ires').filter(function(){
        $(this).find('td').each(function(i, elem){
        google_data[i] = "'" + $(this).find('img').attr('src') + "'"
        download_file_curl($(this).find('img').attr('src'));
      });
});
      res.send(google_data);

      fs.writeFile('google_output.js',"var google_output = [" + google_data + "]", function(error){
              console.log("File is written successfully!");

      });
    }
  });
//All the web scraping magic will happen here
//  res.send('Hello World!');

});
var download_file_curl = function(file_url) {
  // extract the file name
  var file_name = url.parse(file_url).pathname.split('/').pop();
  // create an instance of writable stream
  var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
  // execute curl using child_process' spawn function
  var curl = spawn('curl', [file_url]);
  // add a 'data' event listener for the spawn instance
  curl.stdout.on('data', function(data) { file.write(data); });
  // add an 'end' event listener to close the writeable stream
  curl.stdout.on('end', function(data) {
    file.end();
    console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
  });
  // when the spawn child process exits, check if there were any errors and close the writeable stream
  curl.on('exit', function(code) {
    if (code != 0) {
      console.log('Failed: ' + code);
    }
  });
};


// app.get('/google', function(req, res){
//
//   var url = 'https://www.bing.com/images/search?q=el+expolio+el+greco&form=HDRSC2&first=1&cw=1129&ch=593';
//
//   request(url, function(error, response, html) {
//     if(!error) {
//       // res.send(html);
//       var $ = cheerio.load(html);
//       var google_data = [];
//
//       $('.imgpt').filter(function(){
//         $(this).find('.img_cont').each(function(i, elem){
//         data[i] = "'" + $(this). find('.img_cont').find('img').attr('src') + "'"
//       });
// });
//       res.send(google_data);
//
//       fs.writeFile('google_output.js',"var google_output = [" + google_data + "]", function(error){
//               console.log("File is written successfully!");
//
//       });
//     }
//   });
// //All the web scraping magic will happen here
// //  res.send('Hello World!');
//
// });

// // INSTAGRAM SCRAPER: access by going to 'localhost:2100/instagram'
// app.get('/instagram', function(req, res){
//
//   // try any hashtags and see the results, make sure to write INSIDE the quotation marks
//   var hashtag = 'domenikostheotokopoulos';
//   var url = 'https://instagram.com/explore/tags/'+ hashtag +'/?__a=1';
//
//   // let's make the http request to the url above using the 'request' dependency
//   request(url, function(error, response, html) {
//
//     // only execute if there's no error
//     if(!error) {
//
//       // we can use the dependency 'cheerio' to traverse the DOM and use jQuery-like selectors and functions
//       var $ = cheerio.load(html);
//
//       // the url actually gives back already a ready to use JSON object so we just want that raw text
//       var instagram_data = JSON.parse($.text());
//       var instagram_urls = [];
//
//       for(var i = 0; i < instagram_data.graphql.hashtag.edge_hashtag_to_media.edges.length; i++) {
//         instagram_urls[i] = instagram_data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.display_url;
//
//         download_file_curl(instagram_data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.display_url);
//
//         // fs.createWriteStream('./data/'+[i]+'.jpg', instagram_data.graphql.hashtag.edge_hashtag_to_media.edges[i].node.display_url, function(err){
//         //   console.log('File is written successfully!');
//         // });
//       }
//
//       // send the data we've stored in our array back to the browser
//       res.send(instagram_urls);
//
//       // save the data we've stored in our object on our machine
//
//     }
//   });
// });
//
// var download_file_curl = function(file_url) {
//   // extract the file name
//   var file_name = url.parse(file_url).pathname.split('/').pop();
//   // create an instance of writable stream
//   var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
//   // execute curl using child_process' spawn function
//   var curl = spawn('curl', [file_url]);
//   // add a 'data' event listener for the spawn instance
//   curl.stdout.on('data', function(data) { file.write(data); });
//   // add an 'end' event listener to close the writeable stream
//   curl.stdout.on('end', function(data) {
//     file.end();
//     console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
//   });
//   // when the spawn child process exits, check if there were any errors and close the writeable stream
//   curl.on('exit', function(code) {
//     if (code != 0) {
//       console.log('Failed: ' + code);
//     }
//   });
// };



// //IMDB SCRAPPER
// app.get('/imdb', function(req, res){
//    var url = "<https://www.imdb.com/chart/top>";
//    request(url, function(error, response, html){
//      if(!error){
//        var imdb_data = [];
//        var $ = cheerio.load(html);
//        $('.lister').filter(function(){ //.lister is what the div is called
//          $(this).find('tr').each(function(i, element){ // tr = table row, i, element = index and full element
//              imdb_data[i] = "'" + $(this).find('img').attr('src') + "'";
//          });
//        });
//          res.send(imdb_data);
//          fs.writeFile('imdb_output.js',"var imdb_output = [" + imdb_data + "]", function(error){
//            console.log("File is written successfully!");
//          });
//        }
//      });
//    });



app.listen(port);
console.log('Magic happens on port' + port);

exports = module.exports = app;
