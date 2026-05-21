const TAX_RATE = parseFloat(process.env.TAX_RATE) || 0.16;
const LOW_STOCK_THRESHOLD = parseInt(process.env.LOW_STOCK_THRESHOLD) || 10;

const transformProduct = (product) => {
  const { id, title, price, stock, brand, category } = product;

  // Validar campos requeridos
  if (id == null || !title || price == null || stock == null) {
    return null;
  }

  const finalPrice = parseFloat((price * (1 + TAX_RATE)).toFixed(2));
  const isLowStock = stock < LOW_STOCK_THRESHOLD;

  return {
    id,
    title,
    brand: brand || 'N/A',
    category: category || 'N/A',
    originalPrice: price,
    finalPrice,
    stock,
    isLowStock,
  };
};

const transformAndSort = (products) => {
  return products
    .map(transformProduct)
    .filter(Boolean) // eliminar productos con campos incompletos
    .sort((a, b) => b.finalPrice - a.finalPrice);
};

module.exports = { transformAndSort };
