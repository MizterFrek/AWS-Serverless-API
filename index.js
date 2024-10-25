const { apiUrl } = require('./src/const');

const 
  http = require('./src/plugins/http.adapter'),
  res = require('./src/plugins/response.adapter'),
  dictionary = require('./src/dictionaries')
;

/**
 * 
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
const allPlanets = async (event, context) => {

  const url = `${apiUrl}/planets`; 

  let data;
  try {
    data = await http.get(url);
  } catch (error) {
    return res.error(`Se tuvo un error ${error.status} en la petición API`);
  }

  data = dictionary.collection(data, dictionary.planet);
  response = res.ok(data)
  return response;
}

/**
 * 
 * @param {*} event 
 * @param {*} context 
 * @returns 
 */
const showPlanet = async (event, context) => {

  const ID = event.pathParameters.id;
  const url = `${apiUrl}/planets/${ID}`; 

  let data;
  try {
    data = await http.get(url);
  } catch (error) {
    return res.error(`Se tuvo un error ${error.status} en la petición API`);
  }

  data = dictionary.planet(data);
  response = res.ok(data)
  return response;
}

module.exports = {
  allPlanets,
  showPlanet
};
