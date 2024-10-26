const 
  res = require('../../../plugins/response'),
  bookValidator = require('../rules/book.validator')
;

const bookModel = require('../models/book.model');

const handler = async (event, _) => {

  await bookValidator(event.body);

  if (validation_fails) {
    return res.validationError(validation_message, validation_errors);
  }


  // const { name, author, published_at } = JSON.parse(event.body);

  // const book = await bookModel.createNew(name, author, published_at);

  // return res.created(book.toResponse());
}

module.exports = handler;