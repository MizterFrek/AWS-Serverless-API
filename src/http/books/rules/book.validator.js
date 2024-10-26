const validator = require('../../../plugins/validator');

const validate = async (bodyRequest) => {
    global.validation_fails = false;
    global.validation_errors = {};
    global.validation_message = MSG_422;

    if (bodyRequest == null || Object.values(bodyRequest).length === 0) {
        validation_message = "Body Request vacío";
        return 
    }
    
    const body = JSON.parse(bodyRequest);

    const 
        nombre = body.nombre ?? null,
        autor = body.autor ?? null,
        fechaPublicacion = body.fechaPublicacion ?? null
    ;
    
    // Validaciones para name
    try { 
        validator._isRequired(nombre, 'nombre'); 
    } catch(error) {}
    try { 
        validator._minLengthString(nombre, 3, 'nombre'); 
    } catch(error) {}
    try {
        validator._maxLengthString(nombre, 255, 'nombre');
    } catch(error) {}
    try {
        await validator._unique(nombre, 'nombre', 'BooksTable', 'name'); 
    } catch(error) { console.log("Falló la regla unique de nombre") }

    // Validaciones para author
    try {
        validator._isRequired(autor, 'autor'); 
    } catch(error) {}
    try {
        validator._minLengthString(autor, 3, 'autor');  
    } catch(error) {}
    try {
        validator._maxLengthString(autor, 255, 'autor'); 
    } catch(error) {}
    // Validaciones para published_at
    try {
        validator._isRequired(fechaPublicacion, 'fechaPublicacion'); 
    } catch(error) {}
    try {
        validator._date(fechaPublicacion, 'fechaPublicacion'); 
    } catch(error) {}
};

module.exports = {
    validate
};