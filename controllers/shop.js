const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add product',
        path: '/'
    });
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body);
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
