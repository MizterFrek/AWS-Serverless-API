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

/**
 * Not available for localhost
 * Pending mapping of http:// and /dev/ prefix
 */
const setDomain = (event) => {
  const host = event.headers.Host;
  global.dominio = `https://${host}`;
}

module.exports = {
  replaceLink,
  getFormatDate,
  isInvalid,
  setDomain,
}