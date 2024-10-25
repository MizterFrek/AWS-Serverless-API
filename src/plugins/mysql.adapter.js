const mysql = require('mysql2/promise');

const connectDB = async () => { 

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    return connection;
  } catch (error) {
    console.log({message: "Error de conexión a MySQL", error})
    throw(error)
  }
};

module.exports = {
  connectDB,
}