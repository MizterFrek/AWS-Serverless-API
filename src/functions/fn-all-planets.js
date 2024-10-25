const { apiUrl } = require('../const');

const 
  http = require('../plugins/http.adapter'),
  res = require('../plugins/response.adapter'),
  dictionary = require('../dictionaries')
;

const handler = async (event, context) => {

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

module.exports = handler;
  