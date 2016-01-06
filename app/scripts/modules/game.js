function prepateTurn(state, planets, fleets) {
  return state.planets
    .filter(planets.isOcuppied)
    .map(planets.grow)
    .filter(planets.wishToSendFleet)
    .map(fleets.createFleet);
}

function executeTurn(state, fleets) {
  // todo: verify if is turn of arrival, for now all the fleets use wormholes
  // all the fleets arrive every turn
  state.fleets.forEach(fleets.arrive);
  state.fleets = [];
}

export function endTurn(state, planets, fleets, utils) {
  state.turn++;

  console.groupCollapsed('turn ', state.turn);
  prepateTurn(state, planets, fleets);
  console.log('state.fleets', state.fleets);
  executeTurn(state, fleets);
  console.groupEnd();

  utils.score();
}
