const 
  res = require('../../../plugins/response'),
  bookModel = require('../models/book.model.dynamodb')
;

const handler = async (_, __) => {
  
  try {
    const books = await bookModel.getAll();

    return res.ok(books.map(book => book.toResponse()))
  } catch(error) {
    return res.error(MSG_500,error.message)
  }

}

module.exports = handler;
  