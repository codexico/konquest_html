import React, { Component } from 'react';
import BigBang from '../BigBang/BigBang';
import Galaxy from '../Galaxy/Galaxy';


class Game extends Component {
  constructor(props) {
    super(props);

    this.defaults = {
      rows: 14,
      cols: 10,
      density: 0.2,
      players: 5,
      ships: 10,
      production: 10
    };

    const {spaces, planets, players} = BigBang(this.defaults);

    this.state = {spaces, planets, players};
  }

  render() {
    return (
      <div className="game">
        <Galaxy
          spaces={this.state.spaces}
          planets={this.state.planets}
          />
        <div className="order">
        </div>
      </div>
    );
  }
}

export default Game;
