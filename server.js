#!/usr/bin/env node

var http = require('http'),
  path = require('path'),
  static = require('node-static'),
  util = require('./util');
var serverConfig = require('./ServerConfig');

// Configuration
var port = 1337;

// Start application
var app = http.createServer(handler);
app.listen(port);
util.log('Listening on port ' + port);

// Handle file server requests
var file = new static.Server('build');
function handler(req, res) {
  if (req.url === '/shows.json') {
    getShows(req, res);
  } else {
    file.serve(req, res);
  }
}

function getShows(req, res) {
  util.get('http://' + serverConfig.teleIp + ':' + serverConfig.telePort, function(data) {
    shows = [];
    lines = data.split('\n');
    show = {};
    prevTitle = '';

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      // Parse relevant details from line
      var match = line.match(/\"\>\<code\>([0-9\.]+)(B|k|M|G|T)\<\/code\>.*\>(.*)_.*_(\d+)_(\d+)_(\d+)_(\d+)_(\d+)_(\d+).*?wtv/);
      if (match) {
        // Parse details
        size = bytes(match[1], match[2]);
        title = match[3];
        date = new Date(
          match[4] + '-' +
          match[5] + '-' +
          match[6] + ' ' +
          match[7] + ':' +
          match[8] + ':' +
          match[9]);

        // Check if it's a new show
        if (title != prevTitle) {
          if (prevTitle != '') {
            shows.push(show);
          }
          show = {
            title: title,
            episodes: []
          };
          prevTitle = title;
        }

        // Add this episode
        show.episodes.push({
          date: date,
          timestamp: date.getTime(),
          size: size
        });
      }
    }

    // Add in last show
    if (prevTitle != '') {
      shows.push(show);
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(shows));
  });
}

function bytes(size, unit) {
  return (size * (1 << ('BkMGT'.indexOf(unit) * 10)));
}
