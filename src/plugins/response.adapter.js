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

const error = (message) => {
  return createResponse(HTTP_INTERNAL_SERVER_ERROR, { 
    status: HTTP_INTERNAL_SERVER_ERROR,  
    message: message || MSG_500,
    data: null,
  });
}
  
module.exports = {
    createResponse,
    ok,
    created,
    error,
};