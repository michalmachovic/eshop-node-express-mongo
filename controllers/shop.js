const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('product-add', {
        pageTitle: 'Add product',
        path: '/'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(
        req.body.title,
        req.body.description, 
        req.body.price, 
        null,
        req.user._id);
    product.save();
    res.redirect('/');
}

exports.getProducts =  (req, res, next) => {
    Product.fetchAll().
        then(products => {
            res.render('shop', {
                products: products,
                pageTitle: 'shop',
                path: '/',
                hasProducts: products.length > 0,
                activeShop: true
            });
        });
}

exports.getProduct = (req, res, next) => {
    Product.fetchById(req.params.productId).
        then(product => {
            res.render('product', {
                product: product,
                pageTitle: 'product'
            });
        });
}

exports.getEditProduct = (req, res, next) => {
    Product.fetchById(req.params.productId).
        then(product => {
            res.render('product-edit', {
                product: product,
                pageTitle: 'product'
            });
        });
}

exports.postUpdateProduct = (req, res, next) => {
    Product.updateById(req.params.productId, req.body);
    res.redirect('/');
}