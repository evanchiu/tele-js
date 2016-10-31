import React, { Component } from 'react';
var dateFormat = require('dateformat');

class ShowBox extends Component {
  render() {
    var titleLine = '';
    var dateLine = '';
    const episodes = this.props.episodes

    // Determine total size for show across episodes
    var sizeBytes = 0;
    for (var j = 0; j < episodes.length; j++) {
      sizeBytes += episodes[j].size;
    }

    const format = 'ddd, mmm d';
    // Format is slightly different for one episode vs many
    if (episodes.length === 1) {
      titleLine = this.props.title;
      dateLine = dateFormat(episodes[0].date, format)
        + ' (' + this.sizeToString(sizeBytes) + ', '
        + Math.round(sizeBytes*100/this.props.totalBytes) + '%)';
    } else {
      episodes.sort(function(a, b){ return a.timestamp - b.timestamp; });
      titleLine = this.props.title + ' (' + episodes.length + ')';
      dateLine = dateFormat(episodes[0].date, format)
        + ' - ' + dateFormat(episodes[episodes.length-1].date, format)
        + ' (' + this.sizeToString(sizeBytes) + ', '
        + Math.round(sizeBytes*100/this.props.totalBytes) + '%)';
    }

    const className = this.props.color + "-show-box show-box col-lg-4 col-sm-6 col-xs-12";
    return (
      <div className={className}>
        <h3>{titleLine}</h3>
        <p>{dateLine}</p>
      </div>
    );
  }

  sizeToString(bytes) {
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
}

export default ShowBox;
