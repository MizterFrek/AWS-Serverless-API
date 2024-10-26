const 
  res = require('../../../plugins/response'),
  userModel = require('../models/user.model')
;

const handler = async (_, __) => {
  
  const users = await userModel.getAll();

  response = res.ok(users.map(user => user.getApiResource() ))

  return response;
}

module.exports = handler;
  