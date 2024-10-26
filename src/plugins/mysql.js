const mysql = require('mysql2/promise');

const connectDB = async (schema = process.env.DB_NAME) => { 
  if (!(global.connection || null)) {
    try {
      global.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
      });
  
      await useSchema(schema);
  
    } catch (error) {
      console.log({message: "Error de conexión a MySQL", error})
      throw(error)
    }
  };
};

const endDB = async () => {
  if ((global.connection || null)) { 
    await global.connection.end();
    global.connection = null; 
  } else {
    console.warn("No hay conexión para cerrar.");
  }
}

const useSchema = async (schema = process.env.DB_NAME) => {
  await connection.query(`USE \`${schema}\`;`);
}

const runQuery = async (query) => {
  await connection.query(query);
}

const execute = async (query, params) => {
  const data = await connection.execute(query, params);
  return data;
}

module.exports = {
  connectDB,
  endDB,
  useSchema,
  runQuery,
  execute,
}