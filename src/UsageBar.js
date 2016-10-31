import React, { Component } from 'react';

class UsageBar extends Component {
  render() {
    var usage = {};

    for (var i = 0; i < this.props.shows.length; i++) {
      var show = this.props.shows[i];
      var episodes = show.episodes;
      var color=this.props.showColors[show.title] || this.props.defaultColor;

      for (var j = 0; j < episodes.length; j++) {
        if (usage.hasOwnProperty(color)) {
          usage[color] += episodes[j].size;
        } else {
          usage[color] = episodes[j].size;
        }
      }
    }

    const osPercent = Math.round(this.props.osBytes*100/this.props.totalBytes) + '%';

    return (
      <div className='progress'>
        <div className='progress-bar progress-bar-success progress-bar-striped'
          style={{width: osPercent}}>
          <span>{osPercent}</span>
        </div>
        { Object.keys(usage).map(
          (color) =>
            <div key={color}
              className={'progress-bar ' + color + '-show-box'}
              style={{width: Math.round(usage[color]*100/this.props.totalBytes) + '%'}}>
              <span>{Math.round(usage[color]*100/this.props.totalBytes) + '%'}</span>
            </div>
          )
        }
      </div>
    );
  }
}

export default UsageBar;
