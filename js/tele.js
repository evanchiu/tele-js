// tele.js
//

// Configuration
// classes for shows allow different shows to have different CSS classes
var showClass = {
  'evan-show-box': [
    'Brooklyn Nine-Nine',
    'Fresh Off the Boat',
    'Grandfathered',
    'Heroes Reborn',
    'Limitless',
    'Marvel\'s Agents of S.H.I.E.L.D.',
    'Minority Report',
    'Once Upon a Time',
    'Scorpion',
    'The Grinder'
  ],
  'shaina-show-box': [
    'Blood & Oil',
    'Chicago',
    'Chicago PD',
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

// On ready, make an AJAX request for the show data
$(document).ready(function() {
  $.get('json.php', onShows);
});

// On receipt of the shows, generate the html
function onShows(data) {
  var json = JSON.parse(data);
  var shows = json.shows;
  var keys = Object.keys(shows).sort();

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var dates = shows[key];
    dates.sort(function(a, b){ return a.timestamp - b.timestamp; });

    var div = $(document.createElement('div'));
    div.addClass('col-lg-4');
    div.addClass('col-sm-6');
    div.addClass('col-xs-12');
    div.addClass('show-box');
    var showClassKeys = Object.keys(showClass);
    var found = false;
    for (var j = 0; j < showClassKeys.length; j++) {
      if (showClass[showClassKeys[j]].indexOf(key) != -1) {
        div.addClass(showClassKeys[j]);
        found = true;
      }
    }
    if (!found) {
      div.addClass(defaultShowClass);
    }

    var title = $(document.createElement('h3'));
    div.append(title);

    var date = $(document.createElement('p'));
    div.append(date);

    if (dates.length == 1) {
      title.text(key);
      date.text(dates[0].date);
    } else {
      title.text(key + ' (' + dates.length + ')');
      date.text(dates[0].date + ' - ' + dates[dates.length-1].date);
    }

    $('#show-container').append(div);
  }
}

