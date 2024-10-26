const replaceLink = (url, replace) => {
    return url 
        ? String(url).replace(apiUrl, dominio).replace(replace[0], replace[1]) 
        : null
    ;
}

const getFormatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
}

module.exports = {
  replaceLink,
  getFormatDate,
}