const path = require('path');
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/shop');

const products = [];

router.get('/product-add', productsController.getAddProduct);

router.post('/product-add', productsController.postAddProduct);

router.get('/product-edit/:productId', productsController.getEditProduct);

router.post('/product-update/:productId', productsController.postUpdateProduct);


module.exports = router;
