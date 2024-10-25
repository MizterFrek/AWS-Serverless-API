const config = require('../const');

const createResponse =(statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': config.CONTENT_TYPE,
      ...headers
    },
    body: JSON.stringify(body)
  };
}

const ok = (data) => {
  return createResponse(config.HTTP_OK, { 
    status: config.HTTP_OK,  
    message: config.MSG_200,
    data
  })
}

const created = (data) => {
  return createResponse(config.HTTP_CREATED, { 
    status: config.HTTP_CREATED,  
    message: config.MSG_201,
    data
  })
}

const error = (message) => {
  return createResponse(config.HTTP_INTERNAL_SERVER_ERROR, { 
    status: config.HTTP_INTERNAL_SERVER_ERROR,  
    message: message || config.MSG_500
  });
}
  
module.exports = {
    createResponse,
    ok,
    created,
    error,
};