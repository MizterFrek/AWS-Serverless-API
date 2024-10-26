const mysql = require('../plugins/mysql');

const _isRequired = (value = null, attr, msg = INVALID_REQUIRED) => {

    let validation = (value === null || value === undefined || value === '' || value.trim() === '') 
        ? msg.replace(':attr', attr)
        : false
    ;

    pushValidationError(attr, validation);

    return validation;
}

const _isNumber = (value = null, attr, msg = INVALID_NUMBER)  => {
    
    let validation = (isNaN(parseFloat(Number(value)))) 
        ? msg.replace(':attr', attr)
        : false
    ;

    pushValidationError(attr, validation);

    return validation;
}

const _numberLength = (value = null, lng, attr, msg = INVALID_NUMBER_LENGTH) => {
    let validation = (typeof value !== 'number' || Number(value).toString().length === lng)
        ? msg.replace(':lng', lng)
        : msg.replace(':attr', attr)
    ;
    pushValidationError(attr, validation);

    return validation;
}

const _maxLengthString = (value = null, max, attr, msg = INVALID_MAX_LENGTH) => {
    let validation = false;

    if (String(value).trim().length > max) {
        msg.replace(':max', max);
        validation = msg.replace(':attr', attr);
    } 
    
    pushValidationError(attr, validation);
    
    return validation;
}

const _minLengthString = (value = '', min, attr, msg = INVALID_MIN_LENGTH) => {
    let validation = false;

    if (String(value).trim().length < min) {
        msg.replace(':min', min);
        validation = msg.replace(':attr', attr);
    }

    return validation;
}

const _email = (value = '', attr, msg = INVALID_EMAIL) => {
    let validation = (!value.match(REGEX_EMAIL)) 
        ? msg.replace(':attr', attr)
        : false
    ;

    pushValidationError(attr, validation);

    return validation;
}

const _unique = async (value = null, attr, table, column, msg = INVALID_UNIQUE) => {
    
    try {
        await mysql.connectDB();    

        let query = `SELECT COUNT(*) AS count FROM \`${table}\` WHERE \`${column}\` = ?`;

        const params = [value];
    
        await mysql.execute(query, params).then( ([data]) => {
            const count = [data[0].count];
            let validation = (count > 0)
                ? msg.replace(':attr', attr)
                : false
            ;

            pushValidationError(attr, validation);

            return validation;
        });

    } catch (error) {

        console.error("Error en la consulta _unique:", error);
        throw new Error(error);

    } finally {
        mysql.endDB();
    }
}

const _securePassword = (value = '', attr, msg = INVALID_PASSWORD) => {
    let validation = (!value.match(REGEX_SECURE_PASSWORD)) 
        ? msg.replace(':attr', attr)
        : false
    ;                 
    
    pushValidationError(attr, validation);

    return validation;
}


const pushValidationError = (attr, validation) => {
    if (!validation) {
        validation_errors[attr] = validation;

        validation_fails = true;
    }
}

module.exports = {
    _isRequired,
    _isNumber,
    _numberLength,
    _maxLengthString,
    _minLengthString,
    _email,
    _unique,
    _securePassword,
    pushValidationError,
}