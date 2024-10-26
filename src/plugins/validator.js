const mysql = require('../plugins/mysql');
const utils = require('../config/utils');

const _isRequired = (value = null, attr, msg = INVALID_REQUIRED) => {
    const validation = utils.isInvalid(value);
    
    if (validation)  {
        pushValidationError(attr + 'Required', msg.replace(':attr', attr))
    }
}

const _isNumber = (value = null, attr, msg = INVALID_NUMBER)  => {
    
    let validation = isNaN(parseFloat(Number(value)))

    if (validation) {
        pushValidationError(attr + 'Number', msg.replace(':attr', attr))
    }
}

const _numberLength = (value = null, lng, attr, msg = INVALID_NUMBER_LENGTH) => {
    
    let validation = (typeof value !== 'number' || Number(value).toString().length === lng);

    if (validation) {
        pushValidationError(attr + 'NumberLength', msg.replace(':lng', lng).replace(':attr', attr));
    }
}

const _maxLengthString = (value, max, attr, msg = INVALID_MAX_LENGTH) => {
    
    value = value ?? '';

    const validation = String(value).trim().length > max;

    if (validation) {
        pushValidationError(attr + 'MaxLengthString', msg.replace(':attr', attr).replace(':max', max));
    } 
}

const _minLengthString = (value, min, attr, msg = INVALID_MIN_LENGTH) => {
    
    value = value ?? '';

    const validation = String(value).trim().length < min;
    
    if (validation) {
        pushValidationError(attr + 'MinLengthString', msg.replace(':min', min).replace(':attr', attr))
    }
}

const _date = (value, attr, msg = INVALID_DATE_FORMAT) => {

    value = value ?? '';
    
    if (!REGEX_DATE.test(value)) {
        pushValidationError(attr + 'DateFormat', msg.replace(':attr', attr));
        return 
    }

    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    ) {
        pushValidationError(attr + 'DateFormat', msg.replace(':attr', attr));
        return 
    }
}

const _unique = async (value = null, attr, table, column, msg = INVALID_UNIQUE) => {
    
    if (utils.isInvalid(value)) {
        return 
    }

    try {
        await mysql.connectDB();    

        let query = `SELECT COUNT(*) AS count FROM \`${table}\` WHERE \`${column}\` = ?`;

        const params = [value];
    
        await mysql.execute(query, params).then( ([data]) => {
            const count = [data[0].count];

            const validation = (count > 0);

            if (validation) {
                pushValidationError(attr + 'Unique', msg.replace(':attr', attr));

            }
        });

    } catch (error) {

        console.error("Error en la consulta _unique:", error);
        return error;

    } finally {
        mysql.endDB();
    }
}

const pushValidationError = (attr, msg) => {
    validation_errors[attr] = msg;
    validation_fails = true;
    
}

module.exports = {
    _isRequired,
    _isNumber,
    _numberLength,
    _maxLengthString,
    _minLengthString,
    _date,
    _unique,
    pushValidationError,
}