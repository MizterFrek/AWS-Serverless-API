const 
  mysql = require('../../../plugins/mysql'),
  res = require('../../../plugins/response'),
  userValidator = require('../rules/user.validator')
;

const User = require('../models/user.model');

const handler = async (event, _) => {

  // try {

  //   await userValidator(event);
  
  //   console.log('validation_fails',validation_fails);
  //   console.log('validation_errors',validation_errors)

  //   if(validation_fails) {
  //     return res.validationError(MSG_422, validation_errors)
  //   }
  // } catch(error) {
  //   return res.error(error.message)
  // }
  // const { nombre, edad } = JSON.parse(event.body);
  
  // console.log(event.body)
  

  // mysql.createDatabaseIfNotExists();
  // mysql.createUsersTable()
  //TODO

  const { name, email, password, dni } = JSON.parse(event.body);

  const user = new User(name, email, password, dni);

  return res.ok(user.get());
}

module.exports = handler;