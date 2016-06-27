var express = require('express');
var fs = require('fs');
var sleep = require('sleep').sleep;

var app = express();

fs.writeFileSync('./data.txt', '0');

var visited = 0;

app.get('/', function (req, res, next) {
  console.log('=========== new request');
  visited += 1;
  console.log('visited: ' + visited);

  sleep(3);
  console.log('to read data file');
  fs.readFile('./data.txt', function (err, data) {
    if (err) return next(err);
    console.log('file content: ' + data);
    var oldNumber = parseInt(data);
    console.log('=== old number: ' + oldNumber);
    var newData = '' + (oldNumber + 1);
    fs.writeFile('./data.txt', newData, function (err) {
      if(err) return next(err);
      console.log('' + visited + ' : ' + newData);
      res.sendStatus(200);
    })
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});