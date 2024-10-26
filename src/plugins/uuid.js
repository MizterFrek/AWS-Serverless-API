const { v4 } = require('uuid');

const makePrimaryKey = () => {
    return v4();
}

module.exports = {
    makePrimaryKey
};