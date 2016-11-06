import React, { Component } from 'react';
import Galaxy from '../../components/Galaxy/Galaxy'

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="galaxy">
          <Galaxy />
        </div>
        <div className="order">
        </div>
      </div>
    );
  }
}

export default Game;
