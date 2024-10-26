const 
  res = require('../../../plugins/response'),
  userModel = require('../models/book.model')
;

const handler = async (_, __) => {
  
  const users = await userModel.getAll();

  response = res.ok(users.map(user => user.toResponse() ))

  return response;
}

module.exports = handler;
  