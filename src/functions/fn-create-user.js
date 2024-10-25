const 
  mysql = require('../plugins/mysql'),
  res = require('../plugins/response'),
  validator = require('../plugins/validator')
;

const handler = async (event, _) => {
  
  // const { nombre, edad } = JSON.parse(event.body);
  
  // console.log(event.body)
  try {
    await mysql.connectDB();
  } catch (error){
    return res.error("No se pudo conectar a la Base de Datos")
  }

  // mysql.createDatabaseIfNotExists();
  // mysql.createUsersTable()
  validator._unique('prueba', 'hola','users','name');
  //TODO

  return "OK";
}

module.exports = handler;