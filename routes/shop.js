const path = require('path');
const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.post('/cart', shopController.postCart);

router.get('/cart', shopController.getCart);

module.exports = router;