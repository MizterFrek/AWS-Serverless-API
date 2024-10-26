const replaceLink = (url, replace) => {
    return url 
        ? String(url).replace(apiUrl, dominio).replace(replace[0], replace[1]) 
        : null
    ;
}

module.exports = {
  replaceLink,
}