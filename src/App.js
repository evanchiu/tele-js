import React, { Component } from 'react';
import ShowList from './ShowList';
import 'whatwg-fetch';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {shows: []};
  }

  componentDidMount() {
    var self = this;
    fetch('/shows.json')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        self.setState({shows: json});
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>{ this.props.config.title }</h1>
          <p>{ this.props.config.tagline }</p>
        </div>

        <ShowList
          shows={this.state.shows}
          showColors={this.props.config.showColors}
          defaultColor={this.props.config.defaultShowColor}
          totalBytes={this.props.config.totalBytes}
        />

        <hr />

        <footer>
          <p>&copy;2016 <a href="http://evanchiu.com">Evan Chiu</a> | Fork me on <a href="https://github.com/evanchiu/tele-js">Github</a></p>
        </footer>
      </div>
    );
  }
}

export default App;
