const 
  mysql = require('../../../plugins/mysql'),
  res = require('../../../plugins/response'),
  userValidator = require('../rules/user.validator')
;

const bookModel = require('../models/book.model');

const handler = async (event, _) => {

  const { name, author, published_at } = JSON.parse(event.body);

  const book = await bookModel.createNew(name, author, published_at);

  return res.created(book.toResponse());
}

module.exports = handler;