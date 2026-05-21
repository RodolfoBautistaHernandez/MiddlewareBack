const { fetchProducts } = require('../services/productService');
const { transformAndSort } = require('../transformers/productTransformer');

const getProducts = async (req, res) => {
  try {
    const rawProducts = await fetchProducts();
    const products = transformAndSort(rawProducts);

    return res.status(200).json({
      success: true,
      total: products.length,
      products,
    });
  } catch (error) {
    // API externa caída o timeout
    if (error.code === 'ECONNABORTED' || error.code === 'ENOTFOUND') {
      return res.status(503).json({
        success: false,
        message: 'El servicio externo no está disponible. Intenta más tarde.',
      });
    }

    // Respuesta inesperada de la API externa
    if (error.response) {
      return res.status(502).json({
        success: false,
        message: `Error de la API externa: ${error.response.status}`,
      });
    }

    // Error interno
    return res.status(500).json({
      success: false,
      message: error.message || 'Error interno del servidor',
    });
  }
};

module.exports = { getProducts };
