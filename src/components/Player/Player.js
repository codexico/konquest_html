import React, { Component } from 'react';
import './Player.css';

function createLife(numPlayers) {
    const players = [];
    for (var i = 0; i < numPlayers; i++) {
        const player = {};
        player.name = `Player_${i}`;
        player.order = i;
        players.push(player);
    }
    return players;
}

class Player extends Component {
    playerStyles() {
        const colors = [
            'rgba(191, 11, 41, 0.7)',
            'rgba(196, 243, 255, 0.7)',
            'rgba(84, 234, 184, 0.7)',
            'rgba(244, 190, 73, 0.7)',
            'rgba(122, 108, 204, 0.7)',
            'rgba(176, 25, 193, 0.7)'
        ]

        const styles = {
            backgroundColor: colors[this.props.player.order]
        };
        return styles;
    }
    render() {
        return (
            <span className="Player" style={this.playerStyles()}></span>
        );
    }
}

export default Player;
export { createLife };
