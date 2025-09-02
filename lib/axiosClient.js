const axios = require('axios');


const client = axios.create({
baseURL: 'https://dummyjson.com',
headers: { 'Content-Type': 'application/json' }
});


module.exports = client;