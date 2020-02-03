const path = require('path');
const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

module.exports = router;