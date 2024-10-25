const 
  http = require('../plugins/http'),
  res = require('../plugins/response'),
  dictionary = require('../dictionaries')
;

const handler = async (event, _) => {

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

module.exports = handler;