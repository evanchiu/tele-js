// tele.js

// Configuration
// classes for shows allow different shows to have different CSS classes
var showClass = {
  'evan-show-box': [
    'Brooklyn Nine-Nine',
    'Fresh Off the Boat',
    'Grandfathered',
    'Limitless',
    'Marvel\'s Agents of S.H.I.E.L.D.',
    'Minority Report',
    'Once Upon a Time',
    'Scorpion',
    'Supergirl',
    'The Grinder'
  ],
  'shaina-show-box': [
    'Blood & Oil',
    'Chicago',
    'Chicago Fire',
    'Chicago P.D.',
    'Chicago Med',
    'How to Get Away With Murder',
    'Grey\'s Anatomy',
    'Madam Secretary',
    'Quantico',
    'Scandal',
    'The Blacklist',
    'The Good Wife'
  ]
}
var defaultShowClass = 'jessi-show-box';
var totalBytes = 1000000000000;
var osBytes = 30000000000;
var usage = {};

// On ready, make an AJAX request for the show data
$(document).ready(function() {
  $.get('json.php', onShows)
    .fail(function() {
      $('#loading').hide();
      $('#error').show()
        .text('Error loading shows');
    }
  );
  $('#loading').show();
});

// On receipt of the shows, generate the html
function onShows(data) {
  $('#loading').hide();

  var json = JSON.parse(data);
  var shows = json.shows;

  if (!json.shows || json.error) {
    $('#error').show()
      .text('Error loading shows: ' + json.error);
  }

  for (var i = 0; i < shows.length; i++) {
    var show = shows[i];
    var title = show['title'];
    var episodes = show['episodes'];
    episodes.sort(function(a, b){ return a.timestamp - b.timestamp; });

    // Determine total size for show across episodes
    var sizeBytes = 0;
    for (var j = 0; j < episodes.length; j++) {
      sizeBytes += episodes[j].size;
    }

    var div = $(document.createElement('div'));
    div.addClass('col-lg-4');
    div.addClass('col-sm-6');
    div.addClass('col-xs-12');
    div.addClass('show-box');

    // Determine and add class
    var showClassKeys = Object.keys(showClass);
    var found = false;
    for (var j = 0; j < showClassKeys.length; j++) {
      if (showClass[showClassKeys[j]].indexOf(title) != -1) {
        div.addClass(showClassKeys[j]);
        addUsage(showClassKeys[j], sizeBytes);
        found = true;
      }
    }
    if (!found) {
      div.addClass(defaultShowClass);
      addUsage(defaultShowClass, sizeBytes);
    }

    var titleEl = $(document.createElement('h3'));
    div.append(titleEl);

    var dateEl = $(document.createElement('p'));
    div.append(dateEl);

    if (episodes.length == 1) {
      titleEl.text(title);
      dateEl.text(episodes[0].date +
        ' (' + sizeToString(sizeBytes) + ', ' +
        Math.round(sizeBytes*100/totalBytes) + '%)');
    } else {
      titleEl.text(title + ' (' + episodes.length + ')');
      dateEl.text(episodes[0].date + ' - ' + episodes[episodes.length-1].date +
        ' (' + sizeToString(sizeBytes) + ', ' +
        Math.round(sizeBytes*100/totalBytes) + '%)');
    }

    $('#show-container').append(div);
  }

  // Disk Usage Bar
  var dubEl = $('#disk-usage-bar');

  // OS Usage
  var osEl = $(document.createElement('div'));
  osEl.addClass('progress-bar');
  osEl.addClass('progress-bar-success');
  osEl.addClass('progress-bar-striped');
  osEl.css('width', Math.round(osBytes*100/totalBytes) + '%');
  var osSpan = $(document.createElement('span'));
  osSpan.text(Math.round(osBytes*100/totalBytes) + '%');
  osEl.append(osSpan);
  dubEl.append(osEl);

  var keys = Object.keys(usage);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var viewerEl = $(document.createElement('div'));
    viewerEl.addClass('progress-bar');
    viewerEl.addClass(key);
    viewerEl.css('width', Math.round(usage[key]*100/totalBytes) + '%');
    var viewerSpan = $(document.createElement('span'));
    viewerSpan.text(Math.round(usage[key]*100/totalBytes) + '%');
    viewerEl.append(viewerSpan);
    dubEl.append(viewerEl);
  }

  dubEl.show();
}

function addUsage(showClass, sizeBytes) {
  if (usage.hasOwnProperty(showClass)) {
    usage[showClass] += sizeBytes;
  } else {
    usage[showClass] = sizeBytes;
  }
}

function sizeToString(bytes) {
    var sizeString = '';
    var threshold = 1024;

    if (bytes < threshold) {
      return bytes + 'B';
    }

    var units = [ 'k','M','G','T','P','E','Z','Y' ];
    var u = -1;
    do {
        bytes /= threshold;
        ++u;
    } while (bytes >= threshold);

    var b = bytes.toFixed(1);
    if (isNaN(b)) b = '??';

    return b + units[u];
}
