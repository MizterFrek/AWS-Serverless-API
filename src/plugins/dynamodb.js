const uuid = require('./uuid');

const { DynamoDBClient } = require ("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require ("@aws-sdk/lib-dynamodb");

const initDynamoDB = async () => { 
    if (!(global.connection || null)) {
        try {
            
            global.client = new DynamoDBClient({});
            global.docClient = DynamoDBDocumentClient.from(client);

        } catch (error) {
            console.log({message: "Error de conexión a DynamoDB", error})
            throw(error)
      }
    };
};

const createRow = async (TableName, data) => {

    const timestamp = new Date().toISOString();

    const command = new PutCommand({
        TableName,
        Item: {
            id: uuid.makePrimaryKey(),
            ...data,
            created_at: timestamp,
            updated_at: timestamp,
        },
      });

    const response = await docClient.send(command);

    return response;
}

module.exports = {
    initDynamoDB,
    createRow,
}


