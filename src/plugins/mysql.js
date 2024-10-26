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

const runQuery = async (query, schema = process.env.DB_NAME) => {
  await connection.query(query);
}

const execute = async (query, params) => {
  const data = await connection.execute(query, params);
  return data;
}

const createDatabaseIfNotExists = async (schema = process.env.DB_NAME) => {
   
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${schema}\`;`);

  console.log(`Base de datos '${schema}' creada o ya existe.`);
};

const createBooksTable = async () => {
  
  const query = `
    CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      author VARCHAR(255) NOT NULL,
      published_at DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  await runQuery(query);

  console.log("Tabla 'books' creada o ya existe.");
};

module.exports = {
  connectDB,
  endDB,
  useSchema,
  runQuery,
  execute,
  createDatabaseIfNotExists,
  createBooksTable,
}