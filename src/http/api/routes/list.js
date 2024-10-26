const 
  http = require('../../../plugins/http'),
  res = require('../../../plugins/response'),
  dictionary = require('../dictionaries')
;

const handler = async (event, _) => {

  console.log(event);
  
  const page = event.queryStringParameters?.page || 1;
  
  const path = event.path
  const model = "/planets";

  let url = `${apiUrl}${model}?page=${page}`; 
  let data;
  try {
    data = await http.get(url);
  } catch (error) {
    return res.error(`Se tuvo un error ${error.status} en la petición API`);
  }
  
  data = dictionary.collection(data, dictionary.planet, [model, path]);
  response = res.ok(data)
  return response;
}

module.exports = handler;
  