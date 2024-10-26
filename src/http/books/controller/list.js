const 
  res = require('../../../plugins/response'),
  userModel = require('../models/book.model')
;

const handler = async (_, __) => {
  
  try {
    const users = await userModel.getAll();

    return res.ok(users.map(user => user.toResponse()))
  } catch(error) {
    return res.error(MSG_500,error.message)
  }

}

module.exports = handler;
  