import React, { Component } from 'react';


class Order extends Component {
  render() {
    return (
      <div className="order">
          <div className="step1">
                <p>Select source planet</p>
                <p>
                    Name:
                    <span className="planet_data-data source_planet-name"></span>
                </p>
                <p>
                    Ships:
                    <span className="planet_data-data source_planet-ships"></span>
                </p>
                <p>
                    Production:
                    <span className="planet_data-data source_planet-production"></span>
                </p>
          </div>
          <div className="step2">
                <p>Select destination planet</p>
                <p>
                    Name:
                    <span className="planet_data-data destiny_planet-name"></span>
                </p>
                <p>
                    Ships:
                    <span className="planet_data-data destiny_planet-ships"></span>
                </p>
                <p>
                    Production:
                    <span className="planet_data-data destiny_planet-production"></span>
                </p>
          </div>
      </div>
    );
  }
}

export default Order;
