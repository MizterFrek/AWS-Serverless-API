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
    status: HTTP_OK,  
    message: MSG_200,
    data
  })
}

const created = (data) => {
  return createResponse(HTTP_CREATED, { 
    status: HTTP_CREATED,  
    message: MSG_201,
    data
  })
}

const validationError = (message, errors = []) => {
  return createResponse(HTTP_VALIDATION_ERROR, { 
    status: HTTP_VALIDATION_ERROR,  
    message: message || MSG_422,
    errors,
  });
}

const error = (message, errors = []) => {
  console.log('errores', errors)
  return createResponse(HTTP_INTERNAL_SERVER_ERROR, { 
    status: HTTP_INTERNAL_SERVER_ERROR,  
    message: message || MSG_500,
    errors: errors.length ? JSON.stringify(errors) : [],
  });
}
  
module.exports = {
    createResponse,
    ok,
    created,
    error,
    validationError,
};