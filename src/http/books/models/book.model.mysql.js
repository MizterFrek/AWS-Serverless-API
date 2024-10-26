const mysql = require('../../../plugins/mysql');
const utils = require('../../../config/utils');
class Book {
    constructor(book) {
        this.id = book.id;
        this.name = book.name;
        this.author = book.author;
        this.published_at = book.published_at;
        this.created_at = book.created_at;
        this.updated_at = book.updated_at;
    }

    toResponse() {
        return {
            id: this.id,
            nombre: this.name,
            autor: this.author,
            fechaPublicacion: utils.getFormatDate(new Date(this.published_at)),
            creadoEn: this.created_at,
            editadoEn: this.updated_at,
        }
    }
}

const getAll = async () => {
    await mysql.connectDB();
    await mysql.useSchema();

    const query = 'SELECT * FROM books';

    const [data] = await mysql.execute(query);

    const books = data.map(book => new Book(book));

    await mysql.endDB();

    return books;
}

const createNew = async (name, author, published_at) => {
    await mysql.connectDB();
    await mysql.useSchema();

    const timestamp = new Date;

    const query = "INSERT INTO books (name,author,published_at,created_at,updated_at) VALUES (?,?,?,?,?)";

    const [data] = await mysql.execute(query, [name,author,published_at,timestamp,timestamp]);
    
    await mysql.endDB();
    
    const id = data.insertId;
    
    const book = new Book({id, name, author, published_at, created_at: timestamp, updated_at: timestamp});

    return book;
}



module.exports = {
    getAll,
    createNew,
    Book,
}