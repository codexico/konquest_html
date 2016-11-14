import React, { Component } from 'react';
import './Space.css';
import Planet from '../Planet/Planet';

function createSpace(x, y, i) {
    return {x, y, i};
}

class Space extends Component {
    getPlanet(planet) {
        if (!planet) {
            return null;
        }
        return <Planet {...planet} />;
    }

    render() {
        return (
            <button className="space" >
                {this.getPlanet(this.props.planet)}
            </button>
        );
    }
}

export default Space;
export { createSpace };
