import React, { Component } from 'react';
import ShowList from './ShowList';
import Notice from './Notice';
import 'whatwg-fetch';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      info: '',
      error: '',
      shows: []
    };
  }

  componentDidMount() {
    var self = this;
    this.setState({info: 'loading...'});
    fetch('/shows.json')
      .then(function(response) {
        self.setState({info: ''});
        return response.json();
      }).then(function(json) {
        self.setState({shows: json});
      }).catch(function(ex) {
        self.setState({error: 'Error retrieving show data: ' + ex});
      });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>{ this.props.config.title }</h1>
          <p>{ this.props.config.tagline }</p>
        </div>

        { this.state.info && <Notice type="info" message={this.state.info} /> }
        { this.state.error && <Notice type="danger" message={this.state.error} /> }

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
