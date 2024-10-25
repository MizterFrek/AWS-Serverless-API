const axios = require('axios').default;
const { CONTENT_TYPE } = require('../const');

async function request(method, url, data = null) {
  try {
    const config = {
      method,
      url,
      headers: { 'Content-Type': CONTENT_TYPE }
    };
    
    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('Error making HTTP request:', error);
    throw error;
  }
}

async function get(url) {
  return await request('get', url);
}

async function post(url, data) {
  return await request('post', url, data);
}

module.exports = {
  request,
  get,
  post,
}