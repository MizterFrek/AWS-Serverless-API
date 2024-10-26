const replaceLink = (url, replace) => {
  return typeof url == 'string' 
    ? String(url).replace(apiUrl, dominio).replace(replace[0], replace[1]) 
    : null;
}

const getFormatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`;
}

const isInvalid = (value) => {
  return (value === null || value === undefined || value === '' || value.trim() === '')
}

module.exports = {
  replaceLink,
  getFormatDate,
  isInvalid,
}