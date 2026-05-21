const axios = require('axios');

const fetchProducts = async () => {
  const url = process.env.EXTERNAL_API_URL;
  const query = process.env.SEARCH_QUERY;

  const response = await axios.get(url, {
    params: { q: query },
    timeout: 5000,
  });

  if (!response.data || !Array.isArray(response.data.products)) {
    throw new Error('Respuesta inesperada de la API externa');
  }

  return response.data.products;
};

module.exports = { fetchProducts };
