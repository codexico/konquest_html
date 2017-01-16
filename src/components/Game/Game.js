import React, { Component } from 'react';
import BigBang from '../BigBang/BigBang';
import Galaxy from '../Galaxy/Galaxy';
import { growPlanets } from '../Planet/Planet';
import { createComputerFleets } from '../Player/Player';
import { clone } from '../../modules/helpers';


function initTurn(originalPlanets, turn) {
    originalPlanets = growPlanets(originalPlanets);
    const {planets, fleets} = createComputerFleets(originalPlanets, turn);
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
        const galaxy = {spaces, planets, players, fleets};
        this.history = [galaxy];

        this.state = {
            turn: 0,
            galaxy
        };
    }

    endTurn = () => {
        // battles(fleets)
        // score()

        const current = clone(this.history[this.history.length - 1]);
        // console.log(current);
        const {planets, fleets} = initTurn(current.planets, this.state.turn);

        current.planets = planets;
        current.fleets = fleets;

        this.history.push(current);

        this.setState({
            turn: this.history.length,
            galaxy: current
        });
    }

    render() {
        return (
            <div className="game">
                <Galaxy
                    galaxy={this.state.galaxy}
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
