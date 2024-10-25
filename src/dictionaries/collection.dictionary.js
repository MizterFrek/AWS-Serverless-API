'use strict';

const collection = (collection, callback) => {
    return {
        total:            collection.count,
        pagina_siguiente: collection.next,
        pagina_anterior:  collection.previous,
        resultados:       collection.results.map(i => callback(i))
    };
}

module.exports = {
    collection
}