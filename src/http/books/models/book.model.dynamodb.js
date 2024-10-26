const dynamodb = require('../../../plugins/dynamodb');
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
    // await mysql.connectDB();
    // await mysql.useSchema();

    const query = 'SELECT * FROM books';

    // const [data] = await mysql.execute(query);

    const books = data.map(book => new Book(book));

    // await mysql.endDB();

    return books;
}

const createNew = async (name, author, published_at) => {
    
    dynamodb.initDynamoDB()

    try {
        const data = await dynamodb.createRow('BooksTable', { name, author, published_at });
        return data;
    } catch (error) {
        console.error('Error al crear el registro:', error);
        throw error;
    }
}



module.exports = {
    getAll,
    createNew,
    Book,
}