const utils = require('../config/utils');

const createResponse = (statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': CONTENT_TYPE,
      ...headers
    },
    body: JSON.stringify(body)
  };
}

const buildBody = (data = null, status, msg) => {
  let body = { codigo: status,   mensaje: msg };

  if ( !utils.isInvalid(data) ) {
    body.data = data
  }

  return body;
}

const ok = (data = null) => {
  return createResponse(HTTP_OK, buildBody(data, HTTP_OK, MSG_200));
}

const created = (data = null) => {
  return createResponse(HTTP_CREATED, buildBody(data, HTTP_CREATED, MSG_201));
}

const validationError = (message, errors = []) => {
  return createResponse(HTTP_VALIDATION_ERROR, { 
    codigo: HTTP_VALIDATION_ERROR,  
    mensaje: message || MSG_422,
    errores: errors,
  });
}

const error = (message, errors = []) => {
  console.log('errores', errors)
  return createResponse(HTTP_INTERNAL_SERVER_ERROR, { 
    codigo: HTTP_INTERNAL_SERVER_ERROR,  
    mensaje: message || MSG_500,
    errores: errors.length ? JSON.stringify(errors) : [],
  });
}
  
module.exports = {
    createResponse,
    ok,
    created,
    error,
    validationError,
};