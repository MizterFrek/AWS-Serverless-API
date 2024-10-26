"use strict";

global.developer = 'MizterFrek';

global.CONTENT_TYPE = 'application/json';

/**
 * Regex
 */
global.REGEX_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
global.REGEX_EMAIL = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

// ^                         Start anchor
// (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
// (?=.*[!@#$&*])            Ensure string has one special case letter.
// (?=.*[0-9].*[0-9])        Ensure string has two digits.
// (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
// .{8}                      Ensure string is of length 8.
// $                         End anchor.
global.REGEX_SECURE_PASSWORD = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;

/**
 * HTTP 
 */

global.HTTP_OK = 200;
global.HTTP_CREATED = 201;
global.HTTP_NOT_FOUND = 404;
global.HTTP_VALIDATION_ERROR = 422;
global.HTTP_INTERNAL_SERVER_ERROR = 500;

global.MSG_200 = "Ok";
global.MSG_201 = "Creación exitosa";
global.MSG_404 = "Ruta no encontrada";
global.MSG_422 = "Contenido no procesable";
global.MSG_500 = "Error de Servidor";

/**
 * Validations
 */
global.INVALID_REQUIRED = `El campo :attr es requerido`
global.INVALID_NUMBER = "El campo :attr debe ser un número";
global.INVALID_NUMBER_LENGTH = "El campo :attr debe ser un número de :lgn dígitos";
global.INVALID_MAX_LENGTH = "El campo :attr debe tener un máximo de :max caracteres";
global.INVALID_MIN_LENGTH = "El campo :attr debe tener un mínimo de :min caracteres";
global.INVALID_EMAIL = "El campo :attr debe ser un email válido";
global.INVALID_UNIQUE = "El campo :attr ya existe";
global.INVALID_PASSWORD = "El campo :attr es una contraseña insegura";
global.INVALID_DATE_FORMAT = "El campo :attr debe tener siguiente formato de fecha: YYYY-MM-DD"