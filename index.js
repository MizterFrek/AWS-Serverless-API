const http = require('./src/plugins/http.adapter');
const res = require('./src/plugins/response.adapter')
const { apiUrl } = require('./src/const')

const handler = async (event, context) => {

  const url = `${apiUrl}/pladnets/1/`; 

  let response;
  try {
    const data = await http.get(url);

    response = res.ok(data)
  } catch (error) {
    response = res.error(`Se tuvo un error ${error.status} en la petición API`);
  }

  return response;
}

module.exports = {
  handler,
};
