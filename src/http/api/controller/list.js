const 
  http = require('../../../plugins/http'),
  res = require('../../../plugins/response'),
  dictionary = require('../dictionaries'),
  utils = require('../../../config/utils')
;

const handler = async (event, _) => {
    
  utils.setDomain(event);

  const page = event.queryStringParameters?.page || 1;
  
  const path = event.path

  const model = "/planets/";

  let url = `${process.env.API_URL}${model}?page=${page}`; 
  let data;
  try {
    data = await http.get(url);
  } catch (error) {
    return res.error(`Se tuvo un error ${error.status} en la petición API`);
  }
  
  console.log(path)
  data = dictionary.collection(data, dictionary.planet, [model, path]);
  response = res.ok(data)
  return response;
}

module.exports = handler;
  