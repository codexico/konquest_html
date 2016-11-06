import React, { Component } from 'react';
import Space from '../../components/Space/Space'

class Galaxy extends Component {
  renderSpace() {
    return <Space />;
  }
  render() {
    return (
      <div>
        <div className="galaxy_row">
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
        </div>
        <div className="galaxy_row">
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
        </div>
        <div className="galaxy_row">
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
        </div>
        <div className="galaxy_row">
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
          {this.renderSpace()}
        </div>
      </div>
    );
  }
}

export default Galaxy;
