const mysql = require('../plugins/mysql');

const _isNumber = (value, attr, msg = INVALID_NUMBER)  => {
    if (isNaN(parseFloat(Number(value)))) {
        throw msg.replace(':attr', attr);
    }
}

const _numberLength = (value, lng, attr, msg = INVALID_NUMBER_LENGTH) => {
    if (typeof value !== 'number' || Number(value).toString().length === lng) {
        msg.replace(':lng', lng);
        throw msg.replace(':attr', attr);
    }
}

const _maxLengthString = (value, max, attr, msg = INVALID_MAX_LENGTH) => {
    if (String(value).trim().length > max) {
        msg.replace(':max', max);
        throw msg.replace(':attr', attr);
    }
}

const _minLengthString = (value, min, attr, msg = INVALID_MIN_LENGTH) => {
    if (String(value).trim().length < min) {
        msg.replace(':min', min);
        throw msg.replace(':attr', attr);
    }
}

const _email = (value, attr, msg = INVALID_EMAIL) => {
    if (!value.match(REGEX_EMAIL)) {
        throw msg.replace(':attr', attr);
    }
}

const _unique = (value, attr, table, column, msg = INVALID_UNIQUE) => {
    mysql.connectDB();

    try {
        let query = `SELECT COUNT(*) AS count FROM \`${table}\` WHERE \`${column}\` = ?`;

        const params = [value];
    
        mysql.execute(query, params).then( ([data]) => {
            const count = [data[0].count];
            if (count > 0) {
                throw new Error(msg.replace(':attr', attr))
            }
        });

    } catch (error) {

        console.error("Error en la consulta _unique:", error);
        throw new Error(error);

    } finally {
        mysql.endDB();
    }
}

const _securePassword = (value, attr, msg = INVALID_PASSWORD) => {
    if (!value.match(REGEX_SECURE_PASSWORD)) {
        throw msg.replace(':attr', attr);
    }                   
}
module.exports = {
    _isNumber,
    _numberLength,
    _maxLengthString,
    _minLengthString,
    _email,
    _unique,
    _securePassword,
}