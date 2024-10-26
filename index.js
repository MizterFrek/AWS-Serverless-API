require('./src/config/constants');

const listPlanets = require('./src/http/api/controller/list');
const showPlanet = require('./src/http/api/controller/show');

const listUsers = require('./src/http/users/controller/list');
// const createUser = require('./src/http/users/routes/user.fn.create');

module.exports = {
  listPlanets,
  showPlanet,
  
  listUsers,
  // createUser,
};
