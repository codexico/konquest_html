import React, { Component } from 'react';
import Space from '../../components/Space/Space'

class Galaxy extends Component {
  renderSpace() {
    const hasPlanet = (Math.random() > 0.5) ? true : false;
    return <Space hasPlanet={hasPlanet} />;
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
