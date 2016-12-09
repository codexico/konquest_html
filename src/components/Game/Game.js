import React, { Component } from 'react';
import BigBang from '../BigBang/BigBang';
import Galaxy from '../Galaxy/Galaxy';
import { growPlanets } from '../Planet/Planet';
import { createComputerFleets } from '../Player/Player';
import { clone } from '../../modules/helpers';


function initTurn(planets, turn) {
    planets = growPlanets(planets);
    const fleets = createComputerFleets(planets, turn);
    return {planets, fleets};
}


class Game extends Component {
    constructor(props) {
        super(props);

        this.defaults = {
            rows: 14,
            cols: 10,
            density: 0.2,
            players: 5,
            production: 10
        };

        const {spaces, planets, players} = BigBang(this.defaults);
        const fleets = [];

        this.history = [{spaces, planets, players, fleets}];

        this.state = {
            turn: 0,
            spaces, planets, players, fleets
        };
    }

    endTurn = () => {
        // battles(fleets)
        // score()

        const current = clone(this.history[this.history.length - 1]);
        const {planets, fleets} = initTurn(current.planets, this.state.turn);

        current.planets = planets;
        current.fleets = fleets;

        this.history.push(current);

        this.setState({
            turn: this.history.length,
            planets: current.planets,
            fleets: current.fleets
        });
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

                <button onClick={this.endTurn}>
                    End Turn
                </button>
            </div>
        );
    }
}

export default Game;
