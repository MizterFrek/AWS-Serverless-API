const 
  http = require('../../../plugins/http'),
  res = require('../../../plugins/response'),
  dictionary = require('../dictionaries')
  utils = require('../../../config/utils')
;

const handler = async (event, _) => {
  
  utils.setDomain(event);

  const ID = event.pathParameters.id;
  
  const path = event.path;
  const model = "/planets";

  const url = `${process.env.API_URL}${model}/${ID}`; 
  let data;
  try {
    data = await http.get(url);
  } catch (error) {
    return res.error(`Se tuvo un error ${error.status} en la petición API`);
  }

  data = dictionary.planet(data, [`${model}/${ID}`, path]);
  response = res.ok(data)
  return response;
}

module.exports = handler;