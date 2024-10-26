const validator = require('../../../plugins/validator');

const userValidator = async (event) => {
    try {
        
        if (event.body == null || Object.values(event.body).length === 0) {
            console.error("Objeto body vacío");
            const error = new Error(MSG_422)
            error.status = HTTP_VALIDATION_ERROR;
            throw error;
        }

        global.validation_errors = [];
        global.validation_fails = false;
        console.log('validation_fails', validation_fails)

        const { name, email, password, dni } = event.body;

        // Validaciones para name
        validator._isRequired(name, 'name');
        validator._minLengthString(name, 3, 'name');
        validator._maxLengthString(name, 255, 'name');

        // Validaciones para email
        validator._isRequired(email, 'email');
        validator._email(email, 'email');
        validator._maxLengthString(email, 255, 'email');
        //await validator._unique(email, 'email', 'users', 'email'); // Ajusta el nombre de la tabla y columna

        // Validaciones para password
        validator._isRequired(password, 'password');
        validator._securePassword(password, 'password');

        // Validaciones para dni
        validator._isRequired(dni, 'dni');
        validator._isNumber(dni, 'dni');
        validator._numberLength(dni, 8, 'dni');
        //await validator._unique(dni, 'dni', 'users', 'dni'); // Ajusta el nombre de la tabla y columna

    } catch (error) {
        console.error("Validation error:", error.message);
        throw new Error(error.message);
    }
};

module.exports = userValidator;