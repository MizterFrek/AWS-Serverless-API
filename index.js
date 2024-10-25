require('./src/config/constants');

const allPlanets = require('./src/functions/fn-all-planets');
const showPlanet = require('./src/functions/fn-show-planet');
const createUser = require('./src/functions/fn-create-user');

module.exports = {
  allPlanets,
  showPlanet,
  createUser,
};
