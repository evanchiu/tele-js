// tele.js

// On ready, make an AJAX request for the show data
$(document).ready(function() {
  $.get('json.php', onShows);
});

// On receipt of the shows, generate the html
function onShows(data) {
  var json = JSON.parse(data);
  var shows = json.shows;

  shows.sort(function(a, b){return b.timestamp - a.timestamp;});

  for (var i = 0; i < shows.length; i++) {
    var div = $(document.createElement('div'));
    div.addClass('col-lg-4');
    div.addClass('col-sm-6');
    div.addClass('show-box');

    var title = $(document.createElement('h2'));
    title.text(shows[i].title);
    div.append(title);

    var date = $(document.createElement('p'));
    date.text(shows[i].date);
    div.append(date);

    $('#show-container').prepend(div);
  }
}

