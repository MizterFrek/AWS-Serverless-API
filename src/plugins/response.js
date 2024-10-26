const createResponse =(statusCode, body, headers = {}) => {
  return {
    statusCode,
    headers: {
      'Content-Type': CONTENT_TYPE,
      ...headers
    },
    body: JSON.stringify(body)
  };
}

const ok = (data) => {
  return createResponse(HTTP_OK, { 
    codigo: HTTP_OK,  
    mensaje: MSG_200,
    datos: data
  })
}

const created = (data) => {
  return createResponse(HTTP_CREATED, { 
    codigo: HTTP_CREATED,  
    mensaje: MSG_201,
    datos: data
  })
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