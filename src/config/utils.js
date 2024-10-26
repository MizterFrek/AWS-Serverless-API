const replaceLink = (url, replace) => {
  return typeof url == 'string' 
    ? String(url).replace(process.env.API_URL, dominio).replace(replace[0], replace[1]) 
    : null;
}

const getFormatDate = (date) => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`;
}

const isInvalid = (value) => {
  return (value === null || value === undefined || value === '')
}

module.exports = {
  replaceLink,
  getFormatDate,
  isInvalid,
}