#!/usr/bin/env node
// util.js
// Module continaining server side JavaScript utilities

// Imports
var http = require('http'),
  https = require('https');

// Reaches out to target url, gives parsed de-chunked result to callback
function get(url, callback, attempt) {
  if (url.indexOf('https') === 0) {
    https.get(url, getProcessor(url, callback, attempt))
      .on('error', getErrorHandler(url));
  } else {
    http.get(url, getProcessor(url, callback, attempt))
      .on('error', getErrorHandler(url));
  }
}

// Returns a function to do the processing
function getProcessor(url, callback, attempt) {
  return function(res) {
    processResponse(res, url, callback, attempt);
  };
}

function getErrorHandler(url) {
  return function(err) {
    log('Couldn\'t get (' + url + ') ');
    log(err);
  };
}

// Processes the http(s) responses
function processResponse(res, url, callback, attempt) {
  var response = '';
  res.on('data', function(chunk) {
    response += chunk.toString();
  }).on('end', function() {
    try {
      callback(response);
    } catch (err) {
      // On parse error, try again, up to 3 times
      attempt = (typeof attempt === 'undefined') ? 1 : attempt + 1;
      if (attempt < 3) {
        get(url, callback, attempt);
      } else {
        log('Gave up after three attempts (' + url + ') ');
        log(err);
      }
    }
  });
}

function log(message) {
  var d = new Date();
  console.log(d.toJSON() + ': ' + message);
}

// Exports
module.exports = {
  get: get,
  log: log
};

// "main" function
if (require.main === module) {
}
