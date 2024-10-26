const 
  http = require('../../../plugins/http'),
  res = require('../../../plugins/response'),
  dictionary = require('../dictionaries')
;

const handler = async (event, _) => {
  
  const ID = event.pathParameters.id;
  
  console.log(event)
  const path = event.path;
  const model = "/planets";

  const url = `${apiUrl}${model}/${ID}`; 
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