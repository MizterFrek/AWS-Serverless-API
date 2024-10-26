const uuid = require('./uuid');

const { DynamoDBClient } = require ("@aws-sdk/client-dynamodb");
const { ScanCommand, PutCommand, DynamoDBDocumentClient } = require ("@aws-sdk/lib-dynamodb");

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

const scanTable = async (config) => {
    
    const command = new ScanCommand(config);
  
    const response = await docClient.send(command);
    

    return response;
};

const searchOnColumn = async (TableName, column, value) => {

    const config = {
        TableName: TableName,
        ProjectionExpression: `#${column}`,
        FilterExpression: `#${column} = :${column}`,
        ExpressionAttributeNames: { [`#${column}`]: column },
        ExpressionAttributeValues: { [`:${column}`]: value },    
    };

    const command = new ScanCommand(config);

    const data = await docClient.send(command);

    return data;
}

module.exports = {
    initDynamoDB,
    createRow,
    scanTable,
    searchOnColumn,
}


