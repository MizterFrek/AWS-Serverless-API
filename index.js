require('./src/config/constants');

const allPlanets = require('./src/http/api/routes/list');
const showPlanet = require('./src/http/api/routes/show');
// const createUser = require('./src/http/users/routes/user.fn.create');

module.exports = {
  allPlanets,
  showPlanet,
  // createUser,
};
