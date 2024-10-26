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

const getAll = async (TableName = process.env.DB_TABLE) => {
    dynamodb.initDynamoDB()

    try {

        const config = {
            ProjectionExpression: 'id, #name, author, published_at, created_at, updated_at',
            ExpressionAttributeNames: { "#name": "name" },
            TableName,
        };

        const data = await dynamodb.scanTable(config);

        const books = data.Items.map(book => new Book(book));
        return books;
    } catch (error) {
        console.error(`Error al listar la tabla ${TableName}:`, error);
        throw error;
    }
}

const createNew = async (data, TableName = process.env.DB_TABLE) => {
    
    dynamodb.initDynamoDB()

    try {
        const response = await dynamodb.createRow(data, TableName);
        return response;
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