import React, { Component } from 'react';
import ShowBox from './ShowBox';

class ShowList extends Component {
  render() {
    return (
      <div>
      { this.props.shows.map(
          (show) =>
            <ShowBox key={show.title}
              episodes={show.episodes}
              title={show.title}
              color={this.props.showColors[show.title] || this.props.defaultColor}
              totalBytes={this.props.totalBytes} />
        )
      }
      </div>
    );
  }
}

export default ShowList;
