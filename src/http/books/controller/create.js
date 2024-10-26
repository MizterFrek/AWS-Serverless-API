const 
  res = require('../../../plugins/response'),
  bookModel = require('../models/book.model.dynamodb'),
  bookValidator = require('../rules/book.validator')
;

const handler = async (event, _) => {

  await bookValidator.validate(event.body);

  if (validation_fails) {
    return res.validationError(validation_message, validation_errors);
  }

  const { nombre, autor, fechaPublicacion } = JSON.parse(event.body);

  await bookModel.createNew({ 
    name: nombre, 
    author: autor, 
    published_at: fechaPublicacion 
  });

  return res.created();
}

module.exports = handler;