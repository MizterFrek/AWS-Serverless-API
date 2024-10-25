/*
 * Utilizar este archivo para las constantes de la aplicación
 */

const developer = 'MizterFrek'

const apiUrl = 'https://swapi.py4e.com/api';

const CONTENT_TYPE = 'application/json';

const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const MSG_200 = "Ok";
const MSG_201 = "Creación exitosa";
const MSG_404 = "Ruta no encontrada"
const MSG_500 = "Error de Servidor"

module.exports = {
    apiUrl,
    developer,
    CONTENT_TYPE,
    HTTP_OK,
    HTTP_CREATED,
    HTTP_NOT_FOUND,
    HTTP_INTERNAL_SERVER_ERROR,
    MSG_200,
    MSG_201,
    MSG_404,
    MSG_500,
}