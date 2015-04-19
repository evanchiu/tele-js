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
    var dates = shows[key];
    dates.sort(function(a, b){ return a.timestamp - b.timestamp; });

    var div = $(document.createElement('div'));
    div.addClass('col-lg-4');
    div.addClass('col-sm-6');
    div.addClass('col-xs-12');
    div.addClass('show-box');

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

