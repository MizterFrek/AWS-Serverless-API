require('./src/config/constants');

const listPlanets = require('./src/http/api/controller/list');
const showPlanet = require('./src/http/api/controller/show');

const listBooks = require('./src/http/books/controller/list');
const createBook = require('./src/http/books/controller/create');

const makeMigrations = require('./src/database/migrations');

module.exports = {
  listPlanets,
  showPlanet,
  
  listBooks,
  createBook,

  makeMigrations,
};
