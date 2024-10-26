const replaceLink = (url, replace) => {
  if (typeof url !== 'string') {
    return null
  }

  let route = url.replace(process.env.API_URL, dominio);

  if (route.endsWith('/') ) {
    route = route.slice(0, -1);
  }

  return route.replace(replace[0], replace[1]) 
    
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
  global.dominio = `https://${host}/${process.env.STAGE}`;
}

module.exports = {
  replaceLink,
  getFormatDate,
  isInvalid,
  setDomain,
}