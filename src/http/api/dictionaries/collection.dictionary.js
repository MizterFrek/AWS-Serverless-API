const { replaceLink } = require('../../../config/utils');

const collection = (collection, callback, replaces) => {
    return {
        total:            collection.count,
        pagina_siguiente: replaceLink(collection.next, replaces),
        pagina_anterior:  replaceLink(collection.previous, replaces),
        resultados:       collection.results.map(i => callback(i, replaces))
    };
}

module.exports = {
    collection
}