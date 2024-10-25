const mysql = require('mysql2/promise');

const connectDB = async (schema = process.env.DB_NAME) => { 

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    global.connection = connection;

    useSchema(schema);

  } catch (error) {
    console.log({message: "Error de conexión a MySQL", error})
    throw(error)
  }
};

const endDB = async () => {
  await connection.end();
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

const createUsersTable = async () => {
  
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      dni VARCHAR(20) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `;

  await runQuery(query);

  console.log("Tabla 'users' creada o ya existe.");
};

module.exports = {
  connectDB,
  endDB,
  useSchema,
  runQuery,
  execute,
  createDatabaseIfNotExists,
  createUsersTable,
}