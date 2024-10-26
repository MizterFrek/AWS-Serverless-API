/** Este archivo ya no se utiliza */
const mysql = require('../plugins/mysql');
const res = require('../plugins/response');


const createDatabaseIfNotExists = async (schema = process.env.DB_NAME) => {
   
    await mysql.runQuery(`CREATE DATABASE IF NOT EXISTS \`${schema}\`;`);
  
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
  
    await mysql.runQuery(query);
  
    console.log("Tabla 'books' creada o ya existe.");
};

const checkTableDontExists = async () => {
    try {
      const [rows] = await connection.query("SHOW TABLES LIKE 'books'");
      console.log({
        rows,
        lng: rows.length
      })
      return (rows.length = 0)
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
    } 
}
  

const seedBooksTable = async () => {

    const books = [
        {
          name: "Cien años de soledad",
          author: "Gabriel García Márquez",
          published_at: '1967-12-11'
        },
        {
          name: "1984",
          author: "George Orwell",
          published_at: '1949-06-05'
        },
        {
          name: "El amor en los tiempos del cólera",
          author: "Gabriel García Márquez",
          published_at: '1985-10-12'
        },
        {
          name: "Orgullo y prejuicio",
          author: "Jane Austen",
          published_at: '1813-09-17'
        },
        {
          name: "La sombra del viento",
          author: "Carlos Ruiz Zafón",
          published_at: '2001-02-23'
        }
    ];

    books.map(async book => {
        const query = "INSERT INTO books (name,author,published_at,created_at,updated_at) VALUES (?,?,?,?,?)";
        await mysql.execute(query, [ book.name, book.author, book.published_at, new Date, new Date ]);
    });

}

const runMigration = async () => {
    console.log('REALIZANDO MIGRACIONES');
    try {
        await mysql.connectDB();
        await createDatabaseIfNotExists();
        await mysql.useSchema();
        await createBooksTable();
        if(await checkTableDontExists()) {
            await seedBooksTable();
            return {
                statusCode: 200,
                headers: { 'Content-Type': CONTENT_TYPE },
                body: JSON.stringify({"mensaje": "Migración Completada"})
            };
        } else {
            return {
                statusCode: 200,
                headers: { 'Content-Type': CONTENT_TYPE },
                body: JSON.stringify({"mensaje": "La Migración ya fue realizada anteriormente"})
            };
        }
        
    } catch(error) {
        return res.error("No se pudo completar la migración", error)
    } finally {
        await mysql.endDB();
    }
}

module.exports = runMigration;