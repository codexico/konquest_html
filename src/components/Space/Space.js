import React, { Component } from 'react';
import './Space.css';
import Planet from '../Planet/Planet';
import Player from '../Player/Player';

class Space extends Component {
    getPlanet(planet) {
        if (!planet) {
            return null;
        }
        return <Planet {...planet} />;
    }
    getPlayer(planet) {
        if (planet && planet.player) {
            return <Player player={planet.player} />;
        }
        return null;
    }

    render() {
        return (
            <button className="space" >
                {this.getPlayer(this.props.planet)}
                {this.getPlanet(this.props.planet)}
            </button>
        );
    }
}

export default Space;
