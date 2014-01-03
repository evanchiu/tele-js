// tele.js

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

    var div = $(document.createElement('div'));
    div.addClass('col-lg-4');
    div.addClass('col-sm-6');
    div.addClass('show-box');

    var title = $(document.createElement('h2'));
    title.text(key);
    div.append(title);

    var dates = shows[key];
    dates.sort(function(a,b){ return a.timestamp - b.timestamp; });
    for (var j = 0; j < dates.length; j++) {
      var date = $(document.createElement('p'));
      date.text(dates[j].date);
      div.append(date);
    }

    $('#show-container').prepend(div);
  }
}

