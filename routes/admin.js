const path = require('path');
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/shop');

const products = [];

router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

router.get('/edit-product/:productId', productsController.getEditProduct);

module.exports = router;
