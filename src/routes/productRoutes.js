const { Router } = require('express');
const { getProducts } = require('../controllers/productController');

const router = Router();

router.get('/products', getProducts);

module.exports = router;
