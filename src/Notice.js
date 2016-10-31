import React, { Component } from 'react';

class Notice extends Component {
  render() {
    const className = 'alert alert-' + this.props.type;
    return (
      <div className={className} role="alert">{this.props.message}</div>
    );
  }
}

export default Notice;
