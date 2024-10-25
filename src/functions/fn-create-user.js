const 
  mysql = require('../plugins/mysql.adapter'),
  res = require('../plugins/response.adapter')
;

const handler = async (event, _) => {
  
  const { nombre, edad } = JSON.parse(event.body);
  
  let connection;
  try {
    connection = await mysql.connectDB();
  } catch (error){
    return res.error("No se pudo conectar a la Base de Datos")
  }

  //TODO
}

module.exports = handler;